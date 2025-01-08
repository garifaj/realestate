using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _context.Bookings
                .AsNoTracking() // Prevent tracking to avoid saving changes unintentionally
                .Include(b => b.Property)
                    .ThenInclude(p => p.Agent)
                .Include(b => b.User)
                .ToListAsync();

            // Remove navigation properties without affecting the database
            foreach (var booking in bookings)
            {
                if (booking.Property != null)
                {
                    booking.Property.Bookings = null; // Prevent nested bookings
                }

                if (booking.User != null)
                {
                    booking.User.Bookings = null; // Prevent nested bookings
                }

                // Update statuses dynamically
                if (booking.Status != "Canceled")
                {
                    if (booking.BookingDate < DateTime.Now)
                    {
                        booking.Status = "Finished";
                    }
                    else if (booking.BookingDate >= DateTime.Now)
                    {
                        booking.Status = "Pending";
                    }
                }
            }

            return Ok(bookings);
        }




        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }

            var booking = await _context.Bookings
                                         .Include(b => b.User)      // Include related User data
                                         .Include(b => b.Property)  // Include related Property data
                                         .ThenInclude(p => p.Agent) // Load Property's Agent
                                         .FirstOrDefaultAsync(b => b.Id == id); // Fetch by ID

            if (booking == null)
            {
                return NotFound();
            }

            // Update the status based on the booking date
            if (booking.Status != "Canceled")
            {
                if (booking.BookingDate < DateTime.Now)
                {
                    booking.Status = "Finished";
                }
                else if (booking.BookingDate >= DateTime.Now)
                {
                    booking.Status = "Pending";
                }

                // Save the updated status to the database
                _context.Entry(booking).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return booking;
        }


        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, BookingDto bookingDto)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }

            // Find the booking by ID
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            // Validate PropertyId
            var property = await _context.Property.FindAsync(bookingDto.PropertyId);
            if (property == null)
            {
                return BadRequest("Invalid PropertyId.");
            }

            // Validate UserId
            var user = await _context.Users.FindAsync(bookingDto.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId.");
            }

            // Update booking with the new data
            booking.PropertyId = bookingDto.PropertyId;
            booking.Property = property;
            booking.UserId = bookingDto.UserId;
            booking.User = user;
            booking.BookingDate = bookingDto.BookingDate;
            booking.Status = bookingDto.Status;

            // Save changes to the database
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Return a success message with updated booking details
            return Ok(new { message = "The booking was updated successfully.", booking = booking });
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(BookingDto bookingDto)
        {
            if (_context.Bookings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Bookings' is null.");
            }

            // Validate that the Property and User exist
            var property = await _context.Property.FindAsync(bookingDto.PropertyId);
            var user = await _context.Users.FindAsync(bookingDto.UserId);

            if (property == null || user == null)
            {
                return BadRequest("Invalid PropertyId or UserId.");
            }

            // Check for overlapping bookings based on date and time
            var hasOverlap = await _context.Bookings.AnyAsync(b =>
                b.PropertyId == bookingDto.PropertyId &&
                b.Status == "Pending" &&  // Only check active bookings
                b.BookingDate.Date == bookingDto.BookingDate.Date &&  // Same day
                ((b.BookingDate >= bookingDto.BookingDate && b.BookingDate < bookingDto.BookingDate.AddHours(1)) ||  // Overlapping start
                 (bookingDto.BookingDate >= b.BookingDate && bookingDto.BookingDate < b.BookingDate.AddHours(1))));  // Overlapping end

            if (hasOverlap)
            {
                return BadRequest("This property is already booked for the selected time.");
            }

            var currentDateTimeUtc = DateTime.UtcNow;

            // Map DTO to Booking model
            var bookingDateUtc = new DateTime(
           bookingDto.BookingDate.Year,
           bookingDto.BookingDate.Month,
           bookingDto.BookingDate.Day,
           bookingDto.BookingDate.Hour,
           bookingDto.BookingDate.Minute,
           bookingDto.BookingDate.Second,
           DateTimeKind.Utc);
            var booking = new Booking
            {
                PropertyId = bookingDto.PropertyId,
                UserId = bookingDto.UserId,
                BookingDate = bookingDateUtc,
                Status = "Pending",
            };
            if (bookingDateUtc <= currentDateTimeUtc)
            {
                return BadRequest("You cannot book a property in the past.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok();
        }


        [HttpGet("{propertyId}/available-timeslots")]
        public async Task<ActionResult<List<DateTime>>> GetAvailableTimeSlots(int propertyId, DateTime selectedDate)
        {
            if (_context.Bookings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Bookings' is null.");
            }

            // Define working hours (9:00 to 17:00 UTC)
            var workingHoursStart = new TimeSpan(9, 0, 0);
            var workingHoursEnd = new TimeSpan(17, 0, 0);

            // Generate all possible time slots
            var timeSlots = new List<DateTime>();
            var currentTime = selectedDate.Date.Add(workingHoursStart); // Start of the day at 9:00
            var endTime = selectedDate.Date.Add(workingHoursEnd); // End of the day at 17:00

            while (currentTime < endTime)
            {
                timeSlots.Add(currentTime);
                currentTime = currentTime.AddHours(1); // Increment by 1 hour
            }

            // Retrieve all bookings for the property on the selected date
            var bookedSlots = await _context.Bookings
                .Where(b => b.PropertyId == propertyId &&
                            b.Status == "Pending" && // Only active bookings
                            b.BookingDate.Date == selectedDate.Date)
                .Select(b => b.BookingDate)
                .ToListAsync();

            // Filter out booked time slots
            var availableTimeSlots = timeSlots
                .Where(slot => !bookedSlots.Any(booked =>
                    slot >= booked && slot < booked.AddHours(1))) // Overlap check
                .ToList();

            return Ok(availableTimeSlots);
        }

        // PUT: api/Bookings/cancel/5
        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound(new { message = "The bookings context is unavailable." });
            }

            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound(new { message = $"Booking with ID {id} not found." });
            }

            if (booking.Status == "Canceled")
            {
                return BadRequest(new { message = "This booking has already been canceled." });
            }

            // Check if cancellation is within 1 day of the booking date
            var currentDateTime = DateTime.UtcNow;
            if (booking.BookingDate <= currentDateTime.AddDays(1))
            {
                return BadRequest(new { message = "You cannot cancel the booking within 1 day of the booking date." });
            }

            // Update the status to Canceled
            booking.Status = "Canceled";

            // Save changes
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "The booking was canceled successfully.", booking });
        }





        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound(new { message = "The bookings context is unavailable." });
            }

            // Find the booking by ID
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound(new { message = $"Booking with ID {id} not found." });
            }

            // Remove the booking
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Booking with ID {id} has been successfully deleted." });
        }

        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

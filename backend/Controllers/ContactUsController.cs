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
    public class ContactUsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactUsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactUs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactUs>>> GetContactUs()
        {
          if (_context.ContactUs == null)
          {
              return NotFound();
          }
            return await _context.ContactUs.ToListAsync();
        }

        // GET: api/ContactUs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactUs>> GetContactUs(int id)
        {
          if (_context.ContactUs == null)
          {
              return NotFound();
          }
            var contactUs = await _context.ContactUs.FindAsync(id);

            if (contactUs == null)
            {
                return NotFound();
            }

            return contactUs;
        }

        // PUT: api/ContactUs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIsAnswered(int id, [FromBody] ContactUsUpdateDto updateDto)
        {
            var existingContactUs = await _context.ContactUs.FindAsync(id);
            if (existingContactUs == null)
            {
                return NotFound();
            }

            // Update only the IsAnswered field
            existingContactUs.isAnswered = updateDto.isAnswered;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactUsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/ContactUs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactUs>> PostContactUs(ContactUs contactUs)
        {
          if (_context.ContactUs == null)
          {
              return Problem("Entity set 'ApplicationDbContext.ContactUs'  is null.");
          }
            _context.ContactUs.Add(contactUs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactUs", new { id = contactUs.Id }, contactUs);
        }

        // DELETE: api/ContactUs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactUs(int id)
        {
            if (_context.ContactUs == null)
            {
                return NotFound();
            }
            var contactUs = await _context.ContactUs.FindAsync(id);
            if (contactUs == null)
            {
                return NotFound();
            }

            _context.ContactUs.Remove(contactUs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactUsExists(int id)
        {
            return (_context.ContactUs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

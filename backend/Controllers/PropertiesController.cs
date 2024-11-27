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
    public class PropertiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public readonly IWebHostEnvironment _env;

        public PropertiesController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Properties
        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            var properties = await _context.Property
            .Include(p => p.Agent) // Load Agent
            .ThenInclude(a => a.Properties) // Load Agent's Properties
            .ToListAsync();

            foreach (var property in properties)
            {
                // Force loading of related data
                _context.Entry(property.Agent).Collection(a => a.Properties).Load();
            }

            return Ok(properties);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await _context.Property
                .Include(p => p.Agent)  // Include the Agent for the Property
                .Include(p => p.Agent.Properties)  // Include the Agent's Properties
                .FirstOrDefaultAsync(p => p.Id == id);  // Fetch the property by its ID

            if (property == null)
            {
                return NotFound();
            }

            return property;
        }



        // PUT: api/Properties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProperty(int id, [FromBody] PropertyCreateDTO propertyDTO)
        {
            if (_context.Property == null)
            {
                return NotFound();
            }

            var property = await _context.Property.FindAsync(id);

            if (property == null)
            {
                return NotFound();
            }

            // Validate AgentId
            if (propertyDTO.AgentId == 0)  // Ensure the AgentId is provided
            {
                return BadRequest("AgentId is required.");
            }

            // Check if the AgentId exists in the database
            var agent = await _context.Agents.FindAsync(propertyDTO.AgentId);
            if (agent == null)
            {
                return BadRequest("Invalid AgentId.");
            }

            // Update Property object with the new data from the DTO
            property.Title = propertyDTO.Title;
            property.Description = propertyDTO.Description;
            property.Price = propertyDTO.Price;
            property.Bedroom = propertyDTO.Bedroom;
            property.Bathroom = propertyDTO.Bathroom;
            property.Area = propertyDTO.Area;
            property.Type = propertyDTO.Type;
            property.Address = propertyDTO.Address;
            property.City = propertyDTO.City;
            property.Images = propertyDTO.Images;
            property.AgentId = propertyDTO.AgentId;
            property.Agent = agent;  // Link the agent to the property

            // Save changes to the database
            _context.Entry(property).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Return a NoContent response indicating successful update
            return Ok(new { message = "The property was edited successfully.", property = property });
        }


        // POST: api/Properties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Property>> PostProperty([FromBody] PropertyCreateDTO propertyDTO)
        {
            if (_context.Property == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Property' is null.");
            }

            if (propertyDTO.AgentId == 0)  // Ensure the AgentId is provided
            {
                return BadRequest("AgentId is required.");
            }

            // Check if the AgentId exists in the database
            var agent = await _context.Agents.FindAsync(propertyDTO.AgentId);
            if (agent == null)
            {
                return BadRequest("Invalid AgentId.");
            }

            // Create Property object from DTO
            var property = new Property
            {
                Title = propertyDTO.Title,
                Description = propertyDTO.Description,
                Price = propertyDTO.Price,
                Bedroom = propertyDTO.Bedroom,
                Bathroom = propertyDTO.Bathroom,
                Area = propertyDTO.Area,
                Type = propertyDTO.Type,
                Address = propertyDTO.Address,
                City = propertyDTO.City,
                Images = propertyDTO.Images,
                AgentId = propertyDTO.AgentId,
                Agent = agent  // Link the agent to the property
            };

            // Save property to the database
            _context.Property.Add(property);
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the property
            return Ok(new { message = "The property was created successfully.", property = property });
        }




        // DELETE: api/Properties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            if (_context.Property == null)
            {
                return NotFound();
            }
            var @property = await _context.Property.FindAsync(id);
            if (@property == null)
            {
                return NotFound();
            }

            _context.Property.Remove(@property);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The property was edited successfully." });
        }

        private bool PropertyExists(int id)
        {
            return (_context.Property?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var uploadedFiles = httpRequest.Files;
                var savedFilenames = new List<string>();

                foreach (var postedFile in uploadedFiles)
                {
                    string filename = Path.GetFileName(postedFile.FileName);
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos", filename);

                    // Save each file
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                    }

                    savedFilenames.Add(filename); // Add the file name to the list
                }

                // Return a JSON array of saved filenames
                return new JsonResult(savedFilenames);
            }
            catch (Exception)
            {
                // If something fails, return an empty list or a message indicating the error
                return new JsonResult(new { error = "An error occurred while uploading the files." });
            }
        }
    }
}

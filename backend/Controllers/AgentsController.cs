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
    public class AgentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public readonly IWebHostEnvironment _env;

        public AgentsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Agents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agent>>> GetAgents()
        {
            if (_context.Agents == null)
            {
                return NotFound();
            }

            // Use eager loading to load properties for all agents
            return await _context.Agents
                                 .Include(a => a.Properties)  // Include properties for each agent
                                 .ToListAsync();
        }

        // GET: api/Agents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agent>> GetAgent(int id)
        {
            if (_context.Agents == null)
            {
                return NotFound();
            }

            // Use eager loading to load the related Properties
            var agent = await _context.Agents
                                      .Include(a => a.Properties) // This line will include the properties for the agent
                                      .FirstOrDefaultAsync(a => a.Id == id);

            if (agent == null)
            {
                return NotFound();
            }

            return agent;
        }

        // PUT: api/Agents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgent(int id, AgentDto agentDto)
        {
            if (id != agentDto.Id)
            {
                return BadRequest();
            }

            // Find the agent by ID
            var agent = await _context.Agents.Include(a => a.Properties).FirstOrDefaultAsync(a => a.Id == id);
            if (agent == null)
            {
                return NotFound();
            }

            // Update agent properties from the DTO
            agent.Name = agentDto.Name;
            agent.Surname = agentDto.Surname;
            agent.Email = agentDto.Email;
            agent.PhoneNumber = agentDto.PhoneNumber;
            agent.Bio = agentDto.Bio;
            agent.LinkedIn = agentDto.LinkedIn;
            agent.ProfilePicture = agentDto.ProfilePicture;

            // If PropertyIds are provided, update the agent's properties
            if (agentDto.PropertyIds != null)
            {
                // Fetch the properties using the PropertyIds list
                var properties = await _context.Property.Where(p => agentDto.PropertyIds.Contains(p.Id)).ToListAsync();

                // Set the agent's properties (or clear if no properties are passed)
                agent.Properties = properties;
            }

            // Mark the agent entity as modified and save changes
            _context.Entry(agent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentExists(id))
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

        // POST: api/Agents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Agent>> PostAgent(AgentDto agentDto)
        {
            if (_context.Agents == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Agents' is null.");
            }

            var agent = new Agent
            {
                Name = agentDto.Name,
                Surname = agentDto.Surname,
                Email = agentDto.Email,
                PhoneNumber = agentDto.PhoneNumber,
                Bio = agentDto.Bio,
                LinkedIn = agentDto.LinkedIn,
                ProfilePicture = agentDto.ProfilePicture,
                Properties = agentDto.PropertyIds != null
                    ? await _context.Property.Where(p => agentDto.PropertyIds.Contains(p.Id)).ToListAsync()
                    : new List<Property>() // Empty list if no properties are provided
            };

            _context.Agents.Add(agent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgent", new { id = agent.Id }, agent);
        }

        // DELETE: api/Agents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgent(int id)
        {
            if (_context.Agents == null)
            {
                return NotFound();
            }
            var agent = await _context.Agents.FindAsync(id);
            if (agent == null)
            {
                return NotFound();
            }

            _context.Agents.Remove(agent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AgentExists(int id)
        {
            return (_context.Agents?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("default.jpg");
            }
        }
    }
}

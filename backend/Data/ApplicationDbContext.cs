using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Property> Property { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            modelBuilder.Entity<Property>()
                .HasOne(p => p.Agent)
                .WithMany(p => p.Properties)
                .HasForeignKey(p => p.AgentId);

            modelBuilder.Entity<Property>()
            .Property(p => p.Images)
            .HasConversion(
            v => JsonConvert.SerializeObject(v), // Convert list to JSON string for storage
            v => JsonConvert.DeserializeObject<List<string>>(v) // Convert JSON string back to list
        );
        }
    }
}

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
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            //Property-Agent relationship
            modelBuilder.Entity<Property>()
                .HasOne(p => p.Agent)
                .WithMany(p => p.Properties)
                .HasForeignKey(p => p.AgentId);

            //Store Property Images as JSON
            modelBuilder.Entity<Property>()
            .Property(p => p.Images)
            .HasConversion(
            v => JsonConvert.SerializeObject(v), // Convert list to JSON string for storage
            v => JsonConvert.DeserializeObject<List<string>>(v) // Convert JSON string back to list
            );

            //Booking-Property relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Property)
                .WithMany(b => b.Bookings)
                .HasForeignKey(b => b.PropertyId);

            //Booking-User relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(b => b.Bookings)
                .HasForeignKey(b =>b.UserId);

        }
    }
}

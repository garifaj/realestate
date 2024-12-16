namespace backend.Models
{
    public class Booking
    {
        public int Id { get; set; }

        //Foreign key for Property 
        public int PropertyId { get; set; }
        public Property Property { get; set; }

        //Foreign key for User
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime BookingDate { get; set; }
        public string? Status { get; set; }

    }
}

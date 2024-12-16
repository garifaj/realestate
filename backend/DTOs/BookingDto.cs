using backend.Models;

namespace backend.DTOs
{
    public class BookingDto
    {

        //Foreign key for Property 
        public int PropertyId { get; set; }

        //Foreign key for User
        public int UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public string? Status { get; set; }
    }
}

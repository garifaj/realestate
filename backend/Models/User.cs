using System.Text.Json.Serialization;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public bool isAdmin { get; set; }
    }
}

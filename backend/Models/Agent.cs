namespace backend.Models
{
    public class Agent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Bio {  get; set; }
        public string LinkedIn { get; set; }
        public string ProfilePicture { get; set; }
        public ICollection<Property> Properties { get; set; }
    }
}

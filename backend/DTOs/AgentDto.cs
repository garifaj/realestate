namespace backend.DTOs
{
    public class AgentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Bio { get; set; }
        public string LinkedIn { get; set; }
        public string ProfilePicture { get; set; }
        public List<int>? PropertyIds { get; set; } // Optional list of PropertyIds for later association
    }
}

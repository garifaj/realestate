namespace backend.DTOs
{
    public class PropertyCreateDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Bedroom { get; set; }
        public int Bathroom { get; set; }
        public int Area { get; set; }
        public string Type { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int AgentId { get; set; }  // Only the AgentId is needed for POST
        public List<string> Images { get; set; }
    }
}

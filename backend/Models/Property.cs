namespace backend.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Bedroom { get; set; }
        public int Bathroom { get; set; }
        public int Area { get; set; }
        public string Type { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public List<string> Images { get; set; }
        public int AgentId { get; set; }
        public Agent Agent { get; set; }
    }
}

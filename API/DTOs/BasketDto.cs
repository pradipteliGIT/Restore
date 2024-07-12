namespace API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
        public string PaymentIntenetId { get; set; }
        public string ClientSecret { get; set; }
    }
}

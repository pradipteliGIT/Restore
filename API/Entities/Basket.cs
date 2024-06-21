namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new (); 

        public void AddItem(Product product,int quantity)
        {
            //If item already does not exists
            if(Items.All(item=>item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            //If item already exists
            var existingItem = Items.FirstOrDefault(item=>item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity; 

        }

        public void RemoveItem(int productId,int qunatity)
        {
            var existingItem = Items.FirstOrDefault(item=>item.ProductId == productId);
            if(existingItem ==null) return;

            existingItem.Quantity -= qunatity;
            //if qunaity becomes zero by remving item
            if(existingItem.Quantity == 0)
            Items.Remove(existingItem);
        }

    }
}

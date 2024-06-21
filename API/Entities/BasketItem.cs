using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //Navigation properties
        public int  ProductId { get; set; }    
        public Product Product { get; set; }

        //Thses two peorpeties required to maintian cascade on delete basket 
        public int BasketId {  get; set; }
        public Basket Basket { get; set; }
    }
}

using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto>ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query.
                Select(order => new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    OrderDate = order.OrderDate,
                    OrderStatus = order.OrderStatus.ToString(),
                    Subtotal = order.Subtotal,
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        ProductId= item.ItemOrdered.ProductId,
                        Name=item.ItemOrdered.Name,
                        PictureUrl= item.ItemOrdered.PictureUrl,
                        Price=item.Price,
                        Quantity= item.Quantity,

                    }).ToList()

                }).AsNoTracking();
        }
    }
}

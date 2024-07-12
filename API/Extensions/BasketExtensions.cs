﻿using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToBasketDto(this Basket basket)
        {          
                return new BasketDto
                {
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    PaymentIntenetId = basket.PaymentIntentId,
                    ClientSecret= basket.ClientSecret,
                    Items = basket.Items.Select(item => new BasketItemDto
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Description = item.Product.Description,
                        Price = item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                        Type = item.Product.Type,
                        Brand = item.Product.Brand,
                        Quantity = item.Quantity

                    }).ToList()
                };            
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId) {
            return query.Include(b => b.Items).ThenInclude(b => b.Product).Where(b => b.BuyerId == buyerId);
        }

    }
}

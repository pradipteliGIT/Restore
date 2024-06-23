﻿using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  
    public class BasketController : BaseApiController        
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context) {
            _context= context;
        }

        [HttpGet(Name = "GetBasket")] 
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
        {
            //get basket 
            var basket = await RetrieveBasket();

            //create basket if not availabel
            if(basket == null)
            {
                basket = CreateBasket();
            }    

            //Get product to add in basket
            var propduct = await _context.Products.FindAsync(productId);
            if (propduct == null) return BadRequest(new ProblemDetails { Title = "Product not found"});

            //create basket / add product to items
            basket.AddItem(propduct, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if(basket==null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result =await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting item from the basket" });
        }

        private async Task<Basket> RetrieveBasket()
        {
           return await _context.Baskets.
                Include(i => i.Items).ThenInclude(i => i.Product).
                FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires=DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
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
    }
}

using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController( StoreContext context) {
            _context = context;
        }
        [HttpGet(Name ="GetAllProducts")]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {   
            var query = _context.Products.Sort(productParams.OrderBy).Search(productParams.SearchTerm).Filter(productParams.Types, productParams.Brands).AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id) {

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();

            return Ok(new {brands,types});

        }
    }
}

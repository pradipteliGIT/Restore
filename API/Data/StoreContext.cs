using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
       public StoreContext(DbContextOptions dbContextOptions) :base(dbContextOptions) { }

        public DbSet<Product> Products { get; set; }
    }
}

﻿using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort (this IQueryable<Product> query, string orderBy)
        {
            
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.Name.ToLower().Contains(searchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string types, string brands)
        {
            var typelist = new List<string>();
            var brandslist = new List<string>();

            if (!string.IsNullOrEmpty(brands)) {
                brandslist.AddRange(brands.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrEmpty(types))
            {
                typelist.AddRange(types.ToLower().Split(",").ToList());
            }

            query = query.Where(p => brandslist.Count == 0 || brandslist.Contains(p.Brand.ToLower()));
            query = query.Where(p => typelist.Count == 0 || typelist.Contains(p.Type.ToLower()));
            return query;
        }
    }
}

﻿using Microsoft.EntityFrameworkCore;
using UrlShortener.Models;

namespace UrlShortener.Data
{
    public class UrlShortenerContext : DbContext
    {
        public UrlShortenerContext(DbContextOptions<UrlShortenerContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }


        public DbSet<ShortUrl> ShortUrls { get; set; }
    }
}

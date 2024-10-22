using System.Linq;
using UrlShortener.Models;

namespace UrlShortener.Data
{
    public static class DbInitializer
    {
        public static void Initialize(UrlShortenerContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return; 
            }

            var users = new User[]
            {
                new User
                {
                    Email = "admin@example.com",
                    PasswordHash = HashPassword("Admin123!"), 
                    Role = "Admin"
                },
                new User
                {
                    Email = "user1@example.com",
                    PasswordHash = HashPassword("User123!"), 
                    Role = "User"
                },
                new User
                {
                    Email = "user2@example.com",
                    PasswordHash = HashPassword("User456!"), 
                    Role = "User"
                }
            };

            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges(); 
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return System.Convert.ToBase64String(bytes);
            }
        }
    }
}

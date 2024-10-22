using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Data;
using UrlShortener.Models;

namespace UrlShortener.Controllers
{
    
    public class ShortUrlsController : Controller
    {
        private readonly UrlShortenerContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public ShortUrlsController(UrlShortenerContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(ShortUrl shortUrl)
        {

                shortUrl.ShortCode = GenerateShortCode();
                shortUrl.CreatedDate = DateTime.Now;
                shortUrl.CreatedBy = User.Identity?.Name ?? "Anonymous";

                _context.ShortUrls.Add(shortUrl);
                _context.SaveChanges();

                ViewBag.ShortenedUrl = $"{Request.Scheme}://{Request.Host}/{shortUrl.ShortCode}";
                return View(shortUrl);
        }
        [HttpGet("{shortCode}")]
        public IActionResult RedirectToOriginal(string shortCode)
        {
            var shortUrl = _context.ShortUrls.FirstOrDefault(s => s.ShortCode == shortCode);
            if (shortUrl != null)
            {
                return Redirect(shortUrl.OriginalUrl);
            }
            return NotFound();
        }


        private string GenerateShortCode()
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}

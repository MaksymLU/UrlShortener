using Microsoft.AspNetCore.Mvc;
using UrlShortener.Data;
using UrlShortener.Models;
using System.Linq;

namespace UrlShortener.Controllers
{
    public class HomeController : Controller
    {
        private readonly UrlShortenerContext _context;

        public HomeController(UrlShortenerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var shortUrls = _context.ShortUrls.ToList();

            ViewBag.BaseUrl = $"{Request.Scheme}://{Request.Host}";

            return View(shortUrls);
        }
    }
}

using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Models
{
    public class ShortUrl
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Url]
        public string OriginalUrl { get; set; } = string.Empty;

        [Required]
        public string ShortCode { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string CreatedBy { get; set; } = string.Empty;
    }
}

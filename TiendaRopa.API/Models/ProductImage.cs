using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class ProductImage
    {
        [Key]
        public int ImageId { get; set; }
        public int ProductId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;
        public int DisplayOrder { get; set; } = 0;

        // Relación
        public Product Product { get; set; } = null!;
    }
}
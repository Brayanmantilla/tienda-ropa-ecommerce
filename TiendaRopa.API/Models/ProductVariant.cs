using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class ProductVariant
    {
        [Key]
        public int VariantId { get; set; }
        public int ProductId { get; set; }
        public string Size { get; set; } = string.Empty; // "XS", "S", "M", "L", "XL", "XXL"
        public string Color { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public string? SKU { get; set; }

        // Relaciones
        public Product Product { get; set; } = null!;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
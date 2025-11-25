using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }
        public int UserId { get; set; }
        public int VariantId { get; set; }
        public int Quantity { get; set; } = 1;
        public DateTime AddedAt { get; set; } = DateTime.Now;

        // Relaciones
        public User User { get; set; } = null!;
        public ProductVariant Variant { get; set; } = null!;
    }
}
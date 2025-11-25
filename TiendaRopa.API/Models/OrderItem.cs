using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int VariantId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal { get; set; }

        // Relaciones
        public Order Order { get; set; } = null!;
        public Product Product { get; set; } = null!;
        public ProductVariant Variant { get; set; } = null!;
    }
}
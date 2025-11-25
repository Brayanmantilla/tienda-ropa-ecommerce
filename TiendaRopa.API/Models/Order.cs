using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending"; // "Pending", "Processing", "Shipped", "Delivered", "Cancelled"
        public string? PaymentMethod { get; set; }
        public string PaymentStatus { get; set; } = "Pending"; // "Pending", "Paid", "Failed"
        public int? ShippingAddressId { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Relaciones
        public User User { get; set; } = null!;
        public Address? ShippingAddress { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Order
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public int OrderId { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty; // Pending, Processing, Shipped, Delivered, Cancelled

        public string? PaymentStatus { get; set; } // Pending, Paid, Failed
    }
}
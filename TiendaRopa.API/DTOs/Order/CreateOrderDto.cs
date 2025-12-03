using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Order
{
    public class CreateOrderDto
    {
        [Required(ErrorMessage = "La dirección de envío es obligatoria")]
        public int ShippingAddressId { get; set; }

        [Required(ErrorMessage = "El método de pago es obligatorio")]
        public string PaymentMethod { get; set; } = string.Empty;

        public string? Notes { get; set; }
    }
}
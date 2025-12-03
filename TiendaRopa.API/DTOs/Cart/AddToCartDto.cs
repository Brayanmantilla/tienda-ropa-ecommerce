using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Cart
{
    public class AddToCartDto
    {
        [Required]
        public int VariantId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser al menos 1")]
        public int Quantity { get; set; }
    }
}
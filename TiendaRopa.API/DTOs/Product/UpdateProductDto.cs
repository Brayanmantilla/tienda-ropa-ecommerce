using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Product
{
    public class UpdateProductDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        [Range(0.01, 999999.99)]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Gender { get; set; } = string.Empty;

        public string? Brand { get; set; }

        public bool IsActive { get; set; }
    }
}
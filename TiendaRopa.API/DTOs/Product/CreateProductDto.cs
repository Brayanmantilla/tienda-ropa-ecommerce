using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Product
{
    public class CreateProductDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required(ErrorMessage = "El precio es obligatorio")]
        [Range(0.01, 999999.99, ErrorMessage = "El precio debe ser mayor a 0")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "La categoría es obligatoria")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "El género es obligatorio")]
        public string Gender { get; set; } = string.Empty;

        public string? Brand { get; set; }

        // URLs de imágenes
        public List<string> ImageUrls { get; set; } = new List<string>();

        // Variantes del producto
        public List<CreateProductVariantDto> Variants { get; set; } = new List<CreateProductVariantDto>();
    }

    public class CreateProductVariantDto
    {
        [Required]
        public string Size { get; set; } = string.Empty;

        [Required]
        public string Color { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        public string? SKU { get; set; }
    }
}
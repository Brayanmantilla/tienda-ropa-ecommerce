namespace TiendaRopa.API.DTOs.Product
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string? Brand { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }

        // Imágenes del producto
        public List<ProductImageDto> Images { get; set; } = new List<ProductImageDto>();

        // Variantes (tallas y colores disponibles)
        public List<ProductVariantDto> Variants { get; set; } = new List<ProductVariantDto>();
    }

    public class ProductImageDto
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class ProductVariantDto
    {
        public int VariantId { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int Stock { get; set; }
        public string? SKU { get; set; }
    }
}
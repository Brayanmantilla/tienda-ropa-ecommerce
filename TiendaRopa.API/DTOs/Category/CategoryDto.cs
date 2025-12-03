namespace TiendaRopa.API.DTOs.Category
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public int ProductCount { get; set; } // Cantidad de productos en esta categoría
    }
}
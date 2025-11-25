using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

        // Relación
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
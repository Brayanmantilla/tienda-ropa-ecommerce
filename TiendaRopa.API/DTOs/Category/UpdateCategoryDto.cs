using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Category
{
    public class UpdateCategoryDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsActive { get; set; }
    }
}
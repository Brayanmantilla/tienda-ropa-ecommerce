
using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class CompanyInfo
    {
        [Key]
        public int CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Logo { get; set; }
        public string? FacebookUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? WhatsAppNumber { get; set; }
    }
}
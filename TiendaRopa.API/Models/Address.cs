using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.Models
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = "Colombia";
        public bool IsDefault { get; set; } = false;

        // Relación
        public User User { get; set; } = null!;
    }
}
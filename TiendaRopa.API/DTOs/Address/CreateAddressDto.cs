using System.ComponentModel.DataAnnotations;

namespace TiendaRopa.API.DTOs.Address
{
    public class CreateAddressDto
    {
        [Required]
        [MaxLength(200)]
        public string Street { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string ZipCode { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Country { get; set; } = "Colombia";

        public bool IsDefault { get; set; } = false;
    }
}
using TiendaRopa.API.DTOs.Address;

namespace TiendaRopa.API.Interfaces
{
    public interface IAddressService
    {
        Task<List<AddressDto>> GetUserAddressesAsync(int userId);
        Task<AddressDto?> GetByIdAsync(int addressId, int userId);
        Task<AddressDto> CreateAsync(int userId, CreateAddressDto dto);
        Task<AddressDto> UpdateAsync(int addressId, int userId, CreateAddressDto dto);
        Task<bool> DeleteAsync(int addressId, int userId);
    }
}
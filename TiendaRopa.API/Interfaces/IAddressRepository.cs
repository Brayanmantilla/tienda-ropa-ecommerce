using TiendaRopa.API.Models;

namespace TiendaRopa.API.Interfaces
{
    public interface IAddressRepository
    {
        Task<List<Address>> GetUserAddressesAsync(int userId);
        Task<Address?> GetByIdAsync(int addressId, int userId);
        Task<Address> CreateAsync(Address address);
        Task UpdateAsync(Address address);
        Task DeleteAsync(int addressId);
    }
}
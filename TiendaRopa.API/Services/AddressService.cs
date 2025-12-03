using TiendaRopa.API.DTOs.Address;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<List<AddressDto>> GetUserAddressesAsync(int userId)
        {
            var addresses = await _addressRepository.GetUserAddressesAsync(userId);
            return addresses.Select(MapToDto).ToList();
        }

        public async Task<AddressDto?> GetByIdAsync(int addressId, int userId)
        {
            var address = await _addressRepository.GetByIdAsync(addressId, userId);
            return address != null ? MapToDto(address) : null;
        }

        public async Task<AddressDto> CreateAsync(int userId, CreateAddressDto dto)
        {
            var address = new Address
            {
                UserId = userId,
                Street = dto.Street,
                City = dto.City,
                State = dto.State,
                ZipCode = dto.ZipCode,
                Country = dto.Country,
                IsDefault = dto.IsDefault
            };

            var created = await _addressRepository.CreateAsync(address);
            return MapToDto(created);
        }

        public async Task<AddressDto> UpdateAsync(int addressId, int userId, CreateAddressDto dto)
        {
            var address = await _addressRepository.GetByIdAsync(addressId, userId);

            if (address == null)
                throw new Exception("Dirección no encontrada");

            address.Street = dto.Street;
            address.City = dto.City;
            address.State = dto.State;
            address.ZipCode = dto.ZipCode;
            address.Country = dto.Country;
            address.IsDefault = dto.IsDefault;

            await _addressRepository.UpdateAsync(address);

            var updated = await _addressRepository.GetByIdAsync(addressId, userId);
            return MapToDto(updated!);
        }

        public async Task<bool> DeleteAsync(int addressId, int userId)
        {
            var address = await _addressRepository.GetByIdAsync(addressId, userId);

            if (address == null)
                throw new Exception("Dirección no encontrada");

            await _addressRepository.DeleteAsync(addressId);
            return true;
        }

        private AddressDto MapToDto(Address address)
        {
            return new AddressDto
            {
                AddressId = address.AddressId,
                Street = address.Street,
                City = address.City,
                State = address.State,
                ZipCode = address.ZipCode,
                Country = address.Country,
                IsDefault = address.IsDefault
            };
        }
    }
}
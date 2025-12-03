using Microsoft.EntityFrameworkCore;
using TiendaRopa.API.Data;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _context;

        public AddressRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Address>> GetUserAddressesAsync(int userId)
        {
            return await _context.Addresses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.IsDefault)
                .ToListAsync();
        }

        public async Task<Address?> GetByIdAsync(int addressId, int userId)
        {
            return await _context.Addresses
                .FirstOrDefaultAsync(a => a.AddressId == addressId && a.UserId == userId);
        }

        public async Task<Address> CreateAsync(Address address)
        {
            // Si es dirección por defecto, quitar el default de las demás
            if (address.IsDefault)
            {
                var existingAddresses = await _context.Addresses
                    .Where(a => a.UserId == address.UserId && a.IsDefault)
                    .ToListAsync();

                foreach (var addr in existingAddresses)
                {
                    addr.IsDefault = false;
                }
            }

            await _context.Addresses.AddAsync(address);
            await _context.SaveChangesAsync();
            return address;
        }

        public async Task UpdateAsync(Address address)
        {
            // Si se marca como default, quitar el default de las demás
            if (address.IsDefault)
            {
                var existingAddresses = await _context.Addresses
                    .Where(a => a.UserId == address.UserId && a.AddressId != address.AddressId && a.IsDefault)
                    .ToListAsync();

                foreach (var addr in existingAddresses)
                {
                    addr.IsDefault = false;
                }
            }

            _context.Addresses.Update(address);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int addressId)
        {
            var address = await _context.Addresses.FindAsync(addressId);
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
            }
        }
    }
}
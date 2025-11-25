using TiendaRopa.API.Models;

namespace TiendaRopa.API.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int productId);
        Task<Product> CreateAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int productId);
        Task<List<Product>> GetByCategoryAsync(int categoryId);
        Task<List<Product>> GetByGenderAsync(string gender);
    }
}
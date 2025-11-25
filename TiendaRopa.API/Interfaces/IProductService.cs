using TiendaRopa.API.DTOs.Product;

namespace TiendaRopa.API.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int productId);
        Task<ProductDto> CreateAsync(CreateProductDto dto);
        Task<ProductDto> UpdateAsync(UpdateProductDto dto);
        Task<bool> DeleteAsync(int productId);
        Task<List<ProductDto>> GetByCategoryAsync(int categoryId);
        Task<List<ProductDto>> GetByGenderAsync(string gender);
    }
}
using TiendaRopa.API.DTOs.Category;

namespace TiendaRopa.API.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int categoryId);
        Task<CategoryDto> CreateAsync(CreateCategoryDto dto);
        Task<CategoryDto> UpdateAsync(UpdateCategoryDto dto);
        Task<bool> DeleteAsync(int categoryId);
    }
}
using TiendaRopa.API.DTOs.Category;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return categories.Select(MapToDto).ToList();
        }

        public async Task<CategoryDto?> GetByIdAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId);
            return category != null ? MapToDto(category) : null;
        }

        public async Task<CategoryDto> CreateAsync(CreateCategoryDto dto)
        {
            // Verificar si ya existe una categoría con ese nombre
            if (await _categoryRepository.ExistsAsync(dto.Name))
            {
                throw new Exception("Ya existe una categoría con ese nombre");
            }

            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                IsActive = true
            };

            var created = await _categoryRepository.CreateAsync(category);
            return MapToDto(created);
        }

        public async Task<CategoryDto> UpdateAsync(UpdateCategoryDto dto)
        {
            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);

            if (category == null)
                throw new Exception("Categoría no encontrada");

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.IsActive = dto.IsActive;

            await _categoryRepository.UpdateAsync(category);

            var updated = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            return MapToDto(updated!);
        }

        public async Task<bool> DeleteAsync(int categoryId)
        {
            await _categoryRepository.DeleteAsync(categoryId);
            return true;
        }

        private CategoryDto MapToDto(Category category)
        {
            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                Name = category.Name,
                Description = category.Description,
                IsActive = category.IsActive,
                ProductCount = category.Products?.Count(p => p.IsActive) ?? 0
            };
        }
    }
}
using TiendaRopa.API.DTOs.Product;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<ProductDto>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(MapToDto).ToList();
        }

        public async Task<ProductDto?> GetByIdAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            return product != null ? MapToDto(product) : null;
        }

        public async Task<ProductDto> CreateAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                Gender = dto.Gender,
                Brand = dto.Brand,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            // Agregar imágenes
            if (dto.ImageUrls != null && dto.ImageUrls.Any())
            {
                for (int i = 0; i < dto.ImageUrls.Count; i++)
                {
                    product.ProductImages.Add(new ProductImage
                    {
                        ImageUrl = dto.ImageUrls[i],
                        IsPrimary = i == 0, // La primera es la principal
                        DisplayOrder = i
                    });
                }
            }

            // Agregar variantes
            if (dto.Variants != null && dto.Variants.Any())
            {
                foreach (var variantDto in dto.Variants)
                {
                    product.ProductVariants.Add(new ProductVariant
                    {
                        Size = variantDto.Size,
                        Color = variantDto.Color,
                        Stock = variantDto.Stock,
                        SKU = variantDto.SKU
                    });
                }
            }

            var created = await _productRepository.CreateAsync(product);

            // Recargar con relaciones
            var result = await _productRepository.GetByIdAsync(created.ProductId);
            return MapToDto(result!);
        }

        public async Task<ProductDto> UpdateAsync(UpdateProductDto dto)
        {
            var product = await _productRepository.GetByIdAsync(dto.ProductId);

            if (product == null)
                throw new Exception("Producto no encontrado");

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            product.Gender = dto.Gender;
            product.Brand = dto.Brand;
            product.IsActive = dto.IsActive;

            await _productRepository.UpdateAsync(product);

            var updated = await _productRepository.GetByIdAsync(dto.ProductId);
            return MapToDto(updated!);
        }

        public async Task<bool> DeleteAsync(int productId)
        {
            await _productRepository.DeleteAsync(productId);
            return true;
        }

        public async Task<List<ProductDto>> GetByCategoryAsync(int categoryId)
        {
            var products = await _productRepository.GetByCategoryAsync(categoryId);
            return products.Select(MapToDto).ToList();
        }

        public async Task<List<ProductDto>> GetByGenderAsync(string gender)
        {
            var products = await _productRepository.GetByGenderAsync(gender);
            return products.Select(MapToDto).ToList();
        }

        // Método helper para mapear Product a ProductDto
        private ProductDto MapToDto(Product product)
        {
            return new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name ?? "",
                Gender = product.Gender,
                Brand = product.Brand,
                IsActive = product.IsActive,
                CreatedAt = product.CreatedAt,
                Images = product.ProductImages.Select(img => new ProductImageDto
                {
                    ImageId = img.ImageId,
                    ImageUrl = img.ImageUrl,
                    IsPrimary = img.IsPrimary,
                    DisplayOrder = img.DisplayOrder
                }).OrderBy(img => img.DisplayOrder).ToList(),
                Variants = product.ProductVariants.Select(v => new ProductVariantDto
                {
                    VariantId = v.VariantId,
                    Size = v.Size,
                    Color = v.Color,
                    Stock = v.Stock,
                    SKU = v.SKU
                }).ToList()
            };
        }
    }
}
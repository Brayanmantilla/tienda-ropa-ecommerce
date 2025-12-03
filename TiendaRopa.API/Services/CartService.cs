using Microsoft.EntityFrameworkCore;
using TiendaRopa.API.Data;
using TiendaRopa.API.DTOs.Cart;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly ApplicationDbContext _context;

        public CartService(ICartRepository cartRepository, ApplicationDbContext context)
        {
            _cartRepository = cartRepository;
            _context = context;
        }

        public async Task<CartDto> GetUserCartAsync(int userId)
        {
            var cartItems = await _cartRepository.GetUserCartAsync(userId);
            return MapToCartDto(cartItems);
        }

        public async Task<CartDto> AddToCartAsync(int userId, AddToCartDto dto)
        {
            // Buscar la variante con el producto
            var variant = await _context.ProductVariants
                .Include(v => v.Product)
                .FirstOrDefaultAsync(v => v.VariantId == dto.VariantId);

            if (variant == null)
                throw new Exception("Variante de producto no encontrada");

            if (variant.Stock < dto.Quantity)
                throw new Exception($"Stock insuficiente. Disponible: {variant.Stock}");

            // Verificar si ya existe en el carrito
            var existingItem = await _cartRepository.GetCartItemByVariantAsync(userId, dto.VariantId);

            if (existingItem != null)
            {
                // Actualizar cantidad
                var newQuantity = existingItem.Quantity + dto.Quantity;

                if (newQuantity > variant.Stock)
                    throw new Exception($"Stock insuficiente. Disponible: {variant.Stock}");

                existingItem.Quantity = newQuantity;
                await _cartRepository.UpdateCartItemAsync(existingItem);
            }
            else
            {
                // Agregar nuevo item
                var cartItem = new CartItem
                {
                    UserId = userId,
                    VariantId = dto.VariantId,
                    Quantity = dto.Quantity,
                    AddedAt = DateTime.Now
                };

                await _cartRepository.AddToCartAsync(cartItem);
            }

            return await GetUserCartAsync(userId);
        }

        public async Task<CartDto> UpdateCartItemAsync(int userId, UpdateCartItemDto dto)
        {
            var cartItem = await _cartRepository.GetCartItemAsync(dto.CartItemId, userId);

            if (cartItem == null)
                throw new Exception("Item no encontrado en el carrito");

            // Cargar la variante para verificar stock
            var variant = await _context.ProductVariants
                .FirstOrDefaultAsync(v => v.VariantId == cartItem.VariantId);

            if (variant == null)
                throw new Exception("Variante de producto no encontrada");

            if (dto.Quantity > variant.Stock)
                throw new Exception($"Stock insuficiente. Disponible: {variant.Stock}");

            cartItem.Quantity = dto.Quantity;
            await _cartRepository.UpdateCartItemAsync(cartItem);

            return await GetUserCartAsync(userId);
        }

        public async Task<bool> RemoveCartItemAsync(int userId, int cartItemId)
        {
            var cartItem = await _cartRepository.GetCartItemAsync(cartItemId, userId);

            if (cartItem == null)
                throw new Exception("Item no encontrado en el carrito");

            await _cartRepository.RemoveCartItemAsync(cartItemId);
            return true;
        }

        public async Task<bool> ClearCartAsync(int userId)
        {
            await _cartRepository.ClearCartAsync(userId);
            return true;
        }

        private CartDto MapToCartDto(List<CartItem> cartItems)
        {
            var items = cartItems.Select(ci => new CartItemDto
            {
                CartItemId = ci.CartItemId,
                ProductId = ci.ProductVariant.ProductId,
                ProductName = ci.ProductVariant.Product.Name,
                VariantId = ci.VariantId,
                Size = ci.ProductVariant.Size,
                Color = ci.ProductVariant.Color,
                Price = ci.ProductVariant.Product.Price,
                Quantity = ci.Quantity,
                Subtotal = ci.ProductVariant.Product.Price * ci.Quantity,
                ImageUrl = ci.ProductVariant.Product.ProductImages
                    .FirstOrDefault(img => img.IsPrimary)?.ImageUrl,
                Stock = ci.ProductVariant.Stock
            }).ToList();

            return new CartDto
            {
                Items = items,
                TotalItems = items.Sum(i => i.Quantity),
                TotalAmount = items.Sum(i => i.Subtotal)
            };
        }
    }
}
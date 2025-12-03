using TiendaRopa.API.Models;

namespace TiendaRopa.API.Interfaces
{
    public interface ICartRepository
    {
        Task<List<CartItem>> GetUserCartAsync(int userId);
        Task<CartItem?> GetCartItemAsync(int cartItemId, int userId);
        Task<CartItem?> GetCartItemByVariantAsync(int userId, int variantId);
        Task<CartItem> AddToCartAsync(CartItem cartItem);
        Task UpdateCartItemAsync(CartItem cartItem);
        Task RemoveCartItemAsync(int cartItemId);
        Task ClearCartAsync(int userId);
    }
}
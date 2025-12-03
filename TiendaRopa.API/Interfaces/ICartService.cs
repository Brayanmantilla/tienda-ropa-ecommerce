using TiendaRopa.API.DTOs.Cart;

namespace TiendaRopa.API.Interfaces
{
    public interface ICartService
    {
        Task<CartDto> GetUserCartAsync(int userId);
        Task<CartDto> AddToCartAsync(int userId, AddToCartDto dto);
        Task<CartDto> UpdateCartItemAsync(int userId, UpdateCartItemDto dto);
        Task<bool> RemoveCartItemAsync(int userId, int cartItemId);
        Task<bool> ClearCartAsync(int userId);
    }
}
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetUserOrdersAsync(int userId);
        Task<Order?> GetByIdAsync(int orderId);
        Task<Order?> GetByIdAndUserAsync(int orderId, int userId);
        Task<Order> CreateAsync(Order order);
        Task UpdateAsync(Order order);
        Task<List<Order>> GetAllOrdersAsync();
        Task<string> GenerateOrderNumberAsync();
    }
}
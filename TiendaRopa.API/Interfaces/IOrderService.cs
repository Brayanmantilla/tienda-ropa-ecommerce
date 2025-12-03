using TiendaRopa.API.DTOs.Order;

namespace TiendaRopa.API.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetUserOrdersAsync(int userId);
        Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId);
        Task<OrderDto> CreateOrderAsync(int userId, CreateOrderDto dto);
        Task<OrderDto> UpdateOrderStatusAsync(UpdateOrderStatusDto dto);
        Task<List<OrderDto>> GetAllOrdersAsync();
    }
}
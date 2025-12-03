using TiendaRopa.API.DTOs.Order;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly Data.ApplicationDbContext _context;

        public OrderService(
            IOrderRepository orderRepository,
            ICartRepository cartRepository,
            Data.ApplicationDbContext context)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _context = context;
        }

        public async Task<List<OrderDto>> GetUserOrdersAsync(int userId)
        {
            var orders = await _orderRepository.GetUserOrdersAsync(userId);
            return orders.Select(MapToDto).ToList();
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId)
        {
            var order = await _orderRepository.GetByIdAndUserAsync(orderId, userId);
            return order != null ? MapToDto(order) : null;
        }

        public async Task<OrderDto> CreateOrderAsync(int userId, CreateOrderDto dto)
        {
            // Obtener items del carrito
            var cartItems = await _cartRepository.GetUserCartAsync(userId);

            if (!cartItems.Any())
                throw new Exception("El carrito está vacío");

            // Verificar stock
            foreach (var cartItem in cartItems)
            {
                if (cartItem.Quantity > cartItem.ProductVariant.Stock)
                    throw new Exception($"Stock insuficiente para {cartItem.ProductVariant.Product.Name}");
            }

            // Obtener dirección de envío
            var address = await _context.Addresses.FindAsync(dto.ShippingAddressId);
            if (address == null || address.UserId != userId)
                throw new Exception("Dirección de envío no válida");

            // Generar número de orden
            var orderNumber = await _orderRepository.GenerateOrderNumberAsync();

            // Calcular total
            var totalAmount = cartItems.Sum(ci => ci.ProductVariant.Product.Price * ci.Quantity);

            // Crear orden
            var order = new Order
            {
                UserId = userId,
                OrderNumber = orderNumber,
                TotalAmount = totalAmount,
                Status = "Pending",
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = "Pending",
                ShippingAddressId = dto.ShippingAddressId,
                Notes = dto.Notes,
                CreatedAt = DateTime.Now
            };

            // Crear items de la orden
            foreach (var cartItem in cartItems)
            {
                var orderItem = new OrderItem
                {
                    ProductId = cartItem.ProductVariant.ProductId,
                    VariantId = cartItem.VariantId,
                    Quantity = cartItem.Quantity,
                    UnitPrice = cartItem.ProductVariant.Product.Price,
                    Subtotal = cartItem.ProductVariant.Product.Price * cartItem.Quantity
                };
                order.OrderItems.Add(orderItem);

                // Reducir stock
                cartItem.ProductVariant.Stock -= cartItem.Quantity;
            }

            // Guardar orden
            var createdOrder = await _orderRepository.CreateAsync(order);

            // Limpiar carrito
            await _cartRepository.ClearCartAsync(userId);

            // Recargar con todas las relaciones
            var result = await _orderRepository.GetByIdAsync(createdOrder.OrderId);
            return MapToDto(result!);
        }

        public async Task<OrderDto> UpdateOrderStatusAsync(UpdateOrderStatusDto dto)
        {
            var order = await _orderRepository.GetByIdAsync(dto.OrderId);

            if (order == null)
                throw new Exception("Orden no encontrada");

            order.Status = dto.Status;

            if (!string.IsNullOrEmpty(dto.PaymentStatus))
                order.PaymentStatus = dto.PaymentStatus;

            await _orderRepository.UpdateAsync(order);

            var updated = await _orderRepository.GetByIdAsync(dto.OrderId);
            return MapToDto(updated!);
        }

        public async Task<List<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            return orders.Select(MapToDto).ToList();
        }

        private OrderDto MapToDto(Order order)
        {
            return new OrderDto
            {
                OrderId = order.OrderId,
                OrderNumber = order.OrderNumber,
                CreatedAt = order.CreatedAt,
                Status = order.Status,
                PaymentMethod = order.PaymentMethod,
                PaymentStatus = order.PaymentStatus,
                TotalAmount = order.TotalAmount,
                Notes = order.Notes,
                ShippingAddress = new ShippingAddressDto
                {
                    Street = order.ShippingAddress.Street,
                    City = order.ShippingAddress.City,
                    State = order.ShippingAddress.State,
                    ZipCode = order.ShippingAddress.ZipCode,
                    Country = order.ShippingAddress.Country
                },
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    Size = oi.ProductVariant.Size,
                    Color = oi.ProductVariant.Color,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    Subtotal = oi.Subtotal,
                    ImageUrl = oi.Product.ProductImages.FirstOrDefault(img => img.IsPrimary)?.ImageUrl
                }).ToList()
            };
        }
    }
}
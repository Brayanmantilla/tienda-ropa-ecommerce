import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Package, Calendar, CreditCard, Loader2 } from 'lucide-react';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5266/api/Orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Error al cargar órdenes:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-purple-100 text-purple-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            'Pending': 'Pendiente',
            'Processing': 'Procesando',
            'Shipped': 'Enviado',
            'Delivered': 'Entregado',
            'Cancelled': 'Cancelado'
        };
        return texts[status] || status;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <Package size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-4">No tienes órdenes aún</h2>
                <p className="text-gray-600 mb-8">
                    Comienza a comprar para ver tus pedidos aquí
                </p>
                <Link to="/products" className="btn-primary">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Mis Órdenes</h1>

            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.orderId} className="card p-6">
                        <div className="flex flex-wrap items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Orden #{order.orderNumber}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center space-x-1">
                                        <Calendar size={16} />
                                        <span>{new Date(order.createdAt).toLocaleDateString('es-CO')}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <CreditCard size={16} />
                                        <span>{order.paymentMethod}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                                <p className="text-2xl font-bold text-primary-600 mt-2">
                                    ${order.totalAmount.toLocaleString('es-CO')}
                                </p>
                            </div>
                        </div>

                        {/* Items de la orden */}
                        <div className="border-t pt-4">
                            <p className="text-sm font-semibold mb-3">Productos ({order.items.length})</p>
                            <div className="space-y-3">
                                {order.items.map(item => (
                                    <div key={item.orderItemId} className="flex gap-3">
                                        <img
                                            src={item.imageUrl || 'https://via.placeholder.com/60'}
                                            alt={item.productName}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.productName}</p>
                                            <p className="text-sm text-gray-600">
                                                Talla: {item.size} | Color: {item.color}
                                            </p>
                                            <p className="text-sm">
                                                ${item.unitPrice.toLocaleString('es-CO')} x {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                ${item.subtotal.toLocaleString('es-CO')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dirección de envío */}
                        <div className="border-t mt-4 pt-4">
                            <p className="text-sm font-semibold mb-2">Dirección de envío:</p>
                            <p className="text-sm text-gray-600">
                                {order.shippingAddress.street}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                {order.shippingAddress.country}
                            </p>
                        </div>

                        {order.notes && (
                            <div className="border-t mt-4 pt-4">
                                <p className="text-sm font-semibold mb-2">Notas:</p>
                                <p className="text-sm text-gray-600">{order.notes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
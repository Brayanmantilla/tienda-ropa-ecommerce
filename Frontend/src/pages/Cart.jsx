import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../services/api';
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart();
            setCart(data);
        } catch (err) {
            console.error('Error al cargar carrito:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setUpdating(true);
            await cartService.updateCartItem(cartItemId, newQuantity);
            await loadCart();
        } catch (err) {
            alert(err.response?.data?.message || 'Error al actualizar cantidad');
        } finally {
            setUpdating(false);
        }
    };

    const removeItem = async (cartItemId) => {
        if (!confirm('¿Eliminar este producto del carrito?')) return;

        try {
            setUpdating(true);
            await cartService.removeCartItem(cartItemId);
            await loadCart();
        } catch (err) {
            alert('Error al eliminar producto');
        } finally {
            setUpdating(false);
        }
    };

    const clearCart = async () => {
        if (!confirm('¿Vaciar todo el carrito?')) return;

        try {
            setUpdating(true);
            await cartService.clearCart();
            await loadCart();
        } catch (err) {
            alert('Error al vaciar carrito');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-600 mb-8">
                    Agrega productos para comenzar tu compra
                </p>
                <Link to="/products" className="btn-primary">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Mi Carrito</h1>
                <button
                    onClick={clearCart}
                    disabled={updating}
                    className="text-red-600 hover:text-red-700 text-sm"
                >
                    Vaciar carrito
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items del carrito */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map(item => (
                        <div key={item.cartItemId} className="card p-4">
                            <div className="flex gap-4">
                                {/* Imagen */}
                                <img
                                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={item.productName}
                                    className="w-24 h-24 object-cover rounded"
                                />

                                {/* Info */}
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg mb-1">
                                        {item.productName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Talla: {item.size} | Color: {item.color}
                                    </p>
                                    <p className="text-lg font-bold text-primary-600">
                                        ${item.price.toLocaleString('es-CO')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Stock disponible: {item.stock}
                                    </p>
                                </div>

                                {/* Cantidad y acciones */}
                                <div className="flex flex-col items-end justify-between">
                                    <button
                                        onClick={() => removeItem(item.cartItemId)}
                                        disabled={updating}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                            disabled={updating || item.quantity <= 1}
                                            className="bg-gray-200 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                            disabled={updating || item.quantity >= item.stock}
                                            className="bg-gray-200 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <p className="text-lg font-bold">
                                        ${item.subtotal.toLocaleString('es-CO')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-2xl font-bold mb-6">Resumen</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Productos ({cart.totalItems})</span>
                                <span className="font-semibold">
                                    ${cart.totalAmount.toLocaleString('es-CO')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Envío</span>
                                <span className="font-semibold text-green-600">GRATIS</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary-600">
                                    ${cart.totalAmount.toLocaleString('es-CO')}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="btn-primary w-full py-3 text-lg"
                        >
                            Proceder al Pago
                        </button>

                        <Link
                            to="/products"
                            className="block text-center text-primary-600 hover:text-primary-700 mt-4"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
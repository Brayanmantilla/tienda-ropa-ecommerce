import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/api';
import axios from 'axios';
import { Loader2, MapPin, CreditCard, Package } from 'lucide-react';
import toast from 'react-hot-toast';  // ← AGREGAR

function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1);

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Colombia'
    });

    const [paymentMethod, setPaymentMethod] = useState('Tarjeta de crédito');
    const [notes, setNotes] = useState('');
    const [addressId, setAddressId] = useState(null);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart();

            if (!data || data.items.length === 0) {
                navigate('/cart');
                return;
            }

            setCart(data);
        } catch (err) {
            console.error('Error al cargar carrito:', err);
            navigate('/cart');
        } finally {
            setLoading(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
            toast.error('Completa todos los campos de la dirección');
            return;
        }

        try {
            setProcessing(true);

            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5266/api/Addresses',
                {
                    ...shippingAddress,
                    isDefault: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setAddressId(response.data.addressId);
            setStep(2);
            toast.success('Dirección guardada correctamente');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al guardar dirección');
        } finally {
            setProcessing(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!addressId) {
            toast.error('Error: No se ha guardado la dirección');
            return;
        }

        try {
            setProcessing(true);

            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5266/api/Orders',
                {
                    shippingAddressId: addressId,
                    paymentMethod: paymentMethod,
                    notes: notes
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success(`¡Orden creada! Número: ${response.data.orderNumber}`, {
                duration: 5000
            });

            setTimeout(() => {
                navigate('/my-orders');
            }, 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al crear la orden');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="card p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                                }`}>
                                1
                            </div>
                            <h2 className="text-xl font-bold">Dirección de Envío</h2>
                            <MapPin className="text-gray-400" size={20} />
                        </div>

                        {step === 1 ? (
                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Dirección *</label>
                                    <input
                                        type="text"
                                        value={shippingAddress.street}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                                        className="input"
                                        placeholder="Calle 10 #20-30"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Ciudad *</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.city}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                            className="input"
                                            placeholder="Piedecuesta"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Departamento *</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.state}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                            className="input"
                                            placeholder="Santander"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Código Postal *</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.zipCode}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                                            className="input"
                                            placeholder="681011"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">País</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.country}
                                            className="input bg-gray-100"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Guardando...</span>
                                        </>
                                    ) : (
                                        <span>Continuar al Pago</span>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Enviar a:</p>
                                <p className="font-semibold">{shippingAddress.street}</p>
                                <p className="text-sm text-gray-600">
                                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                                </p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-primary-600 text-sm mt-2 hover:text-primary-700"
                                >
                                    Cambiar dirección
                                </button>
                            </div>
                        )}
                    </div>

                    {step === 2 && (
                        <div className="card p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                                    2
                                </div>
                                <h2 className="text-xl font-bold">Método de Pago</h2>
                                <CreditCard className="text-gray-400" size={20} />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Selecciona método de pago</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="input"
                                    >
                                        <option>Tarjeta de crédito</option>
                                        <option>Tarjeta de débito</option>
                                        <option>PSE</option>
                                        <option>Efectivo contra entrega</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Notas del pedido (opcional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="input"
                                        rows="3"
                                        placeholder="Instrucciones especiales de entrega..."
                                    />
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={processing}
                                    className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Package size={20} />
                                            <span>Realizar Pedido</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

                        <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                            {cart.items.map(item => (
                                <div key={item.cartItemId} className="flex gap-3 pb-3 border-b">
                                    <img
                                        src={item.imageUrl || 'https://via.placeholder.com/60'}
                                        alt={item.productName}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{item.productName}</p>
                                        <p className="text-xs text-gray-600">
                                            {item.size} | {item.color}
                                        </p>
                                        <p className="text-sm">
                                            ${item.price.toLocaleString('es-CO')} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">
                                    ${cart.totalAmount.toLocaleString('es-CO')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Envío</span>
                                <span className="font-semibold text-green-600">GRATIS</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary-600">
                                    ${cart.totalAmount.toLocaleString('es-CO')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
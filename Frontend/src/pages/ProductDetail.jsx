import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, cartService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await productService.getById(id);
            setProduct(data);

            // Seleccionar la primera variante disponible
            if (data.variants && data.variants.length > 0) {
                const firstAvailable = data.variants.find(v => v.stock > 0);
                if (firstAvailable) {
                    setSelectedVariant(firstAvailable);
                }
            }
        } catch (err) {
            console.error('Error al cargar producto:', err);
            toast.error('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error('Debes iniciar sesión para agregar al carrito');
            setTimeout(() => navigate('/login'), 1500);
            return;
        }

        if (!selectedVariant) {
            toast.error('Selecciona una talla y color');
            return;
        }

        if (selectedVariant.stock < quantity) {
            toast.error('Stock insuficiente');
            return;
        }

        try {
            setAddingToCart(true);
            await cartService.addToCart(selectedVariant.variantId, quantity);
            toast.success('¡Producto agregado al carrito!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al agregar al carrito');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <p className="text-center text-gray-500">Producto no encontrado</p>
            </div>
        );
    }

    const primaryImage = product.productImages?.find(img => img.isPrimary)?.imageUrl ||
        product.productImages?.[0]?.imageUrl ||
        'https://via.placeholder.com/500';

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/products')}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition"
            >
                <ArrowLeft size={20} />
                <span>Volver a productos</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Imagen */}
                <div>
                    <img
                        src={primaryImage}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Información */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-3xl font-bold text-primary-600">
                            ${product.price.toLocaleString('es-CO')}
                        </span>
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {product.categoryName}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Selectores de Talla y Color */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Selector de Talla */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Talla:</label>
                                    <select
                                        value={selectedVariant?.size || ''}
                                        onChange={(e) => {
                                            const size = e.target.value;
                                            const variant = product.variants.find(v => v.size === size && v.stock > 0);
                                            if (variant) {
                                                setSelectedVariant(variant);
                                            }
                                        }}
                                        className="input"
                                    >
                                        <option value="">Selecciona una talla</option>
                                        {[...new Set(product.variants.map(v => v.size))].map(size => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Selector de Color */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Color:</label>
                                    <select
                                        value={selectedVariant?.color || ''}
                                        onChange={(e) => {
                                            const color = e.target.value;
                                            const size = selectedVariant?.size;
                                            if (size) {
                                                const variant = product.variants.find(v => v.size === size && v.color === color);
                                                if (variant) {
                                                    setSelectedVariant(variant);
                                                }
                                            }
                                        }}
                                        className="input"
                                        disabled={!selectedVariant?.size}
                                    >
                                        <option value="">Selecciona un color</option>
                                        {selectedVariant?.size &&
                                            product.variants
                                                .filter(v => v.size === selectedVariant.size)
                                                .map(variant => (
                                                    <option
                                                        key={variant.variantId}
                                                        value={variant.color}
                                                        disabled={variant.stock === 0}
                                                    >
                                                        {variant.color} {variant.stock === 0 ? '(Agotado)' : `(Stock: ${variant.stock})`}
                                                    </option>
                                                ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* Información de stock */}
                            {selectedVariant && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            Talla: <span className="font-semibold">{selectedVariant.size}</span> |
                                            Color: <span className="font-semibold">{selectedVariant.color}</span>
                                        </span>
                                        <span className={`text-sm font-semibold ${selectedVariant.stock > 10 ? 'text-green-600' :
                                                selectedVariant.stock > 0 ? 'text-orange-600' :
                                                    'text-red-600'
                                            }`}>
                                            {selectedVariant.stock > 0 ? `${selectedVariant.stock} disponibles` : 'Agotado'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Selector de Cantidad */}
                    {selectedVariant && selectedVariant.stock > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Cantidad:</h3>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Botón Agregar al Carrito */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedVariant || selectedVariant.stock === 0 || addingToCart}
                        className="btn-primary w-full py-3 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {addingToCart ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Agregando...</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={20} />
                                <span>Agregar al Carrito</span>
                            </>
                        )}
                    </button>

                    {/* Información Adicional */}
                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold mb-3">Información del Producto:</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Material: {product.material || 'Algodón 100%'}</li>
                            <li>• Género: {product.gender}</li>
                            <li>• Categoría: {product.categoryName}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
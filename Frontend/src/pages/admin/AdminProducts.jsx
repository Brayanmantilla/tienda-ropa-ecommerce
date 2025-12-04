import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService } from '../../services/api';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productsData, categoriesData] = await Promise.all([
                productService.getAll(),
                categoryService.getAll()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (err) {
            toast.error('Error al cargar productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5266/api/Products/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            toast.success('Producto eliminado correctamente');
            loadData();
        } catch (err) {
            toast.error('Error al eliminar producto');
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
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Gestionar Productos</h1>
                <Link to="/admin/products/create" className="btn-primary flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nuevo Producto</span>
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product.productId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.productImages?.[0]?.imageUrl || 'https://via.placeholder.com/50'}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.gender}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{product.categoryName}</td>
                                    <td className="px-6 py-4 font-semibold">${product.price.toLocaleString('es-CO')}</td>
                                    <td className="px-6 py-4">
                                        {product.isNew && (
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Nuevo</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to={`/admin/products/edit/${product.productId}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.productId)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
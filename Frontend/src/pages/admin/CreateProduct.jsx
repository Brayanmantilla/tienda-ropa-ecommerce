import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/api';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

function CreateProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        gender: 'Unisex',
        isNew: false,
        isActive: true,
        productImages: [{ imageUrl: '', isPrimary: true }],
        variants: [{ size: '', color: '', stock: '' }]
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (err) {
            toast.error('Error al cargar categorías');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.productImages];
        newImages[index].imageUrl = value;
        setFormData({ ...formData, productImages: newImages });
    };

    const addImage = () => {
        setFormData({
            ...formData,
            productImages: [...formData.productImages, { imageUrl: '', isPrimary: false }]
        });
    };

    const removeImage = (index) => {
        const newImages = formData.productImages.filter((_, i) => i !== index);
        setFormData({ ...formData, productImages: newImages });
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index][field] = value;
        setFormData({ ...formData, variants: newVariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { size: '', color: '', stock: '' }]
        });
    };

    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!formData.name || !formData.price || !formData.categoryId) {
            toast.error('Completa todos los campos obligatorios');
            return;
        }

        if (formData.productImages.some(img => !img.imageUrl)) {
            toast.error('Agrega al menos una imagen válida');
            return;
        }

        if (formData.variants.some(v => !v.size || !v.color || !v.stock)) {
            toast.error('Completa todas las variantes');
            return;
        }

        try {
            setLoading(true);

            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                categoryId: parseInt(formData.categoryId),
                variants: formData.variants.map(v => ({
                    ...v,
                    stock: parseInt(v.stock)
                }))
            };

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5266/api/Products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error('Error al crear producto');

            toast.success('¡Producto creado exitosamente!');
            navigate('/admin/products');
        } catch (err) {
            toast.error('Error al crear producto');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
            >
                <ArrowLeft size={20} />
                <span>Volver a productos</span>
            </button>

            <h1 className="text-4xl font-bold mb-8">Crear Nuevo Producto</h1>

            <form onSubmit={handleSubmit} className="card p-6 space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nombre del Producto *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Precio *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Descripción *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input"
                        rows="3"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Categoría *</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="">Selecciona...</option>
                            {categories.map(cat => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Género</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Unisex">Unisex</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-4 pt-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isNew"
                                checked={formData.isNew}
                                onChange={handleChange}
                                className="rounded"
                            />
                            <span className="text-sm">Producto Nuevo</span>
                        </label>
                    </div>
                </div>

                {/* Imágenes */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium">Imágenes *</label>
                        <button type="button" onClick={addImage} className="text-primary-600 text-sm flex items-center space-x-1">
                            <Plus size={16} />
                            <span>Agregar imagen</span>
                        </button>
                    </div>
                    {formData.productImages.map((img, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="url"
                                value={img.imageUrl}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="input"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                required
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Variantes */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium">Variantes (Talla/Color) *</label>
                        <button type="button" onClick={addVariant} className="text-primary-600 text-sm flex items-center space-x-1">
                            <Plus size={16} />
                            <span>Agregar variante</span>
                        </button>
                    </div>
                    {formData.variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                            <input
                                type="text"
                                value={variant.size}
                                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                className="input"
                                placeholder="Talla (ej: M, 32)"
                                required
                            />
                            <input
                                type="text"
                                value={variant.color}
                                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                className="input"
                                placeholder="Color"
                                required
                            />
                            <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                className="input"
                                placeholder="Stock"
                                min="0"
                                required
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3"
                >
                    {loading ? 'Creando...' : 'Crear Producto'}
                </button>
            </form>
        </div>
    );
}

export default CreateProduct;
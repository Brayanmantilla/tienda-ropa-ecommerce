import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const primaryImage = product.productImages?.find(img => img.isPrimary)?.imageUrl ||
        product.productImages?.[0]?.imageUrl ||
        'https://via.placeholder.com/300';

    return (
        <Link to={`/products/${product.productId}`} className="card group animate-fadeIn">
            <div className="relative overflow-hidden">
                <img
                    src={primaryImage}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                        Nuevo
                    </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                        ${product.price.toLocaleString('es-CO')}
                    </span>

                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.categoryName}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
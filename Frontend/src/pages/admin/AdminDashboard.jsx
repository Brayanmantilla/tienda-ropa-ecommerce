import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, BarChart } from 'lucide-react';

function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Tarjeta Productos */}
                <div className="card p-6 hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <Package className="text-primary-600" size={32} />
                        <span className="text-3xl font-bold">-</span>
                    </div>
                    <h3 className="text-gray-600 text-sm">Total Productos</h3>
                </div>

                {/* Tarjeta Órdenes */}
                <div className="card p-6 hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <ShoppingBag className="text-green-600" size={32} />
                        <span className="text-3xl font-bold">-</span>
                    </div>
                    <h3 className="text-gray-600 text-sm">Total Órdenes</h3>
                </div>

                {/* Tarjeta Usuarios */}
                <div className="card p-6 hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="text-purple-600" size={32} />
                        <span className="text-3xl font-bold">-</span>
                    </div>
                    <h3 className="text-gray-600 text-sm">Total Usuarios</h3>
                </div>

                {/* Tarjeta Ventas */}
                <div className="card p-6 hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <BarChart className="text-orange-600" size={32} />
                        <span className="text-3xl font-bold">$0</span>
                    </div>
                    <h3 className="text-gray-600 text-sm">Ventas Totales</h3>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin/products" className="card p-6 hover:shadow-xl transition group">
                    <Package className="text-primary-600 mb-4 group-hover:scale-110 transition" size={40} />
                    <h3 className="text-xl font-bold mb-2">Gestionar Productos</h3>
                    <p className="text-gray-600">Ver, crear, editar y eliminar productos</p>
                </Link>

                <Link to="/admin/orders" className="card p-6 hover:shadow-xl transition group">
                    <ShoppingBag className="text-green-600 mb-4 group-hover:scale-110 transition" size={40} />
                    <h3 className="text-xl font-bold mb-2">Gestionar Órdenes</h3>
                    <p className="text-gray-600">Ver y actualizar estado de órdenes</p>
                </Link>

                <Link to="/admin/categories" className="card p-6 hover:shadow-xl transition group">
                    <BarChart className="text-purple-600 mb-4 group-hover:scale-110 transition" size={40} />
                    <h3 className="text-xl font-bold mb-2">Gestionar Categorías</h3>
                    <p className="text-gray-600">Administrar categorías de productos</p>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
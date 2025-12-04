import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, Package, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated, isAdmin } = useAuth();

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-600">
                            TiendaRopa
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
                            Inicio
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary-600 transition">
                            Productos
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* Enlace Admin - Solo visible para Admin */}
                                {isAdmin() && (
                                    <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition flex items-center space-x-1">
                                        <Settings size={20} />
                                        <span>Admin</span>
                                    </Link>
                                )}

                                <Link to="/my-orders" className="text-gray-700 hover:text-primary-600 transition flex items-center space-x-1">
                                    <Package size={20} />
                                    <span>Mis Órdenes</span>
                                </Link>
                                <Link to="/cart" className="text-gray-700 hover:text-primary-600 transition flex items-center space-x-1">
                                    <ShoppingCart size={20} />
                                    <span>Carrito</span>
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">Hola, {user?.fullName}</span>
                                    <button
                                        onClick={logout}
                                        className="text-gray-700 hover:text-red-600 transition flex items-center space-x-1"
                                    >
                                        <LogOut size={20} />
                                        <span>Salir</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                            Inicio
                        </Link>
                        <Link to="/products" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                            Productos
                        </Link>
                        {isAuthenticated ? (
                            <>
                                {/* Enlace Admin móvil - Solo visible para Admin */}
                                {isAdmin() && (
                                    <Link to="/admin" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                                        Admin
                                    </Link>
                                )}
                                <Link to="/my-orders" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                                    Mis Órdenes
                                </Link>
                                <Link to="/cart" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                                    Carrito
                                </Link>
                                <button 
                                    onClick={() => { logout(); setIsOpen(false); }} 
                                    className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="block py-2 text-primary-600 font-medium" onClick={() => setIsOpen(false)}>
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
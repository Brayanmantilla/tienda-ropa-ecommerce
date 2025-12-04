import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Star } from 'lucide-react';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Bienvenido a TiendaRopa
                        </h1>
                        <p className="text-xl mb-8">
                            Encuentra las últimas tendencias en moda
                        </p>
                        <Link to="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Gran Variedad</h3>
                            <p className="text-gray-600">Miles de productos disponibles</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Envío Rápido</h3>
                            <p className="text-gray-600">Entrega en 2-3 días hábiles</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Compra Segura</h3>
                            <p className="text-gray-600">Pagos 100% seguros</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Calidad Premium</h3>
                            <p className="text-gray-600">Las mejores marcas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Categorías Populares
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
                                alt="Camisetas"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Camisetas</h3>
                            </div>
                        </Link>

                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
                                alt="Pantalones"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Pantalones</h3>
                            </div>
                        </Link>

                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop"
                                alt="Vestidos"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Vestidos</h3>
                            </div>
                        </Link>

                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
                                alt="Chaquetas"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Chaquetas</h3>
                            </div>
                        </Link>

                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
                                alt="Zapatos"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Zapatos</h3>
                            </div>
                        </Link>

                        <Link to="/products" className="card group overflow-hidden relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
                                alt="Accesorios"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex items-end">
                                <h3 className="text-white font-bold text-2xl p-6">Accesorios</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
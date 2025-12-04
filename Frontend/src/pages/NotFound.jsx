import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Página no encontrada
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="btn-primary flex items-center justify-center space-x-2">
                        <Home size={20} />
                        <span>Volver al Inicio</span>
                    </Link>
                    <Link to="/products" className="btn-secondary flex items-center justify-center space-x-2">
                        <Search size={20} />
                        <span>Ver Productos</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
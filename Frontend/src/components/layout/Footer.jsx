function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">TiendaRopa</h3>
                        <p className="text-gray-400">
                            La mejor tienda de ropa en línea.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-white">Términos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>info@tiendaropa.com</li>
                            <li>Piedecuesta, Santander</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; 2024 TiendaRopa</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
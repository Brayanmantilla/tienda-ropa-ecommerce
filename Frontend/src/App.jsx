import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Tienda de Ropa
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 px-4">
                        <p className="text-xl text-gray-700">
                            ¡Bienvenido! El frontend está funcionando correctamente.
                        </p>
                        <div className="mt-4">
                            <button className="btn-primary">
                                Botón de Prueba
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </Router>
    )
}

export default App
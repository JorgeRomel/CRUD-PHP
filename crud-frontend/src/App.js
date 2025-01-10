import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-semibold text-gray-800">
              Gestión de Productos
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <ProductList />
      </main>
    </div>
  );
}

export default App;
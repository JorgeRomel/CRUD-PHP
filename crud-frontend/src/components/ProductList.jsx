import React, { useState, useEffect } from 'react';
import api from '../config/api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      if (error.response?.status === 401) {
        // Si el token no es válido, redirigir al login
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error al eliminar el producto');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <ProductForm 
        onProductSaved={fetchProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold">
                Precio: S/.{product.price}
              </p>
              <p>Stock: {product.stock}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
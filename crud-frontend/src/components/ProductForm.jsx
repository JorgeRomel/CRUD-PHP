import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onProductSaved, editingProduct, setEditingProduct }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (editingProduct) {
        await axios.put(
          `http://localhost:8000/api/products/${editingProduct.id}`,
          formData,
          config
        );
      } else {
        await axios.post('http://localhost:8000/api/products', formData, config);
      }
      
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: ''
      });
      setEditingProduct(null);
      onProductSaved();
    } catch (error) {
      console.error('Error saving product:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      setError(error.response?.data?.message || 'Error al guardar el producto');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? 'Edit Product' : 'Añadir nuevo Producto'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Producto:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          min="0"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingProduct ? 'Update Product' : 'Añadir Producto'}
        </button>
        
        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: '',
                description: '',
                price: '',
                stock: ''
              });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/ProductList';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/products" 
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
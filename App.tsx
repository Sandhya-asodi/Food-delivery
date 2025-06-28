import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <HomePage />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            <Route path="/restaurant/:id" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <RestaurantPage />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            <Route path="/cart" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <CartPage />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            <Route path="/order/:id" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <OrderTrackingPage />
                  </main>
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 
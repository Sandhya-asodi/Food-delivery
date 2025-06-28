import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    paymentMethod: 'card' as 'cash' | 'card' | 'online',
    specialInstructions: ''
  });

  const deliveryFee = state.restaurantId ? 2.99 : 0;
  const tax = getSubtotal() * 0.08;
  const total = getSubtotal() + deliveryFee + tax;

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setOrderForm(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setOrderForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCheckout = async () => {
    if (!state.restaurantId || state.items.length === 0) {
      alert('Your cart is empty or no restaurant is selected');
      return;
    }

    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address.street', 'address.city', 'address.state', 'address.zipCode'];
    for (const field of requiredFields) {
      const value = field.includes('.') 
        ? (orderForm[field.split('.')[0] as keyof typeof orderForm] as Record<string, any>)[field.split('.')[1]]
        : orderForm[field as keyof typeof orderForm];
      
      if (!value) {
        alert(`Please fill in ${field.replace('.', ' ')}`);
        return;
      }
    }

    setIsCheckingOut(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            name: orderForm.name,
            email: orderForm.email,
            phone: orderForm.phone,
            address: orderForm.address
          },
          restaurantId: state.restaurantId,
          items: state.items,
          paymentMethod: orderForm.paymentMethod,
          specialInstructions: orderForm.specialInstructions
        })
      });
      const data = await response.json();
      if (response.ok && data.order && data.order.id) {
        alert('Order placed successfully!');
        clearCart();
        navigate(`/order/${data.order.id}`);
      } else {
        alert(data.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious food to get started!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order</h2>
            
            {state.restaurantName && (
              <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  Ordering from: <span className="font-semibold">{state.restaurantName}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              {state.items.map(item => (
                <div key={item.menuItemId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.menuItemId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={orderForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <input
                type="email"
                placeholder="Email"
                value={orderForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={orderForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <input
                type="text"
                placeholder="Street Address"
                value={orderForm.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={orderForm.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={orderForm.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={orderForm.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <select
                value={orderForm.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="cash">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
              
              <textarea
                placeholder="Special Instructions (optional)"
                value={orderForm.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isCheckingOut
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isCheckingOut ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 
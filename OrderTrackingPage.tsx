import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Clock, Truck, MapPin, Phone } from 'lucide-react';
import { Order } from '../types';

const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getStatusStep = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: CheckCircle },
      { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
      { key: 'preparing', label: 'Preparing Food', icon: CheckCircle },
      { key: 'ready', label: 'Ready for Pickup', icon: CheckCircle },
      { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];
    
    const currentIndex = steps.findIndex(step => step.key === status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'out_for_delivery': return 'text-blue-600';
      case 'ready': return 'text-orange-600';
      case 'preparing': return 'text-yellow-600';
      case 'confirmed': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order not found</h2>
        <p className="text-gray-600">The order you're looking for doesn't exist.</p>
      </div>
    );
  }

  const statusSteps = getStatusStep(order.status);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Order #{order.orderNumber}
            </h1>
            <p className={`text-lg font-semibold ${getStatusColor(order.status)}`}>
              {order.status.replace('_', ' ').toUpperCase()}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-gray-600">Ordered on</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">{order.restaurant.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{order.restaurant.address.street}, {order.restaurant.address.city}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{order.restaurant.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Status Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Status</h2>
            
            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : step.current 
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        step.completed || step.current ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </h3>
                      {step.current && (
                        <p className="text-sm text-gray-600 mt-1">
                          Your order is currently being processed
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimated Delivery */}
            {order.estimatedDeliveryTime && (
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-orange-800">Estimated Delivery</span>
                </div>
                <p className="text-orange-700 mt-1">
                  {new Date(order.estimatedDeliveryTime).toLocaleTimeString()} 
                  ({Math.ceil((new Date(order.estimatedDeliveryTime).getTime() - Date.now()) / 60000)} minutes remaining)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h3>
            
            {/* Delivery Address */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-600">
                <p>{order.user.name}</p>
                <p>{order.user.address.street}</p>
                <p>{order.user.address.city}, {order.user.address.state} {order.user.address.zipCode}</p>
                <p className="mt-2">{order.user.phone}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Special Instructions</h4>
                <p className="text-sm text-gray-600">{order.specialInstructions}</p>
              </div>
            )}

            {/* Payment Summary */}
            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Payment Method: <span className="font-semibold capitalize">{order.paymentMethod}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-semibold capitalize">{order.paymentStatus}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 
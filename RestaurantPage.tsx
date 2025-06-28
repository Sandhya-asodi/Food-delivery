import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Truck, MapPin, Phone } from 'lucide-react';
import MenuItem from '../components/MenuItem';
import { Restaurant, MenuItem as MenuItemType } from '../types';
import { useCart } from '../context/CartContext';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setRestaurant, getTotalItems } = useCart();
  const [restaurant, setRestaurantData] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => res.json())
      .then((data: Restaurant) => {
        setRestaurantData(data);
        setRestaurant(data._id, data.name);
        setCategories(['all', ...Array.from(new Set(data.menu.map((item: MenuItemType) => item.category)))]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, setRestaurant]);

  const filteredMenu = restaurant?.menu.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Restaurant not found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                <span>({restaurant.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.estimatedDeliveryTime} min delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span>${restaurant.deliveryFee.toFixed(2)} delivery fee</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.address.street}, {restaurant.address.city}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{restaurant.phone}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            restaurant.isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </span>
          
          {getTotalItems() > 0 && (
            <button
              onClick={() => navigate('/cart')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Cart ({getTotalItems()} items)
            </button>
          )}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredMenu.length > 0 ? (
          filteredMenu.map(item => (
            <MenuItem key={item._id} item={item} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items in this category</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage; 
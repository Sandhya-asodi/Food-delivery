import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Truck, MapPin, ArrowRight, Filter } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../types';

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Food categories for the homepage
  const foodCategories = [
    { name: 'Pizza', icon: '🍕', color: 'bg-red-500' },
    { name: 'Burgers', icon: '🍔', color: 'bg-orange-500' },
    { name: 'Sushi', icon: '🍣', color: 'bg-green-500' },
    { name: 'Pasta', icon: '🍝', color: 'bg-yellow-500' },
    { name: 'Salads', icon: '🥗', color: 'bg-emerald-500' },
    { name: 'Desserts', icon: '🍰', color: 'bg-pink-500' },
    { name: 'Drinks', icon: '🥤', color: 'bg-blue-500' },
    { name: 'Asian', icon: '🥢', color: 'bg-purple-500' }
  ];

  // Featured dishes
  const featuredDishes = [
    {
      id: 1,
      name: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      price: 18.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
      deliveryTime: '25-35 min'
    },
    {
      id: 2,
      name: 'Classic Burger',
      restaurant: 'Burger House',
      price: 12.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      deliveryTime: '20-30 min'
    },
    {
      id: 3,
      name: 'California Roll',
      restaurant: 'Sushi Master',
      price: 15.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      deliveryTime: '30-40 min'
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      restaurant: 'Italian Delight',
      price: 16.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      deliveryTime: '25-35 min'
    }
  ];

  // Fetch cuisines and categories for filters
  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants/cuisines/list')
      .then(res => res.json())
      .then(data => setCuisines(data))
      .catch(() => setCuisines([]));
    
    fetch('http://localhost:5000/api/restaurants/categories/list')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  // Fetch restaurants from API
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCuisine) params.append('cuisine', selectedCuisine);
    if (selectedCategory) params.append('category', selectedCategory);
    if (sortBy) params.append('sort', sortBy);
    
    fetch(`http://localhost:5000/api/restaurants?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm, selectedCuisine, selectedCategory, sortBy]);

  const filteredRestaurants = restaurants;
  const sortedRestaurants = filteredRestaurants;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delicious Food
            <br />
            <span className="text-yellow-300">Delivered Fast</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order from your favorite restaurants and get food delivered in minutes
          </p>
          
          {/* Hero Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-20">🍕</div>
        <div className="absolute bottom-4 right-8 text-4xl opacity-20">🍔</div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-20">🍣</div>
      </div>

      {/* Food Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What are you craving?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {foodCategories.map((category) => (
            <button
              key={category.name}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl mb-2`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Dishes */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Dishes</h2>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold">
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                  ${dish.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{dish.restaurant}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{dish.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{dish.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Cuisine Filter */}
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">All Cuisines</option>
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="deliveryTime">Sort by Delivery Time</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {sortedRestaurants.length} Restaurants Found
        </h2>
      </div>

      {/* Restaurant Grid */}
      {sortedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍕</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No restaurants found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default HomePage; 
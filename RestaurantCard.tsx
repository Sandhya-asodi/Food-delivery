import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Truck } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Restaurant Image */}
      <div className="relative h-48 bg-gray-200">
        {restaurant.image ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {restaurant.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.isOpen 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {restaurant.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-800">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-500 text-sm">
            ({restaurant.reviewCount} reviews)
          </span>
        </div>

        {/* Cuisine and Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            {restaurant.cuisine}
          </span>
          {restaurant.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.estimatedDeliveryTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="w-4 h-4" />
            <span>${restaurant.deliveryFee.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard; 
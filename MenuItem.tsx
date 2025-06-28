import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem, state } = useCart();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    addItem({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const cartItem = state.items.find(cartItem => cartItem.menuItemId === item._id);
  const currentQuantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {item.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {item.name}
            </h3>
            <span className="text-lg font-bold text-orange-600">
              ${item.price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
              {item.category}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              {currentQuantity > 0 ? (
                <>
                  <button
                    onClick={handleRemoveFromCart}
                    className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {currentQuantity}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!item.isAvailable}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    item.isAvailable
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {item.isAvailable ? 'Add to Cart' : 'Not Available'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem; 
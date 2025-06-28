export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  cuisine: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: number;
  isOpen: boolean;
  image: string;
  categories: string[];
  menu: MenuItem[];
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage' | 'side';
  image: string;
  isAvailable: boolean;
  preparationTime: number;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: User;
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed';
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  specialInstructions: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
} 
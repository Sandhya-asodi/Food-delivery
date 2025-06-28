const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizer', 'main', 'dessert', 'beverage', 'side']
  },
  image: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 20 // minutes
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  minimumOrder: {
    type: Number,
    default: 0,
    min: 0
  },
  estimatedDeliveryTime: {
    type: Number,
    default: 30, // minutes
    min: 0
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  image: {
    type: String,
    default: ''
  },
  menu: [menuItemSchema],
  categories: [{
    type: String,
    enum: ['pizza', 'burger', 'sushi', 'chinese', 'indian', 'italian', 'mexican', 'thai', 'american', 'mediterranean']
  }]
}, {
  timestamps: true
});

// Index for search functionality
restaurantSchema.index({ name: 'text', cuisine: 'text', description: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema); 
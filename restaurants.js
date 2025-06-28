const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, category, sort = 'rating' } = req.query;
    
    let query = { isOpen: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by cuisine
    if (cuisine) {
      query.cuisine = cuisine;
    }
    
    // Filter by category
    if (category) {
      query.categories = category;
    }
    
    let sortOption = {};
    switch (sort) {
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'deliveryTime':
        sortOption = { estimatedDeliveryTime: 1 };
        break;
      default:
        sortOption = { rating: -1 };
    }
    
    const restaurants = await Restaurant.find(query)
      .select('name description cuisine rating reviewCount deliveryFee minimumOrder estimatedDeliveryTime image categories')
      .sort(sortOption)
      .limit(20);
    
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
});

// Get restaurant menu
router.get('/:id/menu', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .select('menu name');
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json({
      restaurantName: restaurant.name,
      menu: restaurant.menu.filter(item => item.isAvailable)
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Error fetching menu' });
  }
});

// Get available cuisines
router.get('/cuisines/list', async (req, res) => {
  try {
    const cuisines = await Restaurant.distinct('cuisine');
    res.json(cuisines);
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    res.status(500).json({ message: 'Error fetching cuisines' });
  }
});

// Get available categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Restaurant.distinct('categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

module.exports = router; 
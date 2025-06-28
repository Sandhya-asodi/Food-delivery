const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      user,
      restaurantId,
      items,
      paymentMethod,
      specialInstructions
    } = req.body;

    // Validate restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = restaurant.menu.id(item.menuItemId);
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(400).json({ message: `Item ${item.name} is not available` });
      }

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        menuItem: item.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || ''
      });
    }

    // Check minimum order
    if (subtotal < restaurant.minimumOrder) {
      return res.status(400).json({ 
        message: `Minimum order amount is $${restaurant.minimumOrder}` 
      });
    }

    const deliveryFee = restaurant.deliveryFee;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;

    // Calculate estimated delivery time
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + restaurant.estimatedDeliveryTime);

    const order = new Order({
      user,
      restaurant: restaurantId,
      items: orderItems,
      subtotal,
      deliveryFee,
      tax,
      total,
      paymentMethod,
      specialInstructions,
      estimatedDeliveryTime
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        total: order.total,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        status: order.status
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name address phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    
    // Set actual delivery time when delivered
    if (status === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        actualDeliveryTime: order.actualDeliveryTime
      }
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'user.email': req.params.email })
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Error fetching user orders' });
  }
});

module.exports = router; 
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

const sampleRestaurants = [
  {
    name: 'Pizza Palace',
    description: 'Authentic Italian pizza with fresh ingredients and traditional recipes. We use only the finest ingredients imported directly from Italy.',
    cuisine: 'Italian',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    phone: '(555) 123-4567',
    email: 'info@pizzapalace.com',
    rating: 4.5,
    reviewCount: 128,
    deliveryFee: 2.99,
    minimumOrder: 15,
    estimatedDeliveryTime: 25,
    isOpen: true,
    image: '',
    categories: ['pizza', 'italian'],
    menu: [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 16.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 20
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with melted cheese and tomato sauce',
        price: 18.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 20
      },
      {
        name: 'Garlic Bread',
        description: 'Fresh baked bread with garlic butter and herbs',
        price: 4.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 10
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing and croutons',
        price: 8.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 15
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 6.99,
        category: 'dessert',
        image: '',
        isAvailable: true,
        preparationTime: 5
      },
      {
        name: 'Italian Soda',
        description: 'Refreshing soda with Italian syrups',
        price: 3.99,
        category: 'beverage',
        image: '',
        isAvailable: true,
        preparationTime: 2
      }
    ]
  },
  {
    name: 'Burger House',
    description: 'Juicy burgers made with premium beef and fresh vegetables. Our burgers are grilled to perfection and served with crispy fries.',
    cuisine: 'American',
    address: {
      street: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    phone: '(555) 987-6543',
    email: 'info@burgerhouse.com',
    rating: 4.2,
    reviewCount: 89,
    deliveryFee: 1.99,
    minimumOrder: 12,
    estimatedDeliveryTime: 20,
    isOpen: true,
    image: '',
    categories: ['burger', 'american'],
    menu: [
      {
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        price: 12.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 15
      },
      {
        name: 'Bacon Deluxe Burger',
        description: 'Beef patty with bacon, cheese, and all the fixings',
        price: 15.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 15
      },
      {
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 3.99,
        category: 'side',
        image: '',
        isAvailable: true,
        preparationTime: 8
      },
      {
        name: 'Onion Rings',
        description: 'Beer-battered onion rings with ranch dipping sauce',
        price: 4.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 10
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Rich and creamy chocolate milkshake',
        price: 4.99,
        category: 'beverage',
        image: '',
        isAvailable: true,
        preparationTime: 5
      }
    ]
  },
  {
    name: 'Sushi Master',
    description: 'Fresh sushi and sashimi prepared by expert chefs. We use the highest quality fish and traditional Japanese techniques.',
    cuisine: 'Japanese',
    address: {
      street: '789 Pine St',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      coordinates: { lat: 40.7328, lng: -73.9864 }
    },
    phone: '(555) 456-7890',
    email: 'info@sushimaster.com',
    rating: 4.8,
    reviewCount: 156,
    deliveryFee: 3.99,
    minimumOrder: 20,
    estimatedDeliveryTime: 30,
    isOpen: true,
    image: '',
    categories: ['sushi', 'japanese'],
    menu: [
      {
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber roll',
        price: 8.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 12
      },
      {
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over seasoned rice',
        price: 6.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 10
      },
      {
        name: 'Spicy Tuna Roll',
        description: 'Spicy tuna with cucumber and scallions',
        price: 9.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 12
      },
      {
        name: 'Miso Soup',
        description: 'Traditional Japanese miso soup with tofu and seaweed',
        price: 3.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 8
      },
      {
        name: 'Edamame',
        description: 'Steamed soybeans with sea salt',
        price: 4.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 5
      },
      {
        name: 'Green Tea',
        description: 'Hot Japanese green tea',
        price: 2.99,
        category: 'beverage',
        image: '',
        isAvailable: true,
        preparationTime: 3
      }
    ]
  },
  {
    name: 'Taco Fiesta',
    description: 'Authentic Mexican tacos and burritos with fresh ingredients and bold flavors. Made with love and traditional recipes.',
    cuisine: 'Mexican',
    address: {
      street: '321 Elm St',
      city: 'New York',
      state: 'NY',
      zipCode: '10004',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    phone: '(555) 321-6540',
    email: 'info@tacofiesta.com',
    rating: 4.3,
    reviewCount: 67,
    deliveryFee: 2.49,
    minimumOrder: 10,
    estimatedDeliveryTime: 22,
    isOpen: true,
    image: '',
    categories: ['mexican', 'tacos'],
    menu: [
      {
        name: 'Street Tacos',
        description: 'Three authentic street tacos with your choice of meat',
        price: 11.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 12
      },
      {
        name: 'Chicken Burrito',
        description: 'Large burrito with grilled chicken, rice, beans, and salsa',
        price: 13.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 15
      },
      {
        name: 'Guacamole & Chips',
        description: 'Fresh guacamole with crispy tortilla chips',
        price: 5.99,
        category: 'appetizer',
        image: '',
        isAvailable: true,
        preparationTime: 8
      },
      {
        name: 'Quesadilla',
        description: 'Cheese quesadilla with pico de gallo and sour cream',
        price: 8.99,
        category: 'main',
        image: '',
        isAvailable: true,
        preparationTime: 10
      },
      {
        name: 'Horchata',
        description: 'Traditional Mexican rice drink with cinnamon',
        price: 3.99,
        category: 'beverage',
        image: '',
        isAvailable: true,
        preparationTime: 2
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    // Insert sample data
    const restaurants = await Restaurant.insertMany(sampleRestaurants);
    console.log(`Inserted ${restaurants.length} restaurants`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 
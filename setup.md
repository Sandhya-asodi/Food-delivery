# 🚀 Food Delivery App Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **Git**

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm run install-all
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get your connection string
- Replace the MONGODB_URI in your .env file

### 4. Seed the Database

```bash
npm run seed
```

This will populate the database with sample restaurants and menu items.

### 5. Start the Application

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Features Available

✅ **Restaurant Browsing**
- View all restaurants
- Search and filter by cuisine/category
- Sort by rating, delivery time, or name

✅ **Menu Management**
- Browse restaurant menus
- Add items to cart
- Quantity controls

✅ **Shopping Cart**
- Add/remove items
- Update quantities
- View order summary

✅ **Order Management**
- Place orders
- Track order status
- View order history

✅ **Responsive Design**
- Mobile-friendly interface
- Modern UI with Tailwind CSS

## Project Structure

```
food-delivery-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/           # Backend utilities
└── public/              # Static assets
```

## API Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in .env
   - Verify network connectivity

2. **Port Already in Use**
   - Change the PORT in .env file
   - Kill processes using the ports

3. **Dependencies Issues**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

### Development Tips

- Use `npm run server` to start only the backend
- Use `npm run client` to start only the frontend
- Check the browser console for frontend errors
- Check the terminal for backend errors

## Next Steps

This is a fully functional food delivery app! You can extend it by adding:

- User authentication and profiles
- Payment processing
- Real-time order tracking
- Restaurant admin panel
- Driver management
- Reviews and ratings
- Push notifications

## Support

If you encounter any issues, check the console logs and ensure all dependencies are properly installed. 
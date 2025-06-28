# 🍕 Food Delivery App

A modern food delivery application built with React, Node.js, and MongoDB.

## Features

- 🏪 Restaurant browsing and search
- 🍽️ Menu viewing with categories
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🔍 Real-time search
- 📍 Location-based delivery
- 💳 Order tracking
- ⭐ Restaurant ratings and reviews

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: React Context API

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 
# E-Commerce Portal - Development Guide

## Project Overview
This is a complete e-commerce application with a Node.js backend API and modern Angular 20 frontend.

### Backend API (Completed ✅)
- **Location**: `C:\Users\kaushal.singh\Desktop\backend_project\`
- **Framework**: Node.js with Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT with role-based access control
- **Documentation**: Swagger UI available at `http://localhost:3000/api-docs`
- **Status**: Fully functional with dummy data

### Frontend (Architecture Complete ✅)
- **Location**: `C:\Users\kaushal.singh\Desktop\backend_project\frontend\`
- **Framework**: Angular 20 with standalone components
- **UI Library**: Angular Material
- **State Management**: NgRx (configured)
- **Styling**: SCSS with Material Design

## Quick Start

### 1. Start Backend Server
```powershell
cd C:\Users\kaushal.singh\Desktop\backend_project
npm start
```
Backend will run on `http://localhost:3000`

### 2. Install Frontend Dependencies & Start
```powershell
cd C:\Users\kaushal.singh\Desktop\backend_project\frontend
npm install
npm start
```
Frontend will run on `http://localhost:4200`

## Backend API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Admin Reports
- `GET /api/admin/reports/overview` - Dashboard overview
- `GET /api/admin/reports/sales` - Sales reports
- `GET /api/admin/orders` - All orders management
- `GET /api/admin/users` - User management

## Test Accounts

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`
- Role: ADMIN

### Customer Accounts
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`
- Email: `bob@example.com` | Password: `password123`

## Frontend Architecture

### Core Services
- **AuthService**: JWT authentication with role management
- **ProductService**: Product CRUD operations
- **CartService**: Shopping cart management
- **OrderService**: Order processing
- **LoadingService**: Global loading state

### HTTP Interceptors
- **AuthInterceptor**: Adds JWT tokens to requests
- **ErrorInterceptor**: Global error handling
- **LoadingInterceptor**: Shows/hides loading spinner

### Route Guards
- **AuthGuard**: Protects authenticated routes
- **RoleGuard**: Role-based route protection

### State Management (NgRx)
- Auth state (login status, user info)
- Cart state (items, totals)
- Product state (catalog, filters)
- Loading states

## Next Development Steps

### 1. Complete Component Implementation
Create the remaining feature components:
- Login/Register forms
- Product catalog and details
- Shopping cart interface
- Checkout process
- Admin dashboard
- Order history

### 2. Implement NgRx Store
Set up actions, reducers, effects, and selectors for:
- Authentication state
- Product catalog state
- Shopping cart state
- Order management

### 3. Add Advanced Features
- Product search and filtering
- Image upload for products
- Real payment integration
- Email notifications
- Product reviews and ratings

## Development Commands

### Backend
```powershell
npm start          # Start server
npm run dev        # Start with nodemon (development)
npm run seed       # Seed database with dummy data
```

### Frontend
```powershell
npm start          # Start dev server (ng serve)
npm run build      # Build for production
npm run test       # Run unit tests
npm run lint       # Run ESLint
```

## Project Structure

### Backend
```
backend_project/
├── src/
│   ├── config/         # Database & app configuration
│   ├── controllers/    # API route handlers
│   ├── middleware/     # Authentication & validation
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Helper functions
├── scripts/           # Database seed scripts
└── swagger.js         # API documentation
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/    # Feature components
│   │   ├── guards/        # Route guards
│   │   ├── interceptors/  # HTTP interceptors
│   │   ├── models/        # TypeScript interfaces
│   │   ├── services/      # Angular services
│   │   └── store/         # NgRx state management
│   ├── environments/      # Environment configs
│   └── styles.scss        # Global styles
└── angular.json          # Angular CLI configuration
```

## API Documentation
Visit `http://localhost:3000/api-docs` when the backend server is running to explore the complete API documentation with Swagger UI.

## Troubleshooting

### Common Issues
1. **CORS Errors**: Make sure backend is running on port 3000
2. **Auth Errors**: Check if JWT token is properly stored and sent
3. **Database Issues**: Run `npm run seed` to reset and seed database

### Development Tips
1. Use Angular DevTools browser extension for debugging
2. Check browser console for errors
3. Monitor Network tab for API call issues
4. Use Redux DevTools for NgRx state debugging
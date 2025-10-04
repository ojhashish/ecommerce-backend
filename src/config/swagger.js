const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-Commerce Management Portal API',
    version: '1.0.0',
    description: 'A comprehensive REST API for E-Commerce Management Portal with JWT authentication, role-based access control, and real-time inventory management.',
    contact: {
      name: 'API Support',
      email: 'support@ecommerce.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          user_id: { type: 'integer', example: 1 },
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', example: 'john@example.com' },
          phone: { type: 'string', example: '+1234567890' },
          role: { type: 'string', enum: ['CUSTOMER', 'ADMIN'], example: 'CUSTOMER' }
        }
      },
      Category: {
        type: 'object',
        properties: {
          category_id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Electronics' }
        }
      },
      Product: {
        type: 'object',
        properties: {
          product_id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'iPhone 15' },
          category_id: { type: 'integer', example: 1 },
          price: { type: 'number', format: 'decimal', example: 999.99 },
          stock: { type: 'integer', example: 50 },
          description: { type: 'string', example: 'Latest iPhone with advanced features' }
        }
      },
      CartItem: {
        type: 'object',
        properties: {
          cart_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 1 },
          product_id: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 2 }
        }
      },
      Order: {
        type: 'object',
        properties: {
          order_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 1 },
          order_date: { type: 'string', format: 'date-time', example: '2025-10-01T10:30:00Z' },
          status: { type: 'string', enum: ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'], example: 'PLACED' },
          total_amount: { type: 'number', format: 'decimal', example: 1999.98 }
        }
      },
      OrderItem: {
        type: 'object',
        properties: {
          order_item_id: { type: 'integer', example: 1 },
          order_id: { type: 'integer', example: 1 },
          product_id: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 2 },
          price: { type: 'number', format: 'decimal', example: 999.99 }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Error message' },
          error: { type: 'string', example: 'Detailed error information' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'admin@example.com' },
          password: { type: 'string', example: 'admin123' }
        }
      },
      RegisterRequest: {
        type: 'object',
        required: ['username', 'password', 'email'],
        properties: {
          username: { type: 'string', example: 'john_doe' },
          password: { type: 'string', example: 'password123' },
          email: { type: 'string', example: 'john@example.com' },
          phone: { type: 'string', example: '+1234567890' },
          role: { type: 'string', enum: ['CUSTOMER', 'ADMIN'], example: 'CUSTOMER' }
        }
      },
      TokenResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              role: { type: 'string', enum: ['CUSTOMER', 'ADMIN'], example: 'CUSTOMER' },
              email: { type: 'string', example: 'john@example.com' }
            }
          }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/controllers/*.js'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
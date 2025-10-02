const { User, Category, Product, sequelize } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seedDummyData() {
  try {
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    
    console.log('🌱 Starting comprehensive database seeding...');

    // ===========================================
    // 1. CREATE USERS (Admins & Customers)
    // ===========================================
    
    const users = [
      // Admin Users
      {
        username: 'admin',
        password: 'admin123',
        email: 'admin@ecommerce.com',
        phone: '+1234567890',
        role: 'ADMIN'
      },
      {
        username: 'kaushal',
        password: 'kaushal123',
        email: 'kaushal@ecommerce.com',
        phone: '+1987654321',
        role: 'ADMIN'
      },
      {
        username: 'manager',
        password: 'manager123',
        email: 'manager@ecommerce.com',
        phone: '+1122334455',
        role: 'ADMIN'
      },
      
      // Customer Users
      {
        username: 'john_doe',
        password: 'john123',
        email: 'john.doe@gmail.com',
        phone: '+1555123456',
        role: 'CUSTOMER'
      },
      {
        username: 'jane_smith',
        password: 'jane123',
        email: 'jane.smith@yahoo.com',
        phone: '+1555987654',
        role: 'CUSTOMER'
      },
      {
        username: 'mike_wilson',
        password: 'mike123',
        email: 'mike.wilson@outlook.com',
        phone: '+1555555555',
        role: 'CUSTOMER'
      },
      {
        username: 'sarah_johnson',
        password: 'sarah123',
        email: 'sarah.johnson@gmail.com',
        phone: '+1555666777',
        role: 'CUSTOMER'
      },
      {
        username: 'david_brown',
        password: 'david123',
        email: 'david.brown@hotmail.com',
        phone: '+1555888999',
        role: 'CUSTOMER'
      }
    ];

    console.log('👥 Creating users...');
    for (const userData of users) {
      const existingUser = await User.findOne({ where: { username: userData.username } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
          ...userData,
          password: hashedPassword
        });
        console.log(`✅ User '${userData.username}' (${userData.role}) created`);
      } else {
        console.log(`ℹ️  User '${userData.username}' already exists`);
      }
    }

    // ===========================================
    // 2. CREATE CATEGORIES
    // ===========================================
    
    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Garden' },
      { name: 'Sports & Outdoors' },
      { name: 'Beauty & Personal Care' },
      { name: 'Toys & Games' },
      { name: 'Automotive' },
      { name: 'Health & Wellness' },
      { name: 'Jewelry & Accessories' }
    ];

    console.log('📂 Creating categories...');
    const createdCategories = {};
    for (const categoryData of categories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData
      });
      createdCategories[categoryData.name] = category;
      if (created) {
        console.log(`✅ Category '${categoryData.name}' created`);
      } else {
        console.log(`ℹ️  Category '${categoryData.name}' already exists`);
      }
    }

    // ===========================================
    // 3. CREATE PRODUCTS
    // ===========================================
    
    const products = [
      // Electronics
      {
        name: 'iPhone 15 Pro',
        category: 'Electronics',
        price: 999.99,
        stock: 50,
        description: 'Latest iPhone with A17 Pro chip and titanium design'
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Electronics',
        price: 1199.99,
        stock: 30,
        description: 'Premium Android smartphone with S Pen and AI features'
      },
      {
        name: 'MacBook Air M3',
        category: 'Electronics',
        price: 1099.99,
        stock: 25,
        description: '13-inch laptop with M3 chip and all-day battery life'
      },
      {
        name: 'Sony WH-1000XM5',
        category: 'Electronics',
        price: 399.99,
        stock: 75,
        description: 'Industry-leading noise canceling wireless headphones'
      },
      {
        name: 'iPad Pro 12.9"',
        category: 'Electronics',
        price: 1099.99,
        stock: 40,
        description: 'Most advanced iPad with M2 chip and Liquid Retina XDR display'
      },

      // Clothing
      {
        name: 'Nike Air Max 270',
        category: 'Clothing',
        price: 150.00,
        stock: 100,
        description: 'Comfortable running shoes with Max Air cushioning'
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        category: 'Clothing',
        price: 89.99,
        stock: 80,
        description: 'Classic straight-fit jeans in authentic indigo denim'
      },
      {
        name: 'Adidas Ultraboost 22',
        category: 'Clothing',
        price: 180.00,
        stock: 60,
        description: 'Premium running shoes with Boost cushioning technology'
      },
      {
        name: 'Champion Reverse Weave Hoodie',
        category: 'Clothing',
        price: 65.00,
        stock: 120,
        description: 'Heavyweight cotton hoodie with iconic logo'
      },

      // Books
      {
        name: 'The JavaScript Bible',
        category: 'Books',
        price: 49.99,
        stock: 200,
        description: 'Complete guide to modern JavaScript programming'
      },
      {
        name: 'Clean Code',
        category: 'Books',
        price: 39.99,
        stock: 150,
        description: 'A handbook of agile software craftsmanship by Robert C. Martin'
      },
      {
        name: 'System Design Interview',
        category: 'Books',
        price: 44.99,
        stock: 100,
        description: 'An insider\'s guide to system design interviews'
      },

      // Home & Garden
      {
        name: 'Dyson V15 Detect',
        category: 'Home & Garden',
        price: 749.99,
        stock: 35,
        description: 'Cordless vacuum with laser dust detection'
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        category: 'Home & Garden',
        price: 99.99,
        stock: 85,
        description: 'Multi-use pressure cooker with 7 functions'
      },
      {
        name: 'Philips Hue Smart Bulbs (4-pack)',
        category: 'Home & Garden',
        price: 199.99,
        stock: 90,
        description: 'Color-changing smart LED bulbs with app control'
      },

      // Sports & Outdoors
      {
        name: 'Yeti Rambler 30oz Tumbler',
        category: 'Sports & Outdoors',
        price: 39.99,
        stock: 150,
        description: 'Insulated stainless steel tumbler with handle'
      },
      {
        name: 'Coleman 4-Person Tent',
        category: 'Sports & Outdoors',
        price: 129.99,
        stock: 45,
        description: 'Waterproof camping tent with easy setup'
      },
      {
        name: 'Wilson Pro Staff Tennis Racket',
        category: 'Sports & Outdoors',
        price: 179.99,
        stock: 30,
        description: 'Professional-grade tennis racket for advanced players'
      },

      // Beauty & Personal Care
      {
        name: 'Olaplex Hair Perfector No. 3',
        category: 'Beauty & Personal Care',
        price: 28.00,
        stock: 200,
        description: 'At-home hair treatment for stronger, healthier hair'
      },
      {
        name: 'CeraVe Daily Moisturizing Lotion',
        category: 'Beauty & Personal Care',
        price: 16.99,
        stock: 180,
        description: 'Hydrating body lotion with hyaluronic acid'
      },

      // Toys & Games
      {
        name: 'LEGO Creator 3-in-1 Deep Sea Creatures',
        category: 'Toys & Games',
        price: 79.99,
        stock: 70,
        description: 'Build and rebuild into 3 different sea creatures'
      },
      {
        name: 'Nintendo Switch OLED Console',
        category: 'Toys & Games',
        price: 349.99,
        stock: 55,
        description: 'Gaming console with vibrant OLED screen'
      },

      // Automotive
      {
        name: 'Michelin All-Season Tires (Set of 4)',
        category: 'Automotive',
        price: 599.99,
        stock: 25,
        description: 'Premium all-season tires with excellent grip'
      },
      {
        name: 'Garmin DriveSmart 65 GPS',
        category: 'Automotive',
        price: 199.99,
        stock: 40,
        description: '6.95" GPS navigator with voice-activated navigation'
      },

      // Health & Wellness
      {
        name: 'Fitbit Charge 5',
        category: 'Health & Wellness',
        price: 179.99,
        stock: 85,
        description: 'Advanced fitness tracker with built-in GPS'
      },
      {
        name: 'Theragun Mini Massage Gun',
        category: 'Health & Wellness',
        price: 179.00,
        stock: 60,
        description: 'Portable percussive therapy device for muscle recovery'
      },

      // Jewelry & Accessories
      {
        name: 'Apple Watch Series 9',
        category: 'Jewelry & Accessories',
        price: 399.00,
        stock: 65,
        description: 'Smartwatch with advanced health monitoring'
      },
      {
        name: 'Ray-Ban Aviator Sunglasses',
        category: 'Jewelry & Accessories',
        price: 154.00,
        stock: 95,
        description: 'Classic pilot sunglasses with UV protection'
      }
    ];

    console.log('📦 Creating products...');
    for (const productData of products) {
      const [product, created] = await Product.findOrCreate({
        where: { name: productData.name },
        defaults: {
          name: productData.name,
          category_id: createdCategories[productData.category].category_id,
          price: productData.price,
          stock: productData.stock,
          description: productData.description
        }
      });
      if (created) {
        console.log(`✅ Product '${productData.name}' created`);
      } else {
        console.log(`ℹ️  Product '${productData.name}' already exists`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('==========================================');
    console.log('📊 SUMMARY:');
    console.log(`👥 Users: ${users.length} (${users.filter(u => u.role === 'ADMIN').length} Admins, ${users.filter(u => u.role === 'CUSTOMER').length} Customers)`);
    console.log(`📂 Categories: ${categories.length}`);
    console.log(`📦 Products: ${products.length}`);
    console.log('==========================================');
    
    console.log('🔐 ADMIN LOGIN CREDENTIALS:');
    users.filter(u => u.role === 'ADMIN').forEach(admin => {
      console.log(`   Username: ${admin.username} | Password: ${admin.password}`);
    });
    
    console.log('\n👤 CUSTOMER LOGIN CREDENTIALS:');
    users.filter(u => u.role === 'CUSTOMER').forEach(customer => {
      console.log(`   Username: ${customer.username} | Password: ${customer.password}`);
    });
    console.log('==========================================');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await sequelize.close();
  }
}

// Run the script
seedDummyData();
const { User, Category, Product, sequelize } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seedDummyData() {
  try {
  // Sync database (create tables if they don't exist). Use alter to add new columns like imageUrl.
  await sequelize.sync({ alter: true });
    
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
        description: 'Latest iPhone with A17 Pro chip and titanium design',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Electronics',
        price: 1199.99,
        stock: 30,
        description: 'Premium Android smartphone with S Pen and AI features',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
      },
      {
        name: 'MacBook Air M3',
        category: 'Electronics',
        price: 1099.99,
        stock: 25,
        description: '13-inch laptop with M3 chip and all-day battery life',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'
      },
      {
        name: 'Sony WH-1000XM5',
        category: 'Electronics',
        price: 399.99,
        stock: 75,
        description: 'Industry-leading noise canceling wireless headphones',
        imageUrl: 'https://images.unsplash.com/photo-1518444021030-8a3c792ca77f?w=800&q=80'
      },
      {
        name: 'iPad Pro 12.9"',
        category: 'Electronics',
        price: 1099.99,
        stock: 40,
        description: 'Most advanced iPad with M2 chip and Liquid Retina XDR display',
        imageUrl: 'https://images.unsplash.com/photo-1587825140708-39b1e8a67a0c?w=800&q=80'
      },

      // Clothing
      {
        name: 'Nike Air Max 270',
        category: 'Clothing',
        price: 150.00,
        stock: 100,
        description: 'Comfortable running shoes with Max Air cushioning',
        imageUrl: 'https://images.unsplash.com/photo-1528701800489-4760a0c4a7d4?w=800&q=80'
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        category: 'Clothing',
        price: 89.99,
        stock: 80,
        description: 'Classic straight-fit jeans in authentic indigo denim',
        imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80'
      },
      {
        name: 'Adidas Ultraboost 22',
        category: 'Clothing',
        price: 180.00,
        stock: 60,
        description: 'Premium running shoes with Boost cushioning technology',
        imageUrl: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80'
      },
      {
        name: 'Champion Reverse Weave Hoodie',
        category: 'Clothing',
        price: 65.00,
        stock: 120,
        description: 'Heavyweight cotton hoodie with iconic logo',
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80'
      },

      // Books
      {
        name: 'The JavaScript Bible',
        category: 'Books',
        price: 49.99,
        stock: 200,
        description: 'Complete guide to modern JavaScript programming',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'
      },
      {
        name: 'Clean Code',
        category: 'Books',
        price: 39.99,
        stock: 150,
        description: 'A handbook of agile software craftsmanship by Robert C. Martin',
        imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80'
      },
      {
        name: 'System Design Interview',
        category: 'Books',
        price: 44.99,
        stock: 100,
        description: 'An insider\'s guide to system design interviews',
        imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80'
      },

      // Home & Garden
      {
        name: 'Dyson V15 Detect',
        category: 'Home & Garden',
        price: 749.99,
        stock: 35,
        description: 'Cordless vacuum with laser dust detection',
        imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155227c2f1?w=800&q=80'
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        category: 'Home & Garden',
        price: 99.99,
        stock: 85,
        description: 'Multi-use pressure cooker with 7 functions',
        imageUrl: 'https://images.unsplash.com/photo-1604908176762-0c7f60b7e33f?w=800&q=80'
      },
      {
        name: 'Philips Hue Smart Bulbs (4-pack)',
        category: 'Home & Garden',
        price: 199.99,
        stock: 90,
        description: 'Color-changing smart LED bulbs with app control',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-1f5b1e4c8e6e?w=800&q=80'
      },

      // Sports & Outdoors
      {
        name: 'Yeti Rambler 30oz Tumbler',
        category: 'Sports & Outdoors',
        price: 39.99,
        stock: 150,
        description: 'Insulated stainless steel tumbler with handle',
        imageUrl: 'https://images.unsplash.com/photo-1562003387-cf4b4dbb2da1?w=800&q=80'
      },
      {
        name: 'Coleman 4-Person Tent',
        category: 'Sports & Outdoors',
        price: 129.99,
        stock: 45,
        description: 'Waterproof camping tent with easy setup',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
      },
      {
        name: 'Wilson Pro Staff Tennis Racket',
        category: 'Sports & Outdoors',
        price: 179.99,
        stock: 30,
        description: 'Professional-grade tennis racket for advanced players',
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80'
      },

      // Beauty & Personal Care
      {
        name: 'Olaplex Hair Perfector No. 3',
        category: 'Beauty & Personal Care',
        price: 28.00,
        stock: 200,
        description: 'At-home hair treatment for stronger, healthier hair',
        imageUrl: 'https://images.unsplash.com/photo-1583276817749-4a6f5f3a1b2b?w=800&q=80'
      },
      {
        name: 'CeraVe Daily Moisturizing Lotion',
        category: 'Beauty & Personal Care',
        price: 16.99,
        stock: 180,
        description: 'Hydrating body lotion with hyaluronic acid',
        imageUrl: 'https://images.unsplash.com/photo-1580281657521-6c1a3e34f6a3?w=800&q=80'
      },

      // Toys & Games
      {
        name: 'LEGO Creator 3-in-1 Deep Sea Creatures',
        category: 'Toys & Games',
        price: 79.99,
        stock: 70,
        description: 'Build and rebuild into 3 different sea creatures',
        imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80'
      },
      {
        name: 'Nintendo Switch OLED Console',
        category: 'Toys & Games',
        price: 349.99,
        stock: 55,
        description: 'Gaming console with vibrant OLED screen',
        imageUrl: 'https://images.unsplash.com/photo-1606813902828-6d5536a0a8d6?w=800&q=80'
      },

      // Automotive
      {
        name: 'Michelin All-Season Tires (Set of 4)',
        category: 'Automotive',
        price: 599.99,
        stock: 25,
        description: 'Premium all-season tires with excellent grip',
        imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80'
      },
      {
        name: 'Garmin DriveSmart 65 GPS',
        category: 'Automotive',
        price: 199.99,
        stock: 40,
        description: '6.95" GPS navigator with voice-activated navigation',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'
      },

      // Health & Wellness
      {
        name: 'Fitbit Charge 5',
        category: 'Health & Wellness',
        price: 179.99,
        stock: 85,
        description: 'Advanced fitness tracker with built-in GPS',
        imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&q=80'
      },
      {
        name: 'Theragun Mini Massage Gun',
        category: 'Health & Wellness',
        price: 179.00,
        stock: 60,
        description: 'Portable percussive therapy device for muscle recovery',
        imageUrl: 'https://images.unsplash.com/photo-1599058917215-0a2b7d2b5f33?w=800&q=80'
      },

      // Jewelry & Accessories
      {
        name: 'Apple Watch Series 9',
        category: 'Jewelry & Accessories',
        price: 399.00,
        stock: 65,
        description: 'Smartwatch with advanced health monitoring',
        imageUrl: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80'
      },
      {
        name: 'Ray-Ban Aviator Sunglasses',
        category: 'Jewelry & Accessories',
        price: 154.00,
        stock: 95,
        description: 'Classic pilot sunglasses with UV protection',
        imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80'
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
          description: productData.description,
          imageUrl: productData.imageUrl || ''
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
const { User, Category, Product, sequelize } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seedDatabase() {
  try {
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    
    console.log('🌱 Starting database seeding...');
    
    // 1. Create Admin User
    let adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@ecommerce.com',
        phone: '+1234567890',
        role: 'ADMIN'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    // 2. Create Sample Customer
    let customer = await User.findOne({ where: { username: 'customer1' } });
    if (!customer) {
      const hashedPassword = await bcrypt.hash('customer123', 10);
      customer = await User.create({
        username: 'customer1',
        password: hashedPassword,
        email: 'customer1@example.com',
        phone: '+1987654321',
        role: 'CUSTOMER'
      });
      console.log('✅ Sample customer created');
    } else {
      console.log('✅ Sample customer already exists');
    }
    
    // 3. Create Categories
    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Garden' }
    ];
    
    for (const categoryData of categories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData
      });
      if (created) {
        console.log(`✅ Category '${categoryData.name}' created`);
      }
    }
    
    // 4. Create Sample Products
    const electronicsCategory = await Category.findOne({ where: { name: 'Electronics' } });
    const clothingCategory = await Category.findOne({ where: { name: 'Clothing' } });
    const booksCategory = await Category.findOne({ where: { name: 'Books' } });
    
    const products = [
      {
        name: 'iPhone 15',
        category_id: electronicsCategory.category_id,
        price: 999.00,
        stock: 50,
        description: 'Latest iPhone with advanced features'
      },
      {
        name: 'Samsung Galaxy S24',
        category_id: electronicsCategory.category_id,
        price: 899.00,
        stock: 30,
        description: 'Premium Android smartphone'
      },
      {
        name: 'Nike Air Max',
        category_id: clothingCategory.category_id,
        price: 159.99,
        stock: 100,
        description: 'Comfortable running shoes'
      },
      {
        name: 'JavaScript: The Good Parts',
        category_id: booksCategory.category_id,
        price: 29.99,
        stock: 200,
        description: 'Essential JavaScript programming book'
      }
    ];
    
    for (const productData of products) {
      const [product, created] = await Product.findOrCreate({
        where: { name: productData.name },
        defaults: productData
      });
      if (created) {
        console.log(`✅ Product '${productData.name}' created`);
      }
    }
    
    console.log('\n🎉 Database seeding completed!');
    console.log('==========================================');
    console.log('ADMIN LOGIN:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@ecommerce.com');
    console.log('Role: ADMIN');
    console.log('==========================================');
    console.log('CUSTOMER LOGIN:');
    console.log('Username: customer1');
    console.log('Password: customer123');
    console.log('Email: customer1@example.com');
    console.log('Role: CUSTOMER');
    console.log('==========================================');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await sequelize.close();
  }
}

// Run the script
seedDatabase();
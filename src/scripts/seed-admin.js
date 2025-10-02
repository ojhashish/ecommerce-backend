const { User, sequelize } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username: admin');
      console.log('Role: ADMIN');
      return;
    }
    
    // Create admin user
    const adminPassword = 'admin123'; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const adminUser = await User.create({
      username: 'Kaushal',
      password: hashedPassword,
      email: 'Kaushal@ecommerce.com',
      phone: '+1234567890',
      role: 'ADMIN'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('==========================================');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@ecommerce.com');
    console.log('Role: ADMIN');
    console.log('==========================================');
    console.log('⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await sequelize.close();
  }
}

// Run the script
createAdminUser();
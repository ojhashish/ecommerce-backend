const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone, role } = req.body;
    if (!username || !password || !email) return res.status(400).json({ message: 'Missing fields' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hash,
      email,
      phone,
      role: role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER',
    });
    res.status(201).json({ message: 'User registered', user_id: user.user_id });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Login failed', error: err.message });
  }
};
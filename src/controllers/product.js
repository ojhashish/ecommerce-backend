const { Product, Category } = require('../models');
const { Op } = require('sequelize');

exports.listProducts = async (req, res) => {
  try {
    const { category, name, minPrice, maxPrice } = req.query;
    let where = {};
    if (category) where.category_id = category;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (minPrice || maxPrice) where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;

    const products = await Product.findAll({ where, include: Category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, category_id, price, stock, description } = req.body;
    if (!name || !category_id || !price || !stock) return res.status(400).json({ message: 'Missing fields' });
    const product = await Product.create({ name, category_id, price, stock, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
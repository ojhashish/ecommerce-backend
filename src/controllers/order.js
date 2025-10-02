const { sequelize, Cart, Product, Order, OrderItem } = require('../models');
const mockPaymentGateway = require('../util/payment');

exports.checkout = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const cartItems = await Cart.findAll({ where: { user_id }, include: Product });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);

    // Simulate payment
    const payment = await mockPaymentGateway(total);
    if (!payment.success) return res.status(402).json({ message: 'Payment failed' });

  // Transaction: lock product rows, update stock, create order & items
  try {
    await sequelize.transaction(async (t) => {
      // Lock products
      for (const item of cartItems) {
        const product = await Product.findByPk(item.product_id, { transaction: t, lock: t.LOCK.UPDATE });
        if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
        product.stock -= item.quantity;
        await product.save({ transaction: t });
      }

      // Create order
      const order = await Order.create({
        user_id,
        total_amount: total,
        status: 'PLACED',
      }, { transaction: t });

      // Create order items
      for (const item of cartItems) {
        await OrderItem.create({
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.Product.price,
        }, { transaction: t });
      }

      // Clear cart
      await Cart.destroy({ where: { user_id }, transaction: t });
    });

    res.json({ message: 'Order placed successfully', transactionId: payment.transactionId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  } catch (err) {
    res.status(500).json({ message: 'Error processing checkout', error: err.message });
  }
};

exports.orderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.user.user_id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order history', error: err.message });
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: OrderItem });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user_id !== req.user.user_id && req.user.role !== 'ADMIN')
      return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order details', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
};
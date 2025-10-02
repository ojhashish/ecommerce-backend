const { OrderItem, Product, Order } = require('../models');
const { sequelize } = require('../models');

exports.salesReport = async (req, res) => {
  try {
    // Total sales
    const totalSales = await Order.sum('total_amount', { where: { status: 'PLACED' } });

    // Best-selling products
    const bestSellers = await OrderItem.findAll({
      attributes: [
        'product_id',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold']
      ],
      group: ['product_id'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit: 5,
      include: Product,
    });

    res.json({ totalSales, bestSellers });
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};
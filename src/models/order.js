module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM('PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'), defaultValue: 'PLACED' },
    total_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  }, { tableName: 'orders', timestamps: false });
};
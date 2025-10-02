module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  }, { tableName: 'categories', timestamps: false });
};
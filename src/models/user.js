module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('CUSTOMER', 'ADMIN'), defaultValue: 'CUSTOMER' },
  }, { tableName: 'users', timestamps: false });
};
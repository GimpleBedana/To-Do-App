const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#007bff',
    validate: {
      is: /^#[0-9A-F]{6}$/i
    }
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Category;

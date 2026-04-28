const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Todo = sequelize.define('Todo', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [1, 255],
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'in_progress', 'completed']]
    }
  },
  priority: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high']]
    }
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'uuid'
    }
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'uuid'
    }
  }
}, {
  tableName: 'todos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['due_date']
    },
    {
      fields: ['user_id', 'status']
    }
  ]
});

module.exports = Todo;

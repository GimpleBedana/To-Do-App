const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password_hash')) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
      }
    }
  }
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;

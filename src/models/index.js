const sequelize = require('../config/database.config');
const User = require('./User');
const Todo = require('./Todo');
const Category = require('./Category');

// Define associations
User.hasMany(Todo, { foreignKey: 'user_id', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Category, { foreignKey: 'user_id', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Category.hasMany(Todo, { foreignKey: 'category_id', as: 'todos' });
Todo.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Todo,
  Category
};

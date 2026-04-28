const sequelize = require('../config/database.config');
const User = require('./User');
const Todo = require('./Todo');
const Category = require('./Category');

// Define associations
User.hasMany(Todo, { foreignKey: 'user_id', sourceKey: 'uuid', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'user_id', targetKey: 'uuid', as: 'user' });

Category.hasMany(Todo, { foreignKey: 'category_id', sourceKey: 'uuid', as: 'todos' });
Todo.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'uuid', as: 'category' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Todo,
  Category
};

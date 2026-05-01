require('dotenv').config();
const { sequelize, Category } = require('../src/models');

const seedCategories = async () => {
  try {
    await sequelize.sync({ force: true });
    
    const defaultCategories = [
      { name: 'Work', color: '#FF6B6B' },
      { name: 'Personal', color: '#4ECDC4' },
      { name: 'Shopping', color: '#45B7D1' },
      { name: 'Health', color: '#96CEB4' },
      { name: 'Learning', color: '#FFEAA7' },
      { name: 'Finance', color: '#DDA0DD' }
    ];

    await Category.bulkCreate(defaultCategories);
    console.log('✅ Default categories seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedCategories();

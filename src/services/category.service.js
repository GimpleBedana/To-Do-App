const { Category } = require('../models');

class CategoryService {
  // Get all categories
  static async getAllCategories() {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']]
      });
      return categories;
    } catch (error) {
      throw new Error('Failed to retrieve categories');
    }
  }

  // Get category by ID
  static async getCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Create new category
  static async createCategory(categoryData) {
    try {
      const category = await Category.create(categoryData);
      return category;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Category name already exists');
      }
      throw new Error('Failed to create category');
    }
  }

  // Update category
  static async updateCategory(id, updateData) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }

      await category.update(updateData);
      return category;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Category name already exists');
      }
      throw new Error('Failed to update category');
    }
  }

  // Delete category
  static async deleteCategory(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }

      await category.destroy();
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete category');
    }
  }
}

module.exports = CategoryService;

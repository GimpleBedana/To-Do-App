const CategoryService = require('../services/category.service');

class CategoryController {
  // Get all categories
  static async getCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      
      res.json({
        success: true,
        data: categories,
        message: 'Categories retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'CATEGORIES_GET_ERROR',
          message: error.message || 'Failed to retrieve categories'
        }
      });
    }
  }

  // Get single category
  static async getCategory(req, res) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      
      res.json({
        success: true,
        data: category,
        message: 'Category retrieved successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: {
          code: 'CATEGORY_NOT_FOUND',
          message: error.message || 'Category not found'
        }
      });
    }
  }

  // Create new category
  static async createCategory(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      
      res.status(201).json({
        success: true,
        data: category,
        message: 'Category created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'CATEGORY_CREATE_ERROR',
          message: error.message || 'Failed to create category'
        }
      });
    }
  }

  // Update category
  static async updateCategory(req, res) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      
      res.json({
        success: true,
        data: category,
        message: 'Category updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'CATEGORY_UPDATE_ERROR',
          message: error.message || 'Failed to update category'
        }
      });
    }
  }

  // Delete category
  static async deleteCategory(req, res) {
    try {
      const result = await CategoryService.deleteCategory(req.params.id);
      
      res.json({
        success: true,
        data: result,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: {
          code: 'CATEGORY_DELETE_ERROR',
          message: error.message || 'Failed to delete category'
        }
      });
    }
  }
}

module.exports = CategoryController;

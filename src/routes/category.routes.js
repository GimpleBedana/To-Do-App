const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const CategoryController = require('../controllers/category.controller');
const { validateRequest, categorySchemas } = require('../utils/validation');

// All category routes require authentication
router.use(authMiddleware);

// GET /api/v1/categories - Get all categories
router.get('/', CategoryController.getCategories);

// GET /api/v1/categories/:id - Get single category
router.get('/:id', validateRequest(categorySchemas.params, 'params'), CategoryController.getCategory);

// POST /api/v1/categories - Create new category
router.post('/', validateRequest(categorySchemas.create), CategoryController.createCategory);

// PUT /api/v1/categories/:id - Update category
router.put('/:id', validateRequest(categorySchemas.params, 'params'), validateRequest(categorySchemas.update), CategoryController.updateCategory);

// DELETE /api/v1/categories/:id - Delete category
router.delete('/:id', validateRequest(categorySchemas.params, 'params'), CategoryController.deleteCategory);

module.exports = router;

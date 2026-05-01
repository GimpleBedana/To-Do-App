const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const TodoController = require('../controllers/todo.controller');
const { validateRequest, todoSchemas } = require('../utils/validation');

// All todo routes require authentication
router.use(authMiddleware);

// GET /api/v1/todos - Get all todos for authenticated user
router.get('/', validateRequest(todoSchemas.query, 'query'), TodoController.getTodos);

// GET /api/v1/todos/stats - Get todo statistics
router.get('/stats', TodoController.getTodoStats);

// GET /api/v1/todos/:id - Get single todo
router.get('/:id', validateRequest(todoSchemas.params, 'params'), TodoController.getTodo);

// POST /api/v1/todos - Create new todo
router.post('/', validateRequest(todoSchemas.create), TodoController.createTodo);

// PUT /api/v1/todos/:id - Update todo
router.put('/:id', validateRequest(todoSchemas.update), TodoController.updateTodo);

// PATCH /api/v1/todos/:id/status - Update todo status only
router.patch('/:id/status', validateRequest(todoSchemas.updateStatus), TodoController.updateTodoStatus);

// DELETE /api/v1/todos/:id - Delete todo
router.delete('/:id', validateRequest(todoSchemas.params, 'params'), TodoController.deleteTodo);

module.exports = router;

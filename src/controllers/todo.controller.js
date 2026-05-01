const TodoService = require('../services/todo.service');

class TodoController {
  // Create new todo
  static async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.userId, req.body);
      
      res.status(201).json({
        success: true,
        data: todo,
        message: 'Todo created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TODO_CREATE_ERROR',
          message: error.message || 'Failed to create todo'
        }
      });
    }
  }

  // Get user's todos
  static async getTodos(req, res) {
    try {
      const result = await TodoService.getTodos(req.userId, req.query);
      
      res.json({
        success: true,
        data: result.todos,
        pagination: result.pagination,
        message: 'Todos retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TODOS_GET_ERROR',
          message: error.message || 'Failed to retrieve todos'
        }
      });
    }
  }

  // Get single todo
  static async getTodo(req, res) {
    try {
      const todo = await TodoService.getTodoById(req.params.id, req.userId);
      
      res.json({
        success: true,
        data: todo,
        message: 'Todo retrieved successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: {
          code: 'TODO_NOT_FOUND',
          message: error.message || 'Todo not found'
        }
      });
    }
  }

  // Update todo
  static async updateTodo(req, res) {
    try {
      const todo = await TodoService.updateTodo(req.params.id, req.userId, req.body);
      
      res.json({
        success: true,
        data: todo,
        message: 'Todo updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TODO_UPDATE_ERROR',
          message: error.message || 'Failed to update todo'
        }
      });
    }
  }

  // Update todo status only
  static async updateTodoStatus(req, res) {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_STATUS',
            message: 'Status is required'
          }
        });
      }

      const todo = await TodoService.updateTodoStatus(req.params.id, req.userId, status);
      
      res.json({
        success: true,
        data: todo,
        message: 'Todo status updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TODO_STATUS_UPDATE_ERROR',
          message: error.message || 'Failed to update todo status'
        }
      });
    }
  }

  // Delete todo
  static async deleteTodo(req, res) {
    try {
      const result = await TodoService.deleteTodo(req.params.id, req.userId);
      
      res.json({
        success: true,
        data: result,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: {
          code: 'TODO_DELETE_ERROR',
          message: error.message || 'Failed to delete todo'
        }
      });
    }
  }

  // Get todo statistics
  static async getTodoStats(req, res) {
    try {
      const stats = await TodoService.getTodoStats(req.userId);
      
      res.json({
        success: true,
        data: stats,
        message: 'Todo statistics retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TODO_STATS_ERROR',
          message: error.message || 'Failed to retrieve todo statistics'
        }
      });
    }
  }
}

module.exports = TodoController;

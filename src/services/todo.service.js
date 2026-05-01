const { Todo, User, Category } = require('../models');
const { Op } = require('sequelize');

class TodoService {
  // Create new todo
  static async createTodo(userId, todoData) {
    const todo = await Todo.create({
      ...todoData,
      user_id: userId
    });

    return await this.getTodoById(todo.uuid, userId);
  }

  // Get todos for a user with filtering and pagination
  static async getTodos(userId, options = {}) {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      category_id,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = options;

    const whereClause = { user_id: userId };

    // Add filters
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (category_id) whereClause.category_id = category_id;
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Todo.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['uuid', 'name', 'color']
        }
      ],
      order: [[sort_by, sort_order.toUpperCase()]],
      limit: parseInt(limit),
      offset
    });

    return {
      todos: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    };
  }

  // Get single todo by ID
  static async getTodoById(todoId, userId) {
    const todo = await Todo.findOne({
      where: { 
        uuid: todoId, 
        user_id: userId 
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['uuid', 'name', 'color']
        }
      ]
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return todo;
  }

  // Update todo
  static async updateTodo(todoId, userId, updateData) {
    const todo = await this.getTodoById(todoId, userId);

    // Prevent updating user_id
    delete updateData.user_id;
    delete updateData.uuid;

    await todo.update(updateData);

    return await this.getTodoById(todoId, userId);
  }

  // Update todo status only
  static async updateTodoStatus(todoId, userId, status) {
    const todo = await this.getTodoById(todoId, userId);

    await todo.update({ status });

    return await this.getTodoById(todoId, userId);
  }

  // Delete todo
  static async deleteTodo(todoId, userId) {
    const todo = await this.getTodoById(todoId, userId);

    await todo.destroy();

    return { message: 'Todo deleted successfully' };
  }

  // Get todo statistics for a user
  static async getTodoStats(userId) {
    const stats = await Todo.findAll({
      where: { user_id: userId },
      attributes: [
        'status',
        [Todo.sequelize.fn('COUNT', Todo.sequelize.col('uuid')), 'count']
      ],
      group: ['status']
    });

    const result = {
      total: 0,
      pending: 0,
      in_progress: 0,
      completed: 0
    };

    stats.forEach(stat => {
      result.total += parseInt(stat.dataValues.count);
      result[stat.status] = parseInt(stat.dataValues.count);
    });

    return result;
  }
}

module.exports = TodoService;

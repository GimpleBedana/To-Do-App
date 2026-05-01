const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const todoRoutes = require('./todo.routes');
const categoryRoutes = require('./category.routes');

const router = express.Router();

// API version prefix
const API_VERSION = '/api/v1';

// Mount all routes
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/categories`, categoryRoutes);
router.use(`${API_VERSION}/todos`, todoRoutes);

// API info endpoint
router.get(`${API_VERSION}`, (req, res) => {
  res.json({
    success: true,
    message: 'To-Do API v1',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        refresh: 'POST /api/v1/auth/refresh',
        logout: 'POST /api/v1/auth/logout'
      },
      users: {
        profile: 'GET /api/v1/users/profile',
        updateProfile: 'PUT /api/v1/users/profile'
      },
      categories: {
        list: 'GET /api/v1/categories',
        create: 'POST /api/v1/categories',
        get: 'GET /api/v1/categories/:id',
        update: 'PUT /api/v1/categories/:id',
        delete: 'DELETE /api/v1/categories/:id'
      },
      todos: {
        list: 'GET /api/v1/todos',
        create: 'POST /api/v1/todos',
        get: 'GET /api/v1/todos/:id',
        update: 'PUT /api/v1/todos/:id',
        delete: 'DELETE /api/v1/todos/:id',
        updateStatus: 'PATCH /api/v1/todos/:id/status'
      }
    }
  });
});

module.exports = router;

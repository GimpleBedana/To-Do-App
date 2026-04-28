const express = require('express');
const UserController = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate, userSchemas } = require('../utils/validation');

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

// Get user profile
router.get('/profile', UserController.getProfile);

// Update user profile
router.put('/profile', validate(userSchemas.updateProfile), UserController.updateProfile);

module.exports = router;

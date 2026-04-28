const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { validate, userSchemas } = require('../utils/validation');

const router = express.Router();

// Register new user
router.post('/register', validate(userSchemas.register), AuthController.register);

// Login user
router.post('/login', validate(userSchemas.login), AuthController.login);

// Refresh access token
router.post('/refresh', AuthController.refreshToken);

// Logout user
router.post('/logout', AuthController.logout);

module.exports = router;

const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All todo routes require authentication
router.use(authMiddleware);

// Todo routes will be implemented here
// For now, just return a placeholder response
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo routes coming soon',
    data: []
  });
});

module.exports = router;

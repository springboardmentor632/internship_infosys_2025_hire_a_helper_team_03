const express = require('express');
const router = express.Router();
const parser = require('../config/multer');
const { createTask, getUserTasks, deleteTask } = require('../controller/taskController');
const auth = require('../middleware/auth');

// Route-specific logging middleware
router.use((req, res, next) => {
  console.log('=== Task Route Request ===');
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  next();
});

// Task routes
router.post('/create', auth, parser.single('image'), createTask);
router.get('/mytasks', auth, getUserTasks);
router.delete('/:id', auth, deleteTask);

// Route not found handler for task routes
router.use((req, res) => {
  console.log('Task route not found:', req.method, req.originalUrl);
  res.status(404).json({
    message: `Task route not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handler for task routes
router.use((err, req, res, next) => {
  console.error('Task route error:', err);
  res.status(500).json({
    message: 'Error in task operation',
    error: err.message
  });
});

module.exports = router;

module.exports = router;
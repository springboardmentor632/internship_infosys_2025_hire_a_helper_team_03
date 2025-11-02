const express = require('express');
const router = express.Router();
const parser = require('../config/multer');
const { createTask, getUserTasks, deleteTask, updateTaskStatus, saveDraft, publishDraft } = require('../controller/taskController');
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

// Task routes - Order matters! More specific routes first
router.post('/create', auth, (req, res, next) => {
  parser.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err);
      return res.status(400).json({ 
        message: 'Error uploading image', 
        error: err.message 
      });
    }
    next();
  });
}, createTask);

// Save draft
router.post('/draft', auth, (req, res, next) => {
  parser.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err);
      return res.status(400).json({ 
        message: 'Error uploading image', 
        error: err.message 
      });
    }
    next();
  });
}, saveDraft);

router.get('/mytasks', auth, getUserTasks);

// Publish draft - must be before generic /:id routes
router.patch('/:id/publish', auth, publishDraft);

// Update task status - must be before generic /:id routes
router.patch('/:id/status', auth, updateTaskStatus);

// Delete task
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

const express = require('express');
const router = express.Router();
const parser = require('../config/multer');
const { createTask, getUserTasks } = require('../controller/taskController');
const auth = require('../middleware/auth');

router.post('/create', auth, parser.single('image'), createTask);
router.get('/mytasks', auth, getUserTasks);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controller/notificationController');

router.get('/', auth, notificationController.getNotificationsForUser);
router.patch('/:id/read', auth, notificationController.markAsRead);
router.delete('/:id', auth, notificationController.deleteNotification);

module.exports = router;

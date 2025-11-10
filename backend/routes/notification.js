const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controller/notificationController');

router.get('/', auth, notificationController.getNotificationsForUser);
router.get('/unread-count', auth, notificationController.getUnreadCount);
router.patch('/:id/read', auth, notificationController.markAsRead);
router.patch('/mark-all-read', auth, notificationController.markAllAsRead);
router.delete('/:id', auth, notificationController.deleteNotification);

module.exports = router;

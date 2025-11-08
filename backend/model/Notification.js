const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed
const { 
	getNotificationsForUser, 
	getUnreadCount,
	markAsRead, 
	markAllAsRead,
	deleteNotification 
} = require('../controller/notificationController');

// Get all notifications for user
router.get('/', authMiddleware, getNotificationsForUser);

// Get unread count
router.get('/unread-count', authMiddleware, getUnreadCount);

// Mark specific notification as read
router.patch('/:id/read', authMiddleware, markAsRead);

// Mark all as read
router.patch('/mark-all-read', authMiddleware, markAllAsRead);

// Delete notification
router.delete('/:id', authMiddleware, deleteNotification);

module.exports = router;
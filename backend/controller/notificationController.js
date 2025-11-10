const Notification = require('../model/Notification');

exports.getNotificationsForUser = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
		return res.json({ notifications });
	} catch (err) {
		console.error('getNotificationsForUser error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

// NEW: Get unread notification count
exports.getUnreadCount = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const count = await Notification.countDocuments({ 
			user: userId, 
			read: false 
		});
		
		return res.json({ count });
	} catch (err) {
		console.error('getUnreadCount error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

exports.markAsRead = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const { id } = req.params;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const notification = await Notification.findById(id);
		if (!notification) return res.status(404).json({ message: 'Notification not found' });
		if (String(notification.user) !== String(userId)) return res.status(403).json({ message: 'Forbidden' });

		notification.read = true;
		await notification.save();
		
		// Return updated count
		const count = await Notification.countDocuments({ 
			user: userId, 
			read: false 
		});
		
		return res.json({ message: 'Marked as read', unreadCount: count });
	} catch (err) {
		console.error('markAsRead error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

// NEW: Mark all as read
exports.markAllAsRead = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		await Notification.updateMany(
			{ user: userId, read: false },
			{ read: true }
		);
		
		return res.json({ message: 'All notifications marked as read', unreadCount: 0 });
	} catch (err) {
		console.error('markAllAsRead error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

exports.deleteNotification = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		const { id } = req.params;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const notification = await Notification.findById(id);
		if (!notification) return res.status(404).json({ message: 'Notification not found' });
		if (String(notification.user) !== String(userId)) return res.status(403).json({ message: 'Forbidden' });

		await notification.deleteOne();
		
		// Return updated count
		const count = await Notification.countDocuments({ 
			user: userId, 
			read: false 
		});
		
		return res.json({ message: 'Deleted', unreadCount: count });
	} catch (err) {
		console.error('deleteNotification error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};
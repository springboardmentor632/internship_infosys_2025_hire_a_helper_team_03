const Request = require('../model/Request');
const Task = require('../model/Task');
const User = require('../model/User');
const Notification = require('../model/Notification');

// Create a new request (user requests to do a task)
exports.createRequest = async (req, res) => {
	try {
		const requesterId = req.user && req.user.id;
		const { taskId } = req.body;

		if (!requesterId) return res.status(401).json({ message: 'Unauthorized' });
		if (!taskId) return res.status(400).json({ message: 'taskId is required' });

		const task = await Task.findById(taskId);
		if (!task) return res.status(404).json({ message: 'Task not found' });

		// Get task owner id directly from task.user
		const taskOwnerId = task.user.toString();
		
		// prevent requesting your own task
		if (taskOwnerId === requesterId) {
			return res.status(400).json({ message: 'Cannot request your own task' });
		}

		const existing = await Request.findOne({ requester: requesterId, task: taskId });
		if (existing) return res.status(400).json({ message: 'You already requested this task' });

		const reqDoc = await Request.create({
			requester: requesterId,
			owner: taskOwnerId,
			task: taskId,
		});

		// create notification for owner
		const [requesterUser, taskWithDetails] = await Promise.all([
			User.findById(requesterId),
			Task.findById(taskId).select('title')
		]);

		const title = 'Task Request';
		const message = `${requesterUser?.firstName || 'Someone'} ${requesterUser?.lastName || ''} requested your task '${taskWithDetails?.title || 'Untitled Task'}'`;
		await Notification.create({ 
			user: taskOwnerId, 
			title, 
			message, 
			data: { 
				taskId, 
				requestId: reqDoc._id 
			} 
		});

		return res.status(201).json({ message: 'Request created', request: reqDoc });
	} catch (err) {
		console.error('createRequest error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

// Get requests for owner (incoming requests)
exports.getRequestsForOwner = async (req, res) => {
	try {
		const ownerId = req.user && req.user.id;
		if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });

		const requests = await Request.find({ owner: ownerId }).populate('requester', 'firstName lastName email').populate('task');
		return res.json({ requests });
	} catch (err) {
		console.error('getRequestsForOwner error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

// Get requests made by the current user
exports.getRequestsForRequester = async (req, res) => {
	try {
		const requesterId = req.user && req.user.id;
		if (!requesterId) return res.status(401).json({ message: 'Unauthorized' });

		const requests = await Request.find({ requester: requesterId }).populate('owner', 'firstName lastName email').populate('task');
		return res.json({ requests });
	} catch (err) {
		console.error('getRequestsForRequester error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

// Update request status (accept/decline) - only owner can do this
exports.updateRequestStatus = async (req, res) => {
	try {
		const ownerId = req.user && req.user.id;
		const { id } = req.params;
		const { status } = req.body;

		if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
		if (!['accepted', 'declined'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

		const request = await Request.findById(id).populate('task').populate('requester');
		if (!request) return res.status(404).json({ message: 'Request not found' });
		if (String(request.owner) !== String(ownerId)) return res.status(403).json({ message: 'Forbidden' });

		request.status = status;
		await request.save();

		// notify requester
		const title = `Request ${status.charAt(0).toUpperCase() + status.slice(1)}`;
		const message = `Your request for task '${request.task.title}' was ${status} by the owner`;
		await Notification.create({ user: request.requester._id, title, message, data: { taskId: request.task._id, requestId: request._id } });

		return res.json({ message: 'Request updated', request });
	} catch (err) {
		console.error('updateRequestStatus error', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

const Task = require('../model/Task');

exports.createTask = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User ID:', req.user.id);

    const { title, description, category, location, startDate, startTime, endDate, endTime, budget, urgency } = req.body;
    
    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: 'Title, description, category, and location are required' });
    }

    const imageUrl = req.file ? req.file.path : null;

    const task = new Task({
      user: req.user.id,
      title,
      description,
      category,
      location,
      startDate: startDate || null,
      startTime: startTime || null,
      endDate: endDate || null,
      endTime: endTime || null,
      budget: budget || null,
      urgency: urgency || 'medium',
      imageUrl,
    });

    await task.save();
    console.log('Task created successfully:', task._id);
    
    res.status(201).json({ 
      message: 'Task created successfully', 
      task: {
        _id: task._id,
        title: task.title,
        category: task.category,
        status: 'active'
      }
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ 
      message: 'Server error while creating task',
      error: err.message 
    });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching tasks for user:', userId);
    
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    
    console.log(`Found ${tasks.length} tasks for user ${userId}`);
    
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching user tasks:', err);
    res.status(500).json({ 
      message: 'Server error while fetching tasks',
      error: err.message 
    });
  }
};

const mongoose = require('mongoose');

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    console.log('=== Delete Task Request ===');
    console.log('Task ID:', taskId);
    console.log('User ID:', userId);

    if (!taskId) {
      console.log('No task ID provided');
      return res.status(400).json({ message: 'Task ID is required' });
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid MongoDB ObjectId:', taskId);
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    
    // First check if the task exists
    const task = await Task.findOne({ _id: taskId });
    console.log('Found task:', task);
    
    if (!task) {
      console.log('Task not found with ID:', taskId);
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user owns the task
    console.log('Task user ID:', task.user.toString());
    console.log('Request user ID:', userId);
    
    if (task.user.toString() !== userId) {
      console.log('User not authorized to delete this task');
      return res.status(401).json({ message: 'User not authorized to delete this task' });
    }

    // Delete the task
    const result = await Task.deleteOne({ _id: taskId });
    console.log('Delete result:', result);

    if (result.deletedCount === 1) {
      console.log('Task deleted successfully');
      return res.status(200).json({ 
        message: 'Task deleted successfully',
        taskId: taskId
      });
    } else {
      console.log('Task not deleted');
      return res.status(500).json({ 
        message: 'Failed to delete task'
      });
    }
  } catch (err) {
    console.error('Error in deleteTask:', err);
    return res.status(500).json({ 
      message: 'Server error while deleting task',
      error: err.message 
    });
  }
};
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
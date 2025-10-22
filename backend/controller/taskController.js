const Task = require('../model/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, location, startDate, startTime, endDate, endTime, budget, urgency } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const user = req.user.id; // assuming auth middleware sets req.user

    const task = new Task({
      user,
      title,
      description,
      category,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      budget,
      urgency,
      imageUrl,
    });

    await task.save();
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const user = req.user.id;
    const tasks = await Task.find({ user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: String,
    default: null
  },
  startTime: { 
    type: String,
    default: null
  },
  endDate: { 
    type: String,
    default: null
  },
  endTime: { 
    type: String,
    default: null
  },
  budget: { 
    type: String,
    default: null
  },
  urgency: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  imageUrl: { 
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'in-progress', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Task', TaskSchema);
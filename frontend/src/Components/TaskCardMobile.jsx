import React from "react";

const TaskCardMobile = ({ task, index, onViewClick }) => {
  // Get user's full name or show "you" if current user
  const getUserName = () => {
    // Get current logged-in user
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (task.user) {
      // Check if this task is posted by the logged-in user
      const taskUserId = task.user._id || task.user.id || task.user;
      const currentUserId = currentUser.id || currentUser._id;
      
      if (taskUserId === currentUserId) {
        return 'you';
      }
      
      // Return the task poster's name
      if (task.user.firstName && task.user.lastName) {
        return `${task.user.firstName} ${task.user.lastName}`;
      }
      return task.user.firstName || task.user.lastName || 'Anonymous';
    }
    return 'Anonymous';
  };

  return (
    <div
      key={task._id || index}
      className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {task.budget ? `$${task.budget}` : 'Negotiable'}
        </span>
      </div>
      
      <div className="mb-3">
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {task.category}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
          task.status === 'completed' ? 'bg-green-500' : 
          task.status === 'in-progress' ? 'bg-yellow-500' : 
          'bg-gradient-to-r from-blue-500 to-blue-600'
        }`}>
          {task.status || 'Active'}
        </span>
        <span className="text-gray-600 text-sm">
          {task.location}
        </span>
      </div>

      {task.user && (
        <div className="flex items-center gap-2 text-gray-700 mb-3">
          <svg className="w-4 h-4 text-sky-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm truncate">Posted by {getUserName()}</span>
        </div>
      )}

      {task.imageUrl && (
        <img 
          src={task.imageUrl} 
          alt="Task" 
          className="w-full h-32 object-cover rounded-lg mb-3" 
        />
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onViewClick(task)}
          className="flex-1 text-white text-sm font-semibold py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:shadow-lg transition-all"
        >
          View
        </button>
        <button className="flex-1 bg-white text-gray-700 text-sm font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskCardMobile;
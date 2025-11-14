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
      className="bg-white rounded-xl shadow-sm hover:shadow-md p-3 transition-all duration-300 border border-gray-200"
    >
      {/* Task Image */}
      {task.imageUrl && (
        <img 
          src={task.imageUrl} 
          alt="Task" 
          className="w-full h-32 object-cover rounded-lg mb-3" 
        />
      )}
      
      {/* Header & Budget */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
          ₹{task.budget || 'TBD'}
        </div>
      </div>

      {/* Category & Status */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
          {task.category}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${
          task.status === 'completed' ? 'bg-green-500' : 
          task.status === 'in-progress' ? 'bg-yellow-500' : 
          'bg-sky-500'
        }`}>
          {task.status || 'Active'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Location & User */}
      <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
        <span>{task.location}</span>
        <div className="flex items-center gap-1">
          {task.user?.profilePicture ? (
            <img 
              src={task.user.profilePicture} 
              alt="Profile" 
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs">
              {getUserName()[0]}
            </div>
          )}
          <span>by {getUserName()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewClick(task)}
          className="flex-1 text-white text-xs font-semibold py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCardMobile;
import React from "react";
import { FaMapMarkerAlt, FaHeart, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const TaskCard = ({ task, index, favorites, toggleFavorite, onViewDetails, hasRequested }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get urgency badge
  const getUrgencyBadge = (urgency) => {
    const badges = {
      urgent: { color: 'bg-red-100 text-red-700', text: 'Urgent' },
      high: { color: 'bg-orange-100 text-orange-700', text: 'High Priority' },
      medium: { color: 'bg-yellow-100 text-yellow-700', text: 'Medium' },
      low: { color: 'bg-green-100 text-green-700', text: 'Low Priority' }
    };
    return badges[urgency?.toLowerCase()] || badges.medium;
  };

  const urgencyBadge = getUrgencyBadge(task.urgency);

  // Default image if none provided
  const taskImage = task.imageUrl || 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop';

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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Task Image */}
      <div className="h-40 overflow-hidden relative">
        <img
          src={taskImage}
          alt={task.title}
          className="w-full h-full object-cover"
        />
        {task.urgency && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${urgencyBadge.color}`}>
            {urgencyBadge.text}
          </div>
        )}
      </div>

      {/* Task Content */}
      <div className="p-4">
        {/* Task Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {task.title}
            </h3>
            <span className="inline-block px-3 py-1 text-white text-sm font-semibold rounded-full bg-[#0c73c2] capitalize">
              {task.category}
            </span>
          </div>
          <button
            onClick={() => toggleFavorite(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2 ${
              favorites[index] 
                ? 'bg-red-500' 
                : 'bg-white'
            }`}
          >
            <FaHeart
              size={16}
              className={favorites[index] ? "text-white" : "text-red-500"}
            />
          </button>
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Task Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt size={16} className="text-sky-600 flex-shrink-0" />
            <span className="text-sm truncate">{task.location || 'Location not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaCalendarAlt size={16} className="text-sky-600 flex-shrink-0" />
            <span className="text-sm">{formatDate(task.startDate)}</span>
            {task.startTime && (
              <span className="text-sm text-gray-500">• {task.startTime}</span>
            )}
          </div>
          {task.user && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4 text-sky-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm truncate">Posted by {getUserName()}</span>
            </div>
          )}
        </div>

        {/* Price and Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="px-2 py-1 text-sm font-bold text-green-700 bg-green-100 rounded flex items-center gap-1">
            <FaDollarSign size={12} />
            {task.budget || 'Negotiable'}
          </span>
          {hasRequested ? (
            <button 
              disabled
              className="px-4 py-2 text-gray-600 font-semibold rounded-lg bg-gray-200 cursor-not-allowed text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Requested
            </button>
          ) : (
            <button 
              onClick={() => onViewDetails(task)}
              className="px-4 py-2 text-white font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-sm"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
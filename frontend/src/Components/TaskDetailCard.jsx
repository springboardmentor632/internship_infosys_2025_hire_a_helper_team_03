import React from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaRupeeSign, FaTag, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const TaskDetailsCard = ({ task, onClose, onMarkComplete, onEdit }) => {
  if (!task) return null;

  const handleMarkComplete = () => {
    if (onMarkComplete) {
      onMarkComplete(task);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
      case 'urgent':
        return <FaExclamationTriangle className="inline mr-1" size={14} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 pr-4">{task.title}</h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <FaTimes size={16} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold bg-sky-500">
              <FaTag className="mr-1" size={12} />
              {task.category}
            </span>
            {task.urgency && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(task.urgency)}`}>
                {getUrgencyIcon(task.urgency)}
                {task.urgency.charAt(0).toUpperCase() + task.urgency.slice(1)}
              </span>
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {task.status || 'Active'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Image */}
          {task.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={task.imageUrl}
                alt={task.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
              {task.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-900 font-medium">{task.location}</p>
              </div>
            </div>

            {/* Budget */}
            {task.budget && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaRupeeSign size={14} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Budget</p>
                  <p className="text-gray-900 font-medium">₹{task.budget}</p>
                </div>
              </div>
            )}

            {/* Start Date & Time */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt size={14} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Start Date & Time</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(task.startDate)} at {formatTime(task.startTime)}
                </p>
              </div>
            </div>

            {/* End Date & Time */}
            {(task.endDate || task.endTime) && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaClock size={14} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">End Date & Time</p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(task.endDate)} at {formatTime(task.endTime)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Task Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Task ID:</span>
                <span className="ml-2 text-gray-900 font-mono">
                  {task._id ? task._id.substring(0, 8) + '...' : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-300"
            >
              Close
            </button>
            <button 
              onClick={handleEdit}
              className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Edit Task
            </button>
            <button 
              onClick={handleMarkComplete}
              disabled={task.status === 'completed'}
              className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                task.status === 'completed'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {task.status === 'completed' ? 'Completed ✓' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsCard;
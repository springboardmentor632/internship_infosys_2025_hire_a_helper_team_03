import React from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaDollarSign, FaTag, FaExclamationTriangle, FaTimes, FaUser, FaEnvelope } from "react-icons/fa";

const TaskViewModal = ({ task, onClose, hasRequested, onRequestSent }) => {
  if (!task) return null;

  const handleSendRequest = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to request this task');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId: task._id })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send request');
      }

      alert(data.message || 'Request sent successfully!');
      
      // Notify parent component that request was sent
      if (onRequestSent) {
        onRequestSent();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      alert(err.message || 'Failed to send request');
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency?.toLowerCase()) {
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

  const getUserName = () => {
    // Get current logged-in user
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (task.user) {
      // Check if this task is posted by the logged-in user
      const taskUserId = task.user._id || task.user.id || task.user;
      const currentUserId = currentUser.id || currentUser._id;
      
      if (taskUserId === currentUserId) {
        return 'You';
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold bg-sky-500 capitalize">
              <FaTag className="mr-1" size={12} />
              {task.category}
            </span>
            {task.urgency && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(task.urgency)}`}>
                {getUrgencyIcon(task.urgency)}
                {task.urgency.charAt(0).toUpperCase() + task.urgency.slice(1)}
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              Active
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
                  <FaDollarSign size={14} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Budget</p>
                  <p className="text-gray-900 font-medium">${task.budget}</p>
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
                  {formatDate(task.startDate)}
                  {task.startTime && <span className="block text-sm">{formatTime(task.startTime)}</span>}
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
                    {formatDate(task.endDate)}
                    {task.endTime && <span className="block text-sm">{formatTime(task.endTime)}</span>}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Posted By Section */}
          {task.user && (
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 border border-sky-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaUser className="text-sky-600" />
                Posted By
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {task.user.firstName ? task.user.firstName.charAt(0).toUpperCase() : 'A'}
                      {task.user.lastName ? task.user.lastName.charAt(0).toUpperCase() : ''}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">{getUserName()}</p>
                    {task.user.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaEnvelope size={12} className="text-sky-600" />
                        <span>{task.user.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

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
            {getUserName() === 'You' ? (
              <button
                disabled
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                Your Task
              </button>
            ) : hasRequested ? (
              <button
                disabled
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Request Sent
              </button>
            ) : (
              <button
                onClick={handleSendRequest}
                className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Request Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;

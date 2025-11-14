import React from "react";
import { FaMapMarkerAlt, FaTag, FaRupeeSign } from "react-icons/fa";

const TaskTable = ({ tasks, onViewClick, onDeleteClick, onEditClick }) => {
  const getStatusStyle = (status) => {
    const normalizedStatus = status?.toLowerCase() || 'active';
    switch (normalizedStatus) {
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'in-progress':
      case 'in progress':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'active':
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };

  const getStatusText = (status) => {
    const normalizedStatus = status?.toLowerCase() || 'active';
    switch (normalizedStatus) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
      case 'in progress':
        return 'In Progress';
      case 'active':
      default:
        return 'Active';
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View - Card Layout */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {tasks.map((task, index) => (
          <div key={task._id || index} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start gap-3 mb-2 sm:mb-3">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg flex-1">{task.title}</h3>
              <span className={`shrink-0 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-sm ${getStatusStyle(task.status)}`}>
                {getStatusText(task.status)}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{task.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 mb-4">
              <div className="flex items-center gap-1.5 text-gray-600">
                <FaTag size={12} className="shrink-0" />
                <span className="capitalize text-xs sm:text-sm truncate">{task.category}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <FaMapMarkerAlt size={12} className="shrink-0" />
                <span className="text-xs sm:text-sm truncate">{task.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-600 font-medium col-span-2 sm:col-span-1">
                <FaRupeeSign size={12} className="shrink-0" />
                <span className="text-xs sm:text-sm">{task.budget || 'Negotiable'}</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <button 
                onClick={() => onViewClick(task)}
                className="flex-1 min-w-[80px] py-2 px-3 sm:px-4 bg-sky-500 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200"
              >
                View
              </button>
              <button 
                onClick={() => onEditClick(task)}
                className="flex-1 min-w-[80px] px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Edit
              </button>
              <button 
                onClick={() => onDeleteClick(task)}
                className="flex-1 sm:flex-none min-w-[40px] px-3 sm:px-4 py-2 bg-red-100 text-red-600 text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm p-4 lg:p-6 border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-left font-bold text-xs lg:text-sm">Task Title</th>
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-left font-bold text-xs lg:text-sm">Category</th>
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-center font-bold text-xs lg:text-sm">Status</th>
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-center font-bold text-xs lg:text-sm hidden lg:table-cell">Location</th>
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-center font-bold text-xs lg:text-sm">Budget</th>
                <th className="py-3 lg:py-4 px-4 lg:px-6 text-center font-bold text-xs lg:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id || index} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200">
                  <td className="py-3 lg:py-4 px-4 lg:px-6">
                    <div>
                      <p className="font-bold text-sm lg:text-base text-gray-900">{task.title}</p>
                    </div>
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6">
                    <span className="text-gray-700 font-medium capitalize text-xs lg:text-sm">
                      {task.category}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-center">
                    <span className={`inline-block px-2.5 lg:px-4 py-1 lg:py-2 rounded-lg text-white text-xs lg:text-sm font-semibold shadow-md min-w-[80px] lg:min-w-[100px] ${getStatusStyle(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-center text-gray-700 font-semibold text-xs lg:text-sm hidden lg:table-cell">
                    {task.location}
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-center">
                    <span className="px-2.5 lg:px-4 py-1 lg:py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-lg font-bold shadow-md inline-block min-w-[80px] lg:min-w-[100px] text-xs lg:text-sm">
                      {task.budget ? `₹${task.budget}` : 'Negotiable'}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6">
                    <div className="flex justify-center gap-1 md:gap-3 flex-wrap">
                      <button 
                        onClick={() => onViewClick(task)}
                        className="px-3 md:px-6 py-1.5 md:py-2.5 text-white rounded-lg md:rounded-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-xs md:text-base"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => onEditClick(task)}
                        className="px-3 md:px-6 py-1.5 md:py-2.5 bg-gray-100 text-gray-700 rounded-lg md:rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300 text-xs md:text-base"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDeleteClick(task)}
                        className="px-3 md:px-6 py-1.5 md:py-2.5 bg-red-100 text-red-700 rounded-lg md:rounded-xl font-semibold hover:bg-red-200 transition-all duration-200 border border-red-300 flex items-center gap-1 md:gap-2 text-xs md:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
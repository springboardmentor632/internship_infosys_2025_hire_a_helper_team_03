import React from "react";

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
    <div className="bg-white rounded-2xl shadow-sm p-3 md:p-6 border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="py-3 md:py-4 px-3 md:px-6 text-left font-bold text-sm md:text-lg">Task Title</th>
              <th className="py-3 md:py-4 px-3 md:px-6 text-left font-bold text-sm md:text-lg">Category</th>
              <th className="py-3 md:py-4 px-3 md:px-6 text-center font-bold text-sm md:text-lg">Status</th>
              <th className="py-3 md:py-4 px-3 md:px-6 text-center font-bold text-sm md:text-lg hidden sm:table-cell">Location</th>
              <th className="py-3 md:py-4 px-3 md:px-6 text-center font-bold text-sm md:text-lg">Budget</th>
              <th className="py-3 md:py-4 px-3 md:px-6 text-center font-bold text-sm md:text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id || index} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <td className="py-3 md:py-5 px-3 md:px-6">
                  <div>
                    <p className="font-bold text-sm md:text-lg text-gray-900">{task.title}</p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2 max-w-md">{task.description}</p>
                  </div>
                </td>
                <td className="py-3 md:py-5 px-3 md:px-6">
                  <span className="text-gray-700 font-medium capitalize text-xs md:text-base">
                    {task.category}
                  </span>
                </td>
                <td className="py-3 md:py-5 px-3 md:px-6 text-center">
                  <span className={`inline-block px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm font-semibold shadow-md min-w-[80px] md:min-w-[110px] ${getStatusStyle(task.status)}`}>
                    {getStatusText(task.status)}
                  </span>
                </td>
                <td className="py-3 md:py-5 px-3 md:px-6 text-center text-gray-700 font-semibold text-xs md:text-base hidden sm:table-cell">
                  {task.location}
                </td>
                <td className="py-3 md:py-5 px-3 md:px-6 text-center">
                  <span className="px-2 md:px-4 py-1 md:py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-lg md:rounded-xl font-bold shadow-md inline-block min-w-[80px] md:min-w-[120px] text-xs md:text-base">
                    {task.budget ? `$${task.budget}` : 'Negotiable'}
                  </span>
                </td>
                <td className="py-3 md:py-5 px-3 md:px-6">
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
  );
};

export default TaskTable;
import React from "react";

const TaskCardMobile = ({ task, index }) => {
  return (
    <div
      key={task._id || index}
      className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {task.budget ? `$${task.budget}` : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600">
          {task.status || 'Active'}
        </span>
        <span className="text-gray-600 text-sm">
          {/* Requests: {task.requests} */}
        </span>
      </div>
      {task.imageUrl && (
        <img src={task.imageUrl} alt="Task" className="max-h-32 rounded mb-2" />
      )}
      <div className="flex gap-2">
        <button
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
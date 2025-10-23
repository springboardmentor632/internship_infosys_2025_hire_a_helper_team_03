import React from "react";

const TaskTable = ({ tasks }) => {
  return (
    <div className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="py-4 px-6 text-left font-bold text-lg">Task Title</th>
              <th className="py-4 px-6 text-center font-bold text-lg">Status</th>
              <th className="py-4 px-6 text-center font-bold text-lg">Requests</th>
              <th className="py-4 px-6 text-center font-bold text-lg">Price</th>
              <th className="py-4 px-6 text-center font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id || index} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <td className="py-5 px-6 font-bold text-lg text-gray-900">{task.title}</td>
                <td className="py-5 px-6 text-center">
                  <span className="inline-block px-4 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                    {task.status || 'Active'}
                  </span>
                </td>
                <td className="py-5 px-6 text-center text-gray-700 font-semibold text-lg">-</td>
                <td className="py-5 px-6 text-center">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-xl font-bold shadow-md inline-block text-lg">
                    {task.budget ? `$${task.budget}` : 'N/A'}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <div className="flex justify-center gap-3">
                    <button className="px-6 py-2.5 text-white rounded-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                      View
                    </button>
                    <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300">
                      Edit
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
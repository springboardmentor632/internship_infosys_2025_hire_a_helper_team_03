import React from "react";
import { FaMapMarkerAlt, FaClock, FaStar, FaHeart } from "react-icons/fa";

const TaskCard = ({ task, index, favorites, toggleFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Task Image */}
      <div className="h-40 overflow-hidden">
        <img
          src={task.image}
          alt={task.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Task Content */}
      <div className="p-4">
        {/* Task Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {task.title}
            </h3>
            <span className="inline-block px-3 py-1 text-white text-sm font-semibold rounded-full bg-[#0c73c2]">
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

        {/* Task Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt size={16} className="text-sky-600" />
            <span className="text-sm">{task.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaClock size={16} className="text-sky-600" />
            <span className="text-sm">{task.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaStar size={16} className="text-yellow-400" fill="#fbbf24" />
            <span className="text-sm font-semibold">{task.rating}</span>
            <span className="text-sm text-gray-600">({task.reviews} reviews)</span>
          </div>
        </div>

        {/* Price and Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="px-2 py-1 text-sm font-bold text-green-700 bg-green-100 rounded">
            {task.price}
          </span>
          <button className="px-4 py-2 text-white font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-sm">
            Request Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
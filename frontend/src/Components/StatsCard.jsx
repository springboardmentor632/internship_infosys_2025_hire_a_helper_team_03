import React from "react";

const StatsCard = ({ stat, index }) => {
  const IconComponent = stat.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 md:p-6 transition-all duration-300 border border-gray-200">
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-sm`}
      >
        <IconComponent size={20} className="text-white" />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        {stat.value}
      </p>
      <p className="text-xs md:text-sm text-gray-600 font-medium">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsCard;
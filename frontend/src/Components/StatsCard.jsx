import React from "react";

const StatsCard = ({ stat, index }) => {
  const IconComponent = stat.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-3 md:p-4 lg:p-5 transition-all duration-300 border border-gray-100">
      <div
        className={`w-7 h-7 md:w-9 md:h-9 rounded-md bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-2 md:mb-3 shadow-sm`}
      >
        <IconComponent size={16} className="text-white md:w-5 md:h-5" />
      </div>
      <p className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">
        {stat.value}
      </p>
      <p className="text-[10px] md:text-xs lg:text-sm text-gray-600 font-semibold leading-tight">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsCard;
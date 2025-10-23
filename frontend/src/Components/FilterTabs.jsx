import React from "react";

const FilterTabs = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`text-center transition-all duration-200 pb-2 ${
            activeFilter === filter.id
              ? 'border-b-4 border-sky-600 text-sky-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <p className={`font-bold text-lg ${activeFilter === filter.id ? 'text-sky-600' : 'text-gray-800'}`}>
            {filter.label}
          </p>
          <p className="text-gray-600 text-sm">({filter.count})</p>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
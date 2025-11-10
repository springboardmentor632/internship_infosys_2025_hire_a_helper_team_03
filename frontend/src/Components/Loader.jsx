import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";
import { FaHome, FaPlusCircle, FaEnvelope, FaEllipsisH } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const BottomNav = ({ navigate }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 px-2 py-3 shadow-2xl z-50">
      <div className="flex items-center justify-around relative">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
        >
          <MdDashboard size={24} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-500">Dashboard</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
          <FaHome size={24} className="text-sky-600" />
          <span className="text-xs font-bold text-sky-600">Home</span>
        </button>

        <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-sky-500 shadow-2xl transition-all duration-200 hover:scale-110">
          <FaPlusCircle size={32} className="text-white" />
        </button>

        <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
          <FaEnvelope size={24} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-500">Request</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
          <FaEllipsisH size={24} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-500">More</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
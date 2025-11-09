import React, { useState } from "react";
import { FaPlusCircle, FaEnvelope } from "react-icons/fa";
import { MdDashboard, MdCheckBox } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

const BottomNav = ({ navigate, activeTab = "dashboard" }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <>
      <nav className="lg:hidden h-15 fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="px-3 py-2">
          <div className="flex items-center justify-around">
            {/* Dashboard */}
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center py-1 px-3 transition-colors hover:text-sky-600"
            >
              <MdDashboard size={24} className={activeTab === "dashboard" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-xs mt-1 font-medium ${activeTab === "dashboard" ? "text-sky-600" : "text-gray-600"}`}>
                Dashboard
              </span>
            </button>

            {/* My Tasks */}
            <button 
              onClick={() => navigate('/mytasks')}
              className="flex flex-col items-center py-1 px-3 transition-colors hover:text-sky-600"
            >
              <MdCheckBox size={24} className={activeTab === "mytasks" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-xs mt-1 font-medium ${activeTab === "mytasks" ? "text-sky-600" : "text-gray-600"}`}>
                Tasks
              </span>
            </button>

            {/* Post Task Button - Small and Simple */}
            <button 
              onClick={() => navigate('/posttask')}
              className="flex flex-col items-center py-1 px-3 transition-colors hover:text-sky-600"
            >
              <FaPlusCircle size={22} className={`text-sky-600`} />
              <span className="text-xs mt-1 font-medium text-gray-600">
                Post Task
              </span>
            </button>

            {/* Requests */}
            <button 
              onClick={() => navigate('/requests')}
              className="flex flex-col items-center py-1 px-3 transition-colors hover:text-sky-600"
            >
              <FaEnvelope size={22} className={activeTab === "requests" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-xs mt-1 font-medium ${activeTab === "requests" ? "text-sky-600" : "text-gray-600"}`}>
                Requests
              </span>
            </button>

            {/* More */}
            <button 
              onClick={() => setShowMoreMenu(true)}
              className="flex flex-col items-center py-1 px-3 transition-colors hover:text-sky-600"
            >
              <HiDotsHorizontal size={24} className="text-gray-600 rotate-0" />
              <span className="text-xs mt-1 font-medium text-gray-600">
                More
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <MobileMenu 
        isOpen={showMoreMenu} 
        onClose={() => setShowMoreMenu(false)} 
        navigate={navigate}
      />
    </>
  );
};

export default BottomNav;
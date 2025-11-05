import React, { useState } from "react";
import { FaPlusCircle, FaEnvelope } from "react-icons/fa";
import { MdDashboard, MdCheckBox } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

const BottomNav = ({ navigate, activeTab = "dashboard" }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="relative pt-2 pb-3 px-2">
          <div className="flex items-end justify-around">
            {/* Dashboard */}
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 p-2 transition-all active:scale-95 min-w-[60px]"
            >
              <MdDashboard size={28} className={activeTab === "dashboard" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-[10px] font-bold ${activeTab === "dashboard" ? "text-sky-600" : "text-gray-600"}`}>
                DashBoard
              </span>
            </button>

            {/* My Tasks */}
            <button 
              onClick={() => navigate('/mytasks')}
              className="flex flex-col items-center gap-1 p-2 transition-all active:scale-95 min-w-[60px]"
            >
              <MdCheckBox size={28} className={activeTab === "mytasks" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-[10px] font-bold ${activeTab === "mytasks" ? "text-sky-600" : "text-gray-600"}`}>
                My Tasks
              </span>
            </button>

            {/* Floating Add Button - Centered with space */}
            <button 
              onClick={() => navigate('/posttask')}
              className="-mt-10 w-[70px] h-[70px] rounded-full flex items-center justify-center bg-sky-600 shadow-xl transition-all duration-200 active:scale-95 hover:bg-sky-700 ring-4 ring-white"
            >
              <FaPlusCircle size={36} className="text-white" />
            </button>

            {/* Requests */}
            <button 
              onClick={() => navigate('/requests')}
              className="flex flex-col items-center gap-1 p-2 transition-all active:scale-95 min-w-[60px]"
            >
              <FaEnvelope size={26} className={activeTab === "requests" ? "text-sky-600" : "text-gray-600"} />
              <span className={`text-[10px] font-bold ${activeTab === "requests" ? "text-sky-600" : "text-gray-600"}`}>
                Requests
              </span>
            </button>

            {/* More */}
            <button 
              onClick={() => setShowMoreMenu(true)}
              className="flex flex-col items-center gap-1 p-2 transition-all active:scale-95 min-w-[60px]"
            >
              <HiDotsHorizontal size={28} className="text-gray-600 rotate-0" />
              <span className="text-[10px] font-bold text-gray-600">More</span>
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
import React from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { MdList } from "react-icons/md";

const Header = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  sidebarCollapsed 
}) => {
  return (
    <>
      {/* Header - Desktop */}
      <header className="hidden lg:flex items-center justify-between bg-white border-b-2 border-gray-300 px-8 py-4 shadow-sm sticky top-0 z-40">
        <div className="flex-1 max-w-md relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Quick Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-700 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>
        <div className="flex items-center gap-4 ml-8">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <FaBell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <FaUser size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Header - Mobile */}
      <header className="lg:hidden bg-white border-b-2 border-gray-300 px-4 py-4 sticky top-0 z-40 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <MdList size={24} className="text-gray-600" />
        </button>

        <div className="flex-1 max-w-xs mx-4 relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Quick Search"
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm border border-gray-400 focus:outline-none"
          />
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FaBell size={20} className="text-gray-600" />
        </button>
      </header>
    </>
  );
};

export default Header;
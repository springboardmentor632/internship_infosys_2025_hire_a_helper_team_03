import React from "react";
import { FaHandshakeAngle } from "react-icons/fa6";
import {
  MdDashboard,
  MdList,
  MdCheckBox,
  MdSettings,
  MdLaptop,
} from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

const Sidebar = ({
  activeNav,
  setActiveNav,
  mobileMenuOpen,
  setMobileMenuOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  navigate,
}) => {
  const navItems = [
    {
      id: "dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    { id: "feed", icon: MdList, label: "Feed", path: "/feedPage" },
    { id: "mytasks", icon: MdCheckBox, label: "My Tasks", path: "/mytasks" },
    { id: "requests", icon: FaEnvelope, label: "Requests", path: "/requests" },
    {
      id: "myrequests",
      icon: MdLaptop,
      label: "My Requests",
      path: "/myrequests",
    },
    { id: "settings", icon: MdSettings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`flex flex-col text-white flex-shrink-0 h-screen shadow-2xl z-50 bg-gradient-to-b from-sky-600 to-sky-700 transition-all duration-300 ${
          mobileMenuOpen
            ? "fixed left-0 top-0 w-64"
            : "hidden lg:flex lg:fixed lg:left-0 lg:top-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Collapse Toggle Button - Desktop */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-6 bg-sky-700 hover:bg-sky-800 text-white p-1 rounded-full border-2 border-white shadow-lg z-10"
        >
          {sidebarCollapsed ? (
            <IoIosArrowForward size={16} />
          ) : (
            <IoIosArrowBack size={16} />
          )}
        </button>

        {/* Close Button Mobile */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg"
        >
          <IoIosClose size={24} />
        </button>

        {/* Logo */}
        <div className="px-2 pt-2 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-[48px] h-[48px] bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FaHandshakeAngle className="text-xl font-bold w-[30px] h-[32px]" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex">
                <p className="font-bold text-lg leading-none text-[39px] shadow-xl">
                  Hire
                </p>
                <p className="text-xs font-semibold leading-none text-[29px] mt-[20px] shadow-xl">
                  Helper
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/30"></div>

        {/* Navigation */}
        <nav className="flex-1 pt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-200 ${
                activeNav === item.id
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/10"
              } ${sidebarCollapsed ? "justify-center" : ""}`}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <span
                  className={`text-lg ${
                    activeNav === item.id ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        {!sidebarCollapsed && (
          (() => {
            // Try to get user info from localStorage
            let user = null;
            try {
              user = JSON.parse(localStorage.getItem('user'));
            } catch (e) {}
            const name = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Emily Chen';
            const email = user ? user.email : 'emilychen@gmail.com';
            // Get initials for avatar
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
            return (
              <div className="border-t border-white border-opacity-30 p-4 mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{name}</p>
                    <p className="text-xs text-white text-opacity-80 truncate">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
import { MdSettings, MdNotifications, MdHelp, MdInfo, MdExitToApp } from "react-icons/md";
import { FaUser, FaHistory } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const MobileMenu = ({ isOpen, onClose, navigate }) => {
  const menuItems = [
    {
      id: "settings",
      icon: MdSettings,
      label: "Settings",
      path: "/settings",
      color: "text-gray-700"
    },
    {
      id: "notifications",
      icon: MdNotifications,
      label: "Notifications",
      path: "/notifications",
      color: "text-gray-700"
    },
    {
      id: "profile",
      icon: FaUser,
      label: "Profile",
      path: "/profile",
      color: "text-gray-700"
    },
    {
      id: "requests",
      icon: FaHistory,
      label: "My Requests",
      path: "/requests",
      color: "text-gray-700"
    },
    {
      id: "mytasks",
      icon: FaHistory,
      label: "My Tasks",
      path: "/mytasks",
      color: "text-gray-700"
    },
    {
      id: "help",
      icon: MdHelp,
      label: "Help & Support",
      path: "/help",
      color: "text-gray-700"
    },
    {
      id: "about",
      icon: MdInfo,
      label: "About",
      path: "/about",
      color: "text-gray-700"
    },
    {
      id: "logout",
      icon: MdExitToApp,
      label: "Logout",
      path: "/",
      color: "text-red-600"
    }
  ];

  const handleItemClick = (item) => {
    if (item.id === "logout") {
      localStorage.clear();
      onClose();
      navigate('/'); // Navigate to home page
    } else {
      navigate(item.path);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-t-3xl z-50 lg:hidden transform transition-transform duration-300 ease-out max-h-[80vh] overflow-y-auto shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">More Options</h3>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <IoIosClose size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gray-100 transition-all ${
                item.id === "logout" ? "border-t border-gray-200 mt-2" : ""
              }`}
            >
              <div className={`${item.color}`}>
                <item.icon size={24} />
              </div>
              <span className={`text-base font-medium ${item.color}`}>
                {item.label}
              </span>
              <span className="ml-auto text-gray-400">›</span>
            </button>
          ))}
        </div>

        {/* Bottom Padding for safe area */}
        <div className="h-6" />
      </div>
    </>
  );
};

export default MobileMenu;

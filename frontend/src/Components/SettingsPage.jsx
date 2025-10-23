import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle } from "react-icons/fa6";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaHome,
  FaPlusCircle,
  FaEllipsisH,
  FaEnvelope,
} from "react-icons/fa";
import {
  MdDashboard,
  MdList,
  MdCheckBox,
  MdSettings,
  MdLaptop,
  MdKeyboardArrowRight,
  MdPerson,
  MdNotifications,
  MdSecurity,
  MdCreditCard,
  MdHelp,
  MdLogout,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

export default function Settings() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("settings");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle states for notification preferences
  const [taskUpdates, setTaskUpdates] = useState(true);
  const [messages, setMessages] = useState(true);
  const [recommendations, setRecommendations] = useState(false);

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

  const settingsSections = [
    {
      title: "Profile",
      description: "Manage Your Personal Information",
      icon: MdPerson,
      iconBg: "#9BCAFF",
      iconColor: "#174DE6"
    },
    {
      title: "Notifications",
      description: "Configure Notification Preferences",
      icon: MdNotifications,
      iconBg: "#EFDDFF",
      iconColor: "#A82BE6"
    },
    {
      title: "Privacy & Security",
      description: "Manage Your Security Settings",
      icon: MdSecurity,
      iconBg: "#E2FFE1",
      iconColor: "#3CD55F"
    },
    {
      title: "Payment Methods",
      description: "Manage Payment Information",
      icon: MdCreditCard,
      iconBg: "#FFFABD",
      iconColor: "#FAAF0C"
    }
  ];

  const notificationPreferences = [
    {
      name: "Task Updates",
      description: "Get notified about task status changes",
      enabled: taskUpdates,
      toggle: setTaskUpdates
    },
    {
      name: "Messages",
      description: "Receive Message Notifications",
      enabled: messages,
      toggle: setMessages
    },
    {
      name: "Recommendations",
      description: "Get Helper Recommendation",
      enabled: recommendations,
      toggle: setRecommendations
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
              <p className="font-bold text-lg leading-none text-[39px] shadow-xl">Hire</p>
              <p className="text-xs font-semibold leading-none text-[29px] mt-[20px] shadow-xl">Helper</p>
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
          <div className="border-t border-white border-opacity-30 p-4 mt-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                EC
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">Emily Chen</p>
                <p className="text-xs text-white text-opacity-80 truncate">
                  emilychen@gmail.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
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

        {/* Settings Content */}
        <section className="flex-1 p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Setting
            </h2>
            <p className="text-lg text-gray-600">
              Manage your Account preference and Setting
            </p>
          </div>

          {/* Main Settings Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-200">
            {/* Settings Sections */}
            {settingsSections.map((section, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-6 flex-1">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: section.iconBg }}
                    >
                      <section.icon 
                        size={32} 
                        style={{ color: section.iconColor }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 text-base">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <MdKeyboardArrowRight 
                    size={32} 
                    className="text-gray-500 flex-shrink-0" 
                  />
                </div>
                {index < settingsSections.length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Notification Preferences
            </h3>

            <div className="space-y-8">
              {notificationPreferences.map((pref, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {pref.name}
                      </h4>
                      <p className="text-gray-600 text-base">
                        {pref.description}
                      </p>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="relative inline-block w-20 h-10">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={pref.enabled}
                        onChange={() => pref.toggle(!pref.enabled)}
                      />
                      <div 
                        className={`block w-20 h-10 rounded-full transition-colors duration-200 ${
                          pref.enabled ? 'bg-blue-600' : 'bg-blue-600'
                        }`}
                      ></div>
                      <div 
                        className={`absolute left-1 top-1 bg-white w-8 h-8 rounded-full transition-transform duration-200 ${
                          pref.enabled ? 'transform translate-x-10' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                  {index < notificationPreferences.length - 1 && (
                    <div className="border-t border-gray-200 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Help & Support and Logout Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Help & Support */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <MdHelp size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Help & Support
                    </h3>
                  </div>
                </div>
                <MdKeyboardArrowRight size={32} className="text-gray-500" />
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <MdLogout size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-red-600">
                      Logout
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/dashboard")}
            >
              <MdDashboard size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaHome size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Home</span>
            </button>

            <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-sky-500 shadow-2xl transition-all duration-200 hover:scale-110">
              <FaPlusCircle size={32} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaEnvelope size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Request</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <MdSettings size={24} className="text-sky-600" />
              <span className="text-xs font-bold text-sky-600">Settings</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
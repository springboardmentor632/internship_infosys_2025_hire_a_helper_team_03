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
  FaDollarSign,
  FaUserCircle,
  FaAward,
  FaClock,
} from "react-icons/fa";
import {
  MdDashboard,
  MdList,
  MdCheckBox,
  MdSettings,
  MdLaptop,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      label: "Tasks Completed",
      value: "23",
      color: "#3B82F6",
      icon: MdCheckBox,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Active tasks",
      value: "5",
      color: "#10B981",
      icon: FaClock,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "Total Earning",
      value: "$1,200",
      color: "#8B5CF6",
      icon: FaDollarSign,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      label: "Average Rating",
      value: "4.6",
      color: "#EF4444",
      icon: FaAward,
      gradient: "from-red-500 to-red-600",
    },
  ];

  const recentActivity = [
    {
      icon: FaUserCircle,
      text: "John requested your 'Fix Kitchen Sink' task",
      time: "2 minutes ago",
      bgColor: "bg-gradient-to-br from-indigo-100 to-blue-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: MdCheckBox,
      text: "You completed 'Garden Cleanup'",
      time: "1 hour ago",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
    },
    {
      icon: FaDollarSign,
      text: "Payment received : $",
      time: "Yesterday",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-600",
    },
  ];

  const activeTasks = [
    {
      title: "Fix Kitchen Sink",
      location: "Downtown",
      requests: "2 requests",
      price: "$75",
      button1: "View",
      button2: "Edit",
      gradient: "from-sky-600 to-blue-600",
    },
    {
      title: "Garden Cleanup",
      location: "Suburb",
      status: "In Progress",
      price: "$120",
      button1: "Track",
      button2: "Chat",
      gradient: "from-sky-600 to-blue-600",
    },
  ];

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

        {/* Dashboard Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Here's what's happening with your tasks today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 md:p-6 transition-all duration-300 border border-gray-200"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-sm`}
                >
                  <stat.icon size={20} className="text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Tasks */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Quick Tasks
            </h3>
            <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row gap-3">
              <button
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all md:flex-1"
                onClick={() => navigate("/posttask")}
              >
                <FaPlusCircle size={20} />
                Post Task
              </button>
              <button
                className="bg-blue-50 hover:bg-gray-400 text-sky-600 font-bold py-3 px-6 rounded-lg transition-all md:flex-1"
                onClick={() => navigate("/feedPage")}
              >
                Browse Tasks
              </button>
              <button className=" bg-gray-100 text-gray-500 hover:text-gray-700 font-bold py-3 px-6 rounded-lg transition-all md:flex-1">
                View Earnings
              </button>
            </div>
          </div>

          {/* Recent Activity and Active Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <a
                  href="#"
                  className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <div className="flex gap-4 items-start">
                      <div
                        className={`${activity.bgColor} rounded-lg p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center`}
                      >
                        <activity.icon
                          size={24}
                          className={activity.iconColor}
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-gray-900 text-sm md:text-base font-medium">
                          {activity.text}
                        </p>
                        <p className="text-gray-600 text-xs">{activity.time}</p>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="border-b border-gray-300 mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Your Active Tasks */}
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-200">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
                Your Active Tasks
              </h3>

              <div className="space-y-4">
                {activeTasks.map((task, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900">
                        {task.title}
                      </h4>
                      <span className="bg-green-200 text-gray-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap ml-2">
                        {task.price}
                      </span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <span>📍</span>
                        {task.location}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <FaClock size={12} />
                        {task.requests || task.status}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`flex-1 text-white text-sm font-semibold py-2 rounded-lg bg-gradient-to-r ${task.gradient} hover:shadow-lg transition-all`}
                      >
                        {task.button1}
                      </button>
                      <button className="flex-1 bg-white text-gray-700 text-sm font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
                        {task.button2}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <MdDashboard size={24} className="text-sky-600" />
              <span className="text-xs font-bold text-sky-600">Dashboard</span>
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
              <FaEllipsisH size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}

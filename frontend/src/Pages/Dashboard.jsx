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
  MdCheckBox, // This was missing!
  MdSettings,
  MdLaptop,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

// Import components
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import StatsCard from "../Components/StatsCard";

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
      icon: MdCheckBox, // Now this will work
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        navigate={navigate}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          sidebarCollapsed={sidebarCollapsed}
        />

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
              <StatsCard key={index} stat={stat} index={index} />
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

        <BottomNav navigate={navigate} />
      </main>
    </div>
  );
}
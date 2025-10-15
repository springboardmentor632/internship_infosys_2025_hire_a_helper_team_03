import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  Home,
  PlusCircle,
  MoreHorizontal,
  DollarSign,
  UserCircle,
  CheckCircle2,
  Award,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');

  const stats = [
    { label: "Tasks Completed", value: "23", color: "#3B82F6", icon: CheckCircle2, gradient: "from-blue-500 to-blue-600" },
    { label: "Active Tasks", value: "5", color: "#10B981", icon: Clock, gradient: "from-green-500 to-emerald-600" },
    { label: "Total Earnings", value: "$1,240", color: "#8B5CF6", icon: DollarSign, gradient: "from-purple-500 to-purple-600" },
    { label: "Average Rating", value: "4.8", color: "#EF4444", icon: Award, gradient: "from-amber-500 to-orange-600" },
  ];

  const recentActivity = [
    {
      icon: UserCircle,
      text: "John requested your 'Fix Kitchen Sink' task",
      time: "2 minutes ago",
      bgColor: "bg-gradient-to-br from-indigo-100 to-blue-100",
      iconColor: "text-indigo-600"
    },
    {
      icon: CheckCircle2,
      text: "You completed 'Garden Cleanup'",
      time: "1 hour ago",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-600"
    },
    {
      icon: DollarSign,
      text: "Payment received: $120",
      time: "Yesterday",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-600"
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
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Garden Cleanup",
      location: "Suburb",
      status: "In Progress",
      price: "$120",
      button1: "Track",
      button2: "Chat",
      gradient: "from-purple-500 to-pink-600"
    },
  ];

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: List, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: CheckSquare, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: Mail, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: Laptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:flex flex-col text-white flex-shrink-0 fixed top-0 left-0 h-screen shadow-2xl z-30 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700"
        style={{ width: "330px" }}
      >
        <div className="px-8 pt-12 pb-8">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">HireHelper</h1>
          <p className="text-lg text-blue-100">Welcome back, John</p>
        </div>

        <div className="w-full h-px bg-white/20"></div>

        <nav className="flex-1 pt-8 px-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`px-6 py-4 rounded-xl cursor-pointer flex items-center gap-4 transition-all duration-200 ${
                activeNav === item.id
                  ? 'bg-white/25 shadow-lg backdrop-blur-sm'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
              }}
            >
              <item.icon size={24} />
              <span className={`text-xl ${activeNav === item.id ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col" style={{ marginLeft: "0px" }}>
        {/* Header - Desktop */}
        <header
          className="hidden lg:flex items-center justify-between text-white px-12 py-5 shadow-lg sticky top-0 z-40 bg-gradient-to-r from-indigo-600 to-blue-600"
          style={{ marginLeft: "330px" }}
        >
          <div className="flex-1 max-w-xl relative">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-14 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-md transition-all"
            />
          </div>
          <div className="flex items-center gap-4 ml-8">
            <button className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 transform hover:scale-110">
              <Bell size={28} />
            </button>
            <button className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 transform hover:scale-110">
              <User size={28} />
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header
          className="lg:hidden text-white p-5 shadow-xl rounded-b-3xl sticky top-0 z-40 bg-gradient-to-br from-indigo-600 to-blue-600"
        >
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Bell size={24} />
            </button>
          </div>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none shadow-md"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <section
          className="flex-1 p-6 lg:p-10 overflow-y-auto pb-28 lg:pb-10"
          style={{ marginLeft: "330px" }}
        >
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-lg text-gray-600">
              Here's what's happening with your tasks today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-md`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-4 text-white rounded-2xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => navigate("/posttask")}
              >
                Post New Task
              </button>
              <button
                className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl font-semibold hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => navigate("/feedPage")}
              >
                Browse Tasks
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 rounded-2xl font-semibold hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-200">
                View Earnings
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
                <button
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                    <div
                      className={`${activity.bgColor} rounded-xl p-3 flex-shrink-0 shadow-md`}
                    >
                      <activity.icon size={24} className={activity.iconColor} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm lg:text-base text-gray-800 font-semibold mb-1">
                        {activity.text}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Active Tasks */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Active Tasks</h3>
              <div className="space-y-4">
                {activeTasks.map((task, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-5 hover:border-indigo-300 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <p>{task.location}</p>
                          <span className="text-gray-400">•</span>
                          <p className="font-medium text-indigo-600">
                            {task.requests || task.status}
                          </p>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-xl text-base font-bold shadow-md">
                        {task.price}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className={`flex-1 text-white py-3 rounded-xl font-semibold bg-gradient-to-r ${task.gradient} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                      >
                        {task.button1}
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300">
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
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <LayoutDashboard size={26} className="text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <Home size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Home</span>
            </button>

            <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 shadow-2xl transition-all duration-200 hover:scale-110">
              <PlusCircle size={36} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <Mail size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Request</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <MoreHorizontal size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
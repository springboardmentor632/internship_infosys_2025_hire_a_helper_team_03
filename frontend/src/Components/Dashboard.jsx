import React from "react";
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
} from "lucide-react";

export default function Dashboard() {

  const navigate = useNavigate();

  const stats = [
    { label: "Tasks Completed", value: "23", color: "#3B82F6" },
    { label: "Active Tasks", value: "5", color: "#10B981" },
    { label: "Total Earnings", value: "$1,240", color: "#8B5CF6" },
    { label: "Average Rating", value: "4.8", color: "#EF4444" },
  ];

  const recentActivity = [
    {
      icon: UserCircle,
      text: "John requested your 'Fix Kitchen Sink' task",
      time: "2 minutes ago",
      bgColor: "bg-gray-200",
    },
    {
      icon: CheckCircle2,
      text: "You completed 'Garden Cleanup'",
      time: "1 hour ago",
      bgColor: "bg-purple-200",
    },
    {
      icon: DollarSign,
      text: "Payment received : $",
      time: "Yesterday",
      bgColor: "bg-blue-200",
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
    },
    {
      title: "Garden Cleanup",
      location: "Suburb",
      status: "In Progress",
      price: "$120",
      button1: "Track",
      button2: "Chat",
    },
  ];

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen"
      style={{ backgroundColor: "rgba(231, 231, 231, 0.33)" }}
    >
      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:flex flex-col w-80 text-white flex-shrink-0"
        style={{ backgroundColor: "#5B86FF" }}
      >
        <div className="px-7 pt-11 pb-8">
          <h1 className="text-4xl font-bold mb-4">HireHelper</h1>
          <p className="text-xl">Welcome back , John</p>
        </div>

        <div className="w-full h-px bg-white"></div>

        <nav className="flex-1 pt-10 px-2">
          <div
            className="px-6 py-3 mb-1 rounded cursor-pointer flex items-center gap-4"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.4)" }}
            onClick={() => navigate("/")}
          >
            <LayoutDashboard size={24} />
            <span className="text-2xl font-bold">Dashboard</span>
          </div>
          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/feedPage")}
          >
            <List size={24} />
            <span className="text-2xl">Feed</span>
          </div>
          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/mytasks")}
          >
            <CheckSquare size={24} />
            <span className="text-2xl">My Tasks</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Mail size={24} />
            <span className="text-2xl">Requests</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Laptop size={24} />
            <span className="text-2xl">My Requests</span>
          </div>
          <div className="px-6 py-4 mt-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Settings size={24} />
            <span className="text-2xl">Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header - Desktop */}
        <header
          className="hidden lg:flex items-center justify-between text-white px-14 py-6"
          style={{ backgroundColor: "#5B86FF" }}
        >
          <div className="flex-1 max-w-lg relative">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-14 pr-4 py-2 rounded-lg text-gray-600 text-xs focus:outline-none shadow-md"
            />
          </div>
          <div className="flex items-center gap-6 ml-12">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <Bell size={40} />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <User size={40} />
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header
          className="lg:hidden text-white p-4 shadow-lg"
          style={{ backgroundColor: "#5B86FF", borderRadius: "0 0 30px 30px" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button className="p-2">
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <button className="p-2">
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
              placeholder="Search.."
              className="w-full pl-12 pr-4 py-2 rounded-lg text-gray-600 focus:outline-none text-sm shadow-md"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="flex-1 p-4 lg:pt-8 lg:px-12 overflow-y-auto pb-24 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Dashboard</h2>
            <p className="text-sm lg:text-base text-gray-700">
              Here's what's happening with your tasks today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow p-5">
                <div
                  className="w-full h-1 rounded-full mb-4"
                  style={{ backgroundColor: stat.color }}
                ></div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm lg:text-base text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-3 text-white rounded-xl font-bold hover:opacity-90 transition"
                style={{ backgroundColor: "#2B5CE6" }} onClick={() => navigate("/posttask")}
              >
                Post New Task
              </button>
              <button className="px-8 py-3 bg-gray-300 text-gray-800 rounded-xl font-bold hover:opacity-90 transition" onClick={() => navigate("/feedPage")}>
                Browse Tasks
              </button>
              <button className="px-8 py-3 bg-white text-gray-800 rounded-xl font-bold hover:bg-gray-100 transition shadow">
                View Earnings
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Recent Activity</h3>
                <button
                  className="font-medium text-sm hover:underline"
                  style={{ color: "#2B5CE6" }}
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div
                      className={`${activity.bgColor} rounded-lg p-3 flex-shrink-0`}
                    >
                      <activity.icon size={24} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm lg:text-base text-gray-800 font-medium">
                        {activity.text}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Active Tasks */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-2xl font-bold mb-6">Your Active Tasks</h3>
              <div className="space-y-4">
                {activeTasks.map((task, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">
                            {task.location}
                          </p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">
                            {task.requests || task.status}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        {task.price}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                        style={{ backgroundColor: "#2B5CE6" }}
                      >
                        {task.button1}
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:opacity-90 transition">
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
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 shadow-lg">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1">
              <LayoutDashboard size={28} style={{ color: "#2B5CE6" }} />
              <span className="text-xs font-bold" style={{ color: "#2B5CE6" }}>
                Dashboard
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <Home size={28} className="text-gray-600" />
              <span className="text-xs text-gray-600">Home</span>
            </button>

            <button
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#2B5CE6" }}
            >
              <PlusCircle size={36} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1">
              <Mail size={28} className="text-gray-600" />
              <span className="text-xs text-gray-600">Request</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <MoreHorizontal size={28} className="text-gray-600" />
              <span className="text-xs text-gray-600">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}

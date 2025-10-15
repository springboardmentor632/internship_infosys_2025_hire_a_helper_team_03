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
} from "lucide-react";

export default function MyTask() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('mytasks');
  const [activeFilter, setActiveFilter] = useState('active');

  const tasks = [
    {
      title: "Fix Kitchen Sink",
      status: "Active",
      requests: 3,
      price: "$75",
      button1: "View",
      button2: "Edit",
      statusColor: "from-blue-500 to-blue-600",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Garden Cleanup",
      status: "In Progress",
      requests: 0,
      price: "$120",
      button1: "Track",
      button2: "Chat",
      statusColor: "from-green-500 to-emerald-600",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Move Furniture",
      status: "Completed",
      requests: "-",
      price: "$150",
      button1: "Review",
      button2: "Again",
      statusColor: "from-gray-500 to-gray-600",
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

  const filters = [
    { id: 'all', label: 'All Tasks', count: 23 },
    { id: 'active', label: 'Active', count: 5 },
    { id: 'completed', label: 'Completed', count: 18 },
    { id: 'drafts', label: 'Drafts', count: 2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col text-white flex-shrink-0 fixed top-0 left-0 h-screen w-80 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 shadow-2xl z-30">
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
      <main className="flex-1 flex flex-col lg:ml-80">
        {/* Header - Desktop */}
        <header className="hidden lg:flex items-center justify-between text-white px-12 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg sticky top-0 z-40">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
        <header className="lg:hidden text-white p-5 shadow-xl bg-gradient-to-br from-indigo-600 to-blue-600 rounded-b-3xl sticky top-0 z-40">
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none shadow-md"
            />
          </div>
        </header>

        {/* Tasks Section */}
        <section className="flex-1 p-6 lg:p-10 overflow-y-auto pb-28 lg:pb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h2>
              <p className="text-lg text-gray-600">Manage all your posted tasks</p>
            </div>
            <button
              onClick={() => navigate("/posttask")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Post New Task
            </button>
          </div>

          {/* Task Filters */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`text-center transition-all duration-200 pb-2 ${
                  activeFilter === filter.id
                    ? 'border-b-4 border-indigo-600'
                    : 'hover:opacity-70'
                }`}
              >
                <p className={`font-bold text-lg ${activeFilter === filter.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                  {filter.label}
                </p>
                <p className="text-gray-600 text-sm">({filter.count})</p>
              </button>
            ))}
          </div>

          {/* Task Cards - Mobile Friendly */}
          <div className="space-y-6 lg:hidden">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${task.statusColor} shadow-md`}>
                      {task.status}
                    </span>
                  </div>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-xl text-lg font-bold shadow-md">
                    {task.price}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Requests:</span> {task.requests}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className={`flex-1 text-white py-3 rounded-xl font-semibold bg-gradient-to-r ${task.gradient} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
                    {task.button1}
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300">
                    {task.button2}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Task Table - Desktop */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr className="text-gray-700">
                    <th className="py-5 px-6 text-left font-bold text-sm">Task Title</th>
                    <th className="py-5 px-6 text-center font-bold text-sm">Status</th>
                    <th className="py-5 px-6 text-center font-bold text-sm">Requests</th>
                    <th className="py-5 px-6 text-center font-bold text-sm">Price</th>
                    <th className="py-5 px-6 text-center font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200">
                      <td className="py-5 px-6 font-bold text-lg text-gray-900">{task.title}</td>
                      <td className="py-5 px-6 text-center">
                        <span className={`inline-block px-4 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${task.statusColor} shadow-md`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center text-gray-700 font-semibold">{task.requests}</td>
                      <td className="py-5 px-6 text-center">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-xl font-bold shadow-md inline-block">
                          {task.price}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-center gap-3">
                          <button className={`px-6 py-2.5 text-white rounded-xl font-semibold bg-gradient-to-r ${task.gradient} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
                            {task.button1}
                          </button>
                          <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300">
                            {task.button2}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110" onClick={() => navigate('/dashboard')}>
              <LayoutDashboard size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110" onClick={() => navigate('/')}>
              <Home size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Home</span>
            </button>

            <button
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 shadow-2xl transition-all duration-200 hover:scale-110"
              onClick={() => navigate("/posttask")}
            >
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
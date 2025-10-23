import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle } from "react-icons/fa6";
import { FaSearch, FaBell, FaUser, FaHome, FaPlusCircle, FaEllipsisH, FaEnvelope } from "react-icons/fa";
import { MdDashboard, MdList, MdCheckBox, MdSettings, MdLaptop } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

export default function MyTask() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('mytasks');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/tasks/mytasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const navItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: MdList, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: MdCheckBox, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: FaEnvelope, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: MdLaptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: MdSettings, label: 'Settings', path: '/settings' },
  ];

  const filters = [
    { id: 'all', label: 'All Tasks', count: 23 },
    { id: 'active', label: 'Active', count: 5 },
    { id: 'completed', label: 'Completed', count: 18 },
    { id: 'drafts', label: 'Drafts', count: 2 },
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
          {sidebarCollapsed ? <IoIosArrowForward size={16} /> : <IoIosArrowBack size={16} />}
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

        {/* My Tasks Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title and Post Task Button */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Tasks</h2>
              <p className="text-sm md:text-base text-gray-600">Manage all your posted tasks</p>
            </div>
            <button
              onClick={() => navigate("/posttask")}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaPlusCircle size={20} />
              Post New Task
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`text-center transition-all duration-200 pb-2 ${
                  activeFilter === filter.id
                    ? 'border-b-4 border-sky-600 text-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <p className={`font-bold text-lg ${activeFilter === filter.id ? 'text-sky-600' : 'text-gray-800'}`}>
                  {filter.label}
                </p>
                <p className="text-gray-600 text-sm">({filter.count})</p>
              </button>
            ))}
          </div>

          {/* Task Cards - Mobile */}
          <div className="lg:hidden space-y-6">
            {tasks.map((task, index) => (
              <div
                key={task._id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {task.budget ? `$${task.budget}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600">
                    {task.status || 'Active'}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {/* Requests: {task.requests} */}
                  </span>
                </div>
                {task.imageUrl && (
                  <img src={task.imageUrl} alt="Task" className="max-h-32 rounded mb-2" />
                )}
                <div className="flex gap-2">
                  <button
                    className="flex-1 text-white text-sm font-semibold py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:shadow-lg transition-all"
                  >
                    View
                  </button>
                  <button className="flex-1 bg-white text-gray-700 text-sm font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Task Table - Desktop */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr className="text-gray-700">
                    <th className="py-4 px-6 text-left font-bold text-lg">Task Title</th>
                    <th className="py-4 px-6 text-center font-bold text-lg">Status</th>
                    <th className="py-4 px-6 text-center font-bold text-lg">Requests</th>
                    <th className="py-4 px-6 text-center font-bold text-lg">Price</th>
                    <th className="py-4 px-6 text-center font-bold text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id || index} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200">
                      <td className="py-5 px-6 font-bold text-lg text-gray-900">{task.title}</td>
                      <td className="py-5 px-6 text-center">
                        <span className="inline-block px-4 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                          {task.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center text-gray-700 font-semibold text-lg">-</td>
                      <td className="py-5 px-6 text-center">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 rounded-xl font-bold shadow-md inline-block text-lg">
                          {task.budget ? `$${task.budget}` : 'N/A'}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-center gap-3">
                          <button className="px-6 py-2.5 text-white rounded-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            View
                          </button>
                          <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300">
                            Edit
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

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
            >
              <MdDashboard size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaHome size={24} className="text-sky-600" />
              <span className="text-xs font-bold text-sky-600">Home</span>
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
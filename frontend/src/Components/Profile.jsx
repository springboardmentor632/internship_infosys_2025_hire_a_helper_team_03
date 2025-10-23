import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBell, 
  FaHome, 
  FaPlusCircle, 
  FaEllipsisH, 
  FaEnvelope,
  FaStar,
  FaCheckCircle,
  FaThumbsUp,
  FaList,
  FaCog,
  FaLaptop,
  FaCheckSquare
} from "react-icons/fa";
import { 
  MdDashboard, 
  MdSettings, 
  MdEmail,
  MdPerson
} from "react-icons/md";

export default function Profile() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userData = {
    name: "Emily Chen",
    email: "emilychen@gmail.com",
    rating: "4.2",
    tasksCompleted: "156",
    recommendationRate: "96",
    bio: "Professional helper with expertise in multiple services...",
    stats: [
      { value: "4.2", label: "Rating" },
      { value: "156", label: "Task Completed" },
      { value: "96%", label: "Recommended" }
    ]
  };

  const navItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: FaList, label: 'Feed', path: '/feed' },
    { id: 'mytasks', icon: FaCheckSquare, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: MdEmail, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: FaLaptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: MdSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex-shrink-0">
          {/* Logo */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <div className="text-white font-bold text-lg">H</div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">Helper</span>
                <span className="text-lg font-semibold">Hub</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white bg-opacity-30 mx-auto mb-4"></div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeNav === item.id
                    ? "bg-white bg-opacity-20 shadow-lg"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={() => {
                  setActiveNav(item.id);
                  navigate(item.path);
                }}
              >
                <item.icon size={20} />
                <span className="text-lg font-medium">{item.label}</span>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white border-opacity-30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                EC
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{userData.name}</p>
                <p className="text-xs text-white text-opacity-80 truncate">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaList size={20} className="text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell size={20} className="text-gray-600" />
              </button>
            </div>
          </header>

          {/* Profile Content */}
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {/* Main Profile Card */}
              <div className="bg-blue-50 bg-opacity-50 rounded-2xl p-8 mb-8 border border-blue-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 mb-6 overflow-hidden border-4 border-white shadow-xl">
                      <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                        <MdPerson className="text-blue-500 text-8xl" />
                      </div>
                    </div>
                  </div>

                  {/* Profile Info Section */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      {/* Name and Email */}
                      <div className="mb-8">
                        <h1 className="text-4xl font-bold text-blue-800 mb-2">
                          {userData.name}
                        </h1>
                        <p className="text-xl font-semibold text-blue-600">
                          {userData.email}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {userData.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {stat.value}
                            </div>
                            <div className="text-lg text-gray-600 font-medium">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bio Section */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">Bio:</h3>
                        <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                          {userData.bio}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
                          <span className="text-lg">Edit profile</span>
                        </button>
                        <button className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
                          <span className="text-lg">Follow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl z-50">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1 p-2 transition-all"
          >
            <MdDashboard size={24} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500">Dashboard</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 transition-all">
            <FaHome size={24} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 transition-all">
            <FaPlusCircle size={32} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Add</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 transition-all">
            <FaEnvelope size={24} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500">Inbox</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 transition-all">
            <MdPerson size={24} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Profile</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-64 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sidebar Content */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold">H</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">Helper</span>
                  <span className="text-sm font-semibold">Hub</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
              >
                ×
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
                    activeNav === item.id ? "bg-white bg-opacity-20" : ""
                  }`}
                  onClick={() => {
                    setActiveNav(item.id);
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
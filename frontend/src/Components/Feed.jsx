import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaBell, FaUser, FaHome, FaPlusCircle, FaEllipsisH, FaEnvelope, FaMapMarkerAlt, FaStar, FaClock, FaHeart } from "react-icons/fa";
import { MdDashboard, MdList, MdCheckBox, MdSettings, MdLaptop } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { FaHandshakeAngle } from "react-icons/fa6";

export default function Feed() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([
    false, false, false, false, false, false
  ]);
  const [activeNav, setActiveNav] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const tasks = [
    {
      title: "Fix Leaky Faucet",
      category: "Plumbing",
      distance: "2.3 miles",
      time: "Today",
      rating: "4.9",
      reviews: "23",
      price: "$65",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop",
    },
    {
      title: "Move Apartment",
      category: "Moving",
      distance: "3.1 miles",
      time: "This Weekend",
      rating: "4.7",
      reviews: "13",
      price: "$150",
      image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=200&fit=crop",
    },
    {
      title: "Lawn Mowing Service",
      category: "Gardening",
      distance: "1.8 miles",
      time: "Today",
      rating: "4.8",
      reviews: "31",
      price: "$45",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop",
    },
    {
      title: "House Cleaning",
      category: "Cleaning",
      distance: "2.7 miles",
      time: "Tomorrow",
      rating: "5.0",
      reviews: "18",
      price: "$80",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
    },
    {
      title: "Furniture Assembly",
      category: "Handyman",
      distance: "4.2 miles",
      time: "This Weekend",
      rating: "4.6",
      reviews: "27",
      price: "$55",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop",
    },
    {
      title: "Paint Living Room",
      category: "Painting",
      distance: "2.5 miles",
      time: "Today",
      rating: "4.9",
      reviews: "42",
      price: "$120",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop",
    },
  ];

  const navItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: MdList, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: MdCheckBox, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: FaEnvelope, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: MdLaptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: MdSettings, label: 'Settings', path: '/settings' },
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

        {/* Feed Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Feed
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Find tasks that match your skills in your area
            </p>
          </div>

          {/* Filter Bar - Simplified */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200">
              <span className="text-sm font-medium text-gray-700">Sort By</span>
              <IoIosArrowForward size={14} className="text-gray-500 rotate-90" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200">
              <span className="text-sm font-medium text-gray-700">Categories</span>
              <IoIosArrowForward size={14} className="text-gray-500 rotate-90" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white">
              <FaFilter size={14} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          {/* Task List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                {/* Task Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Task Content */}
                <div className="p-4">
                  {/* Task Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      <span className="inline-block px-3 py-1 text-white text-sm font-semibold rounded-full bg-[#0c73c2]">
                        {task.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2 ${
                        favorites[index] 
                          ? 'bg-red-500' 
                          : 'bg-white'
                      }`}
                    >
                      <FaHeart
                        size={16}
                        className={favorites[index] ? "text-white" : "text-red-500"}
                      />
                    </button>
                  </div>

                  {/* Task Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaMapMarkerAlt size={16} className="text-sky-600" />
                      <span className="text-sm">{task.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaClock size={16} className="text-sky-600" />
                      <span className="text-sm">{task.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaStar size={16} className="text-yellow-400" fill="#fbbf24" />
                      <span className="text-sm font-semibold">{task.rating}</span>
                      <span className="text-sm text-gray-600">({task.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Price and Action Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="px-2 py-1 text-sm font-bold text-green-700 bg-green-100 rounded">
                      {task.price}
                    </span>
                    <button className="px-4 py-2 text-white font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-sm">
                      Request Task
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Menu,
  Bell,
  User,
  Home,
  PlusCircle,
  MoreHorizontal,
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Heart,
  MapPin,
  Star,
  Clock,
} from "lucide-react";

export default function Feed() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([
    false, false, false, false, false, false
  ]);

  const [activeNav, setActiveNav] = useState('feed');

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
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop",
    },
    {
      title: "Move Apartment",
      category: "Moving",
      distance: "3.1 miles",
      time: "This Weekend",
      rating: "4.7",
      reviews: "13",
      price: "$150",
      image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=300&fit=crop",
    },
    {
      title: "Lawn Mowing Service",
      category: "Gardening",
      distance: "1.8 miles",
      time: "Today",
      rating: "4.8",
      reviews: "31",
      price: "$45",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=300&fit=crop",
    },
    {
      title: "House Cleaning",
      category: "Cleaning",
      distance: "2.7 miles",
      time: "Tomorrow",
      rating: "5.0",
      reviews: "18",
      price: "$80",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=300&fit=crop",
    },
    {
      title: "Furniture Assembly",
      category: "Handyman",
      distance: "4.2 miles",
      time: "This Weekend",
      rating: "4.6",
      reviews: "27",
      price: "$55",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=300&fit=crop",
    },
    {
      title: "Paint Living Room",
      category: "Painting",
      distance: "2.5 miles",
      time: "Today",
      rating: "4.9",
      reviews: "42",
      price: "$120",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop",
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

        {/* Feed Content */}
        <section className="flex-1 p-6 lg:p-10 overflow-y-auto pb-28 lg:pb-10">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Task Feed</h2>
            <p className="text-lg text-gray-600">Find tasks that match your skills in your area</p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all"
              />
            </div>
            <select className="px-6 py-4 text-lg text-gray-700 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer transition-all">
              <option>All Categories</option>
              <option>Home Repairs</option>
              <option>Moving & Delivery</option>
              <option>Gardening</option>
              <option>Cleaning</option>
              <option>Handyman</option>
            </select>
            <button className="flex items-center justify-center gap-3 px-8 py-4 text-white font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <Filter size={22} strokeWidth={2.5} />
              <span className="text-lg">Filters</span>
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-5 p-6">
                  {/* Task Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full md:w-40 h-48 object-cover rounded-2xl shadow-md"
                    />
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-4 py-1.5 text-white text-sm font-semibold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md">
                            {task.category}
                          </span>
                          <span className="px-4 py-1.5 text-gray-900 text-lg font-bold rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 shadow-md">
                            {task.price}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(index)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-3 transform hover:scale-110 ${
                          favorites[index] 
                            ? 'bg-red-500 shadow-lg' 
                            : 'bg-red-50 border-2 border-red-300 hover:border-red-400'
                        }`}
                      >
                        <Heart
                          size={22}
                          fill={favorites[index] ? "#fff" : "none"}
                          className={favorites[index] ? "text-white" : "text-red-500"}
                        />
                      </button>
                    </div>

                    {/* Location and Time */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-indigo-600" />
                        <span className="text-base">{task.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-indigo-600" />
                        <span className="text-base">{task.time}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={20} className="text-yellow-400" fill="#fbbf24" />
                      <span className="text-base font-semibold text-gray-900">{task.rating}</span>
                      <span className="text-base text-gray-600">({task.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  <button className="w-full py-4 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                    Request Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <LayoutDashboard size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
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
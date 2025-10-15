import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  Bell,
  User,
  PlusCircle,
  MoreHorizontal,
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Home,
  Clock,
  MapPin,
  DollarSign,
  MessageCircle,
  Eye,
  UserCircle,
  Star,
  Wrench,
  Flower,
  Sofa,
} from "lucide-react";

export default function MyRequest() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('myrequests');
  const [activeFilter, setActiveFilter] = useState('all');

  const myRequests = [
    {
      id: 1,
      task: "Fix Kitchen Sink",
      owner: "John Davis",
      rating: 4.3,
      price: "$75",
      time: "2 hours ago",
      status: "pending",
      description: "Need help fixing a leaky kitchen sink",
      location: "Downtown",
      icon: <Wrench className="text-blue-600" size={20} />,
      details: "Promotion + $75 • Start 2 hours ago"
    },
    {
      id: 2,
      task: "Garden Cleaning",
      owner: "Lisa Wilson",
      rating: 4.3,
      price: "$125",
      time: "1 day ago",
      status: "accepted",
      description: "Garden cleanup and maintenance",
      location: "Suburb Area",
      icon: <Flower className="text-green-600" size={20} />,
      details: "$125 • Start - December 30"
    },
    {
      id: 3,
      task: "Move Furniture",
      owner: "Mike Chen",
      rating: 4.8,
      price: "$250",
      time: "3 days ago",
      status: "accepted",
      description: "Help moving furniture to new apartment",
      location: "City Center",
      icon: <Sofa className="text-purple-600" size={20} />,
      details: "$250 • Start - April 5 • Quick Service"
    },
    {
      id: 4,
      task: "Paint Living Room",
      owner: "Sarah Johnson",
      rating: 4.5,
      price: "$180",
      time: "5 days ago",
      status: "declined",
      description: "Painting living room walls",
      location: "West District",
      icon: <UserCircle className="text-orange-600" size={20} />,
      details: "$180 • Start - Next week"
    }
  ];

  const filters = [
    { key: 'all', label: 'All', count: 8 },
    { key: 'pending', label: 'Pending', count: 3 },
    { key: 'accepted', label: 'Accepted', count: 4 },
    { key: 'declined', label: 'Declined', count: 1 }
  ];

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: List, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: CheckSquare, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: Mail, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: Laptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'declined': return 'Declined';
      default: return status;
    }
  };

  const filteredRequests = activeFilter === 'all' 
    ? myRequests 
    : myRequests.filter(request => request.status === activeFilter);

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
              placeholder="Search my requests..."
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

        {/* Content */}
        <section
          className="flex-1 p-6 lg:p-10 overflow-y-auto pb-28 lg:pb-10"
          style={{ marginLeft: "330px" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">My Requests</h2>
              <p className="text-lg text-gray-600">
                Track your requests to help others
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* My Requests List */}
            <div className="space-y-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Request Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {request.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">{request.task}</h4>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </div>
                        
                        {/* Owner and Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-semibold text-gray-700">Owner:</span>
                          <span className="text-lg text-gray-900">{request.owner}</span>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                            <Star className="text-amber-500" size={14} />
                            <span className="text-sm font-semibold text-amber-700">{request.rating}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mb-4">
                          <div className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
                            <p className="text-gray-700 font-medium">{request.details}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-green-500" />
                              <span className="font-semibold">{request.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-indigo-500" />
                              <span>{request.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-red-500" />
                              <span>{request.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm bg-blue-50 rounded-xl p-3 border border-blue-200">
                          {request.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                        <Eye size={20} />
                        View Details
                      </button>
                      <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300 transform hover:scale-105 flex items-center gap-2">
                        <MessageCircle size={20} />
                        Message Owner
                      </button>
                      {request.status === 'accepted' && (
                        <button className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all duration-200 border border-green-300 transform hover:scale-105">
                          Start Task
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Compact Requests */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Requests</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myRequests.slice(0, 2).map((request, index) => (
                  <div key={`compact-${index}`} className="bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          {request.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{request.task}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Owner:</span> {request.owner} • ⭐ {request.rating}
                        </p>
                        <p className="text-sm font-medium text-gray-800 mb-2">{request.details}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{request.price}</span>
                          <span>•</span>
                          <span>{request.time}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-all">
                            View Details
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all border border-gray-300">
                            Message
                          </button>
                        </div>
                      </div>
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
            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/feedPage")}
            >
              <Home size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Home</span>
            </button>

            <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 shadow-2xl transition-all duration-200 hover:scale-110">
              <PlusCircle size={36} className="text-white" />
            </button>

            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/mytasks")}
            >
              <CheckSquare size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">My Tasks</span>
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
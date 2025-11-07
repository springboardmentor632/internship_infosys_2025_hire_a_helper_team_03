import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import TaskCard from "../Components/TaskCard";
import { API_ENDPOINTS, apiCall } from "../config/api";

export default function RequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("requests");
  const [favorites, setFavorites] = useState([false, false, false]);

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const res = await apiCall(API_ENDPOINTS.REQUESTS_OWNER);
      const incoming = res.requests || [];
      // Transform to UI format
      setRequests(incoming.map(r => ({
        id: r._id,
        name: r.requester ? `${r.requester.firstName || ''} ${r.requester.lastName || ''}`.trim() : 'Unknown',
        initials: r.requester ? `${(r.requester.firstName||'').charAt(0)}${(r.requester.lastName||'').charAt(0)}` : 'U',
        color: '#3B82F6',
        rating: 4.8,
        reviews: 23,
        distance: 3,
        appliedFor: r.task ? r.task.title : 'Task',
        description: r.task ? r.task.description : '',
        price: r.task && r.task.budget ? r.task.budget : 0,
        experience: '—',
        time: new Date(r.createdAt).toLocaleString(),
        status: r.status,
        _id: r._id,
      })));
    } catch (err) {
      console.error('Failed to load requests', err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Calculate tab counts dynamically
  const tabs = [
    { name: 'All', count: requests.length },
    { name: 'New', count: requests.filter(r => r.status === 'pending').length },
    { name: 'Reviewed', count: requests.filter(r => r.status !== 'pending').length },
    { name: 'Accepted', count: requests.filter(r => r.status === 'accepted').length },
    { name: 'Declined', count: requests.filter(r => r.status === 'declined').length }
  ];

  // Filter requests based on active tab
  const filteredRequests = activeTab === 'All' ? requests :
    activeTab === 'New' ? requests.filter(r => r.status === 'pending') :
    activeTab === 'Reviewed' ? requests.filter(r => r.status !== 'pending') :
    activeTab === 'Accepted' ? requests.filter(r => r.status === 'accepted') :
    activeTab === 'Declined' ? requests.filter(r => r.status === 'declined') : requests;

  const relatedTasks = [
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
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

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
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Requests</h2>
            <p className="text-sm md:text-lg text-gray-600">Review Helpers who want to work on your tasks</p>
          </div>
          <div className="flex items-center gap-4 md:gap-8 border-b border-gray-300 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-4 px-2 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.name ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  <div className="flex gap-4 flex-1 w-full">
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
                      style={{ background: request.color }}
                    >
                      {request.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{request.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <FaStar size={16} className="text-yellow-500" />
                          <span className="font-medium text-sm md:text-base">{request.rating}</span>
                          <span className="text-gray-600 text-xs md:text-sm">({request.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <FaMapMarkerAlt size={14} />
                          <span className="text-xs md:text-sm">{request.distance} miles</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="text-sm md:text-base text-gray-700">Applied for: </span>
                        <button onClick={() => navigate('/task-details')} className="text-sky-600 hover:underline font-medium text-sm md:text-base">
                          {request.appliedFor}
                        </button>
                      </div>
                      <p className="text-sm md:text-base text-gray-700 mb-4 italic">"{request.description}"</p>

                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                        <span className="font-semibold text-sky-600">${request.price}</span>
                        <span>• {request.experience}</span>
                        <span>• {request.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-col items-center gap-2 md:gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap"
                      onClick={async () => {
                        try {
                          await apiCall(API_ENDPOINTS.REQUESTS_UPDATE(request._id), { method: 'PATCH', body: JSON.stringify({ status: 'accepted' }) });
                          alert('Request accepted');
                          loadRequests();
                        } catch (err) { alert(err.message || 'Failed'); }
                      }}
                    >
                      Accept
                    </button>
                    <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap"
                      onClick={async () => {
                        try {
                          await apiCall(API_ENDPOINTS.REQUESTS_UPDATE(request._id), { method: 'PATCH', body: JSON.stringify({ status: 'declined' }) });
                          alert('Request declined');
                          loadRequests();
                        } catch (err) { alert(err.message || 'Failed'); }
                      }}
                    >
                      Decline
                    </button>
                    <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Your Active Tasks</h3>
              <p className="text-sm md:text-base text-gray-600">Tasks awaiting responses from helpers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTasks.map((task, index) => (
                <TaskCard 
                  key={index} 
                  task={task} 
                  index={index} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              ))}
            </div>
          </div>
        </section>
        <BottomNav navigate={navigate} activeTab="requests" />
      </main>
    </div>
  );
}
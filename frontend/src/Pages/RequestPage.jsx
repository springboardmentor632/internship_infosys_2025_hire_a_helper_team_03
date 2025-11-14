import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import ProfileCard from "../Components/ProfileCard";
import { API_ENDPOINTS, apiCall } from "../config/api";
import { useAlert } from "../Components/AlertContainer";

export default function RequestsPage() {
  const { showSuccess, showError, showWarning, showInfo } = useAlert();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("requests");
  const [selectedProfile, setSelectedProfile] = useState(null);


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
        requester: r.requester, // Preserve the full requester object for ProfileCard
      })));
    } catch (err) {
      console.error('Failed to load requests', err);
      showError('Failed to load requests. Please try again.');
    }
  };

  useEffect(() => {
    loadRequests();
    loadActiveTasks();
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

  const [activeTasks, setActiveTasks] = useState([]);
  
  const loadActiveTasks = async () => {
    try {
      // Fetch tasks from MyTask endpoint
      const response = await apiCall(API_ENDPOINTS.TASKS_MY);
      const tasks = response.tasks || [];
      
      // Filter tasks that are active (published) and have open requests
      const activeTasks = tasks
        .filter(task => {
          // Check if task is published and not completed
          const isActive = task.status === 'published' && task.status !== 'completed';
          // Check if task has any pending requests
          const hasPendingRequests = task.requests && task.requests.some(req => req.status === 'pending');
          return isActive && hasPendingRequests;
        })
        .map(task => ({
          id: task._id,
          title: task.title,
          category: task.category || 'General',
          location: task.location || 'Remote',
          startDate: task.startDate || task.createdAt,
          startTime: task.startTime,
          urgency: task.urgency || 'medium',
          budget: task.budget ? `${task.budget}` : 'Negotiable',
          description: task.description,
          imageUrl: task.images && task.images[0] ? task.images[0] : undefined,
          user: task.user,
          // Count pending requests
          pendingRequests: task.requests ? task.requests.filter(req => req.status === 'pending').length : 0,
          status: task.status
        }));
      setActiveTasks(activeTasks);
    } catch (err) {
      console.error('Failed to load active tasks:', err);
      showError('Failed to load active tasks. Please try again.');
    }
  };

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
                  <div className="flex lg:flex-col items-center gap-2 md:gap-3 w-full lg:w-48">
                    {request.status === 'pending' ? (
                      <button 
                        className="h-12 w-full px-4 bg-green-600 hover:bg-green-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                        onClick={async () => {
                          try {
                            await apiCall(API_ENDPOINTS.REQUESTS_UPDATE(request._id), { 
                              method: 'PATCH', 
                              body: JSON.stringify({ status: 'accepted' }) 
                            });
                            showSuccess(`Request from ${request.name} accepted successfully!`);
                            loadRequests();
                          } catch (err) { 
                            showError(err.message || 'Failed to accept request');
                          }
                        }}
                      >
                        Accept
                      </button>
                    ) : request.status === 'accepted' ? (
                      <button 
                        disabled
                        className="h-12 w-full px-4 bg-green-100 text-green-700 font-medium text-sm md:text-base rounded-lg whitespace-nowrap flex items-center justify-center cursor-default"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Accepted
                      </button>
                    ) : null}

                    {request.status === 'pending' ? (
                      <button 
                        className="h-12 w-full px-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                        onClick={async () => {
                          try {
                            await apiCall(API_ENDPOINTS.REQUESTS_UPDATE(request._id), { 
                              method: 'PATCH', 
                              body: JSON.stringify({ status: 'declined' }) 
                            });
                            showInfo(`Request from ${request.name} declined.`);
                            loadRequests();
                          } catch (err) { 
                            showError(err.message || 'Failed to decline request');
                          }
                        }}
                      >
                        Decline
                      </button>
                    ) : request.status === 'declined' ? (
                      <button 
                        disabled
                        className="h-12 w-full px-4 bg-red-100 text-red-700 font-medium text-sm md:text-base rounded-lg whitespace-nowrap flex items-center justify-center cursor-default"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Declined
                      </button>
                    ) : null}

                    <button 
                      onClick={() => setSelectedProfile(request.requester)}
                      className="h-12 w-full px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <BottomNav navigate={navigate} activeTab="requests" />
      </main>

      {/* Profile Card Component */}
      <ProfileCard 
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onMessage={(userId) => navigate(`/messages/${userId}`)}
      />
    </div>
  );
}
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
  const [selectedProfile, setSelectedProfile] = useState(null);

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
                            loadRequests();
                          } catch (err) { alert(err.message || 'Failed'); }
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
                            loadRequests();
                          } catch (err) { alert(err.message || 'Failed'); }
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
          <div className="mt-12">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Your Tasks with Pending Requests</h3>
              <p className="text-sm md:text-base text-gray-600">Tasks that have helpers waiting for your response</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTasks.length > 0 ? (
                activeTasks.map((task, index) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    index={index} 
                    favorites={favorites} 
                    toggleFavorite={toggleFavorite}
                    onViewDetails={() => navigate(`/task/${task.id}`)}
                    hasRequested={false}
                  >
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {task.pendingRequests} {task.pendingRequests === 1 ? 'Request' : 'Requests'}
                    </div>
                  </TaskCard>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No tasks with pending requests found</p>
                  <button
                    onClick={() => navigate('/post-new-task')}
                    className="mt-4 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-all"
                  >
                    Post a New Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <BottomNav navigate={navigate} activeTab="requests" />
      </main>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="relative p-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Helper Profile</h3>
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-sky-600 flex items-center justify-center text-white text-2xl font-bold">
                  {`${selectedProfile.firstName?.[0] || ''}${selectedProfile.lastName?.[0] || ''}`}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {`${selectedProfile.firstName || ''} ${selectedProfile.lastName || ''}`}
                  </h4>
                  <p className="text-gray-600">{selectedProfile.email}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 mb-2">Contact Information</h5>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{selectedProfile.email}</span>
                    </div>
                    {selectedProfile.phone && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{selectedProfile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 mb-2">Rating & Reviews</h5>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <FaStar className="w-5 h-5 text-yellow-400" />
                      <span className="ml-1 font-semibold">4.8</span>
                    </div>
                    <span className="text-gray-600">(23 reviews)</span>
                  </div>
                </div>

                {/* Tasks Completed */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 mb-2">Experience</h5>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigate(`/messages/${selectedProfile._id}`);
                    setSelectedProfile(null);
                  }}
                  className="flex-1 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
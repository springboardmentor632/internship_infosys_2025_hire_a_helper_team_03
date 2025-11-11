import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header"; 
import BottomNav from "../Components/BottomNav";
import { API_ENDPOINTS, apiCall } from "../config/api";

export default function MyRequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("myrequests");

  const [allRequests, setAllRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const loadRequests = async () => {
    try {
      const res = await apiCall(API_ENDPOINTS.REQUESTS_ME);
      const reqs = res.requests || [];
      setAllRequests(reqs.map(r => ({ 
        id: r._id, 
        task: r.task ? r.task.title : 'Task',
        taskData: r.task,
        status: r.status, 
        owner: r.owner ? `${r.owner.firstName || ''} ${r.owner.lastName || ''}`.trim() : '', 
        ownerData: r.owner,
        ownerInitials: r.owner ? `${(r.owner.firstName||'').charAt(0)}${(r.owner.lastName||'').charAt(0)}` : 'NA', 
        color: '#3B82F6', 
        rating: 4.3, 
        reviews: 12, 
        distance: 2, 
        price: r.task && r.task.budget ? r.task.budget : '—', 
        description: r.task && r.task.description ? r.task.description : '', 
        time: new Date(r.createdAt).toLocaleString() 
      })));
    } catch (err) {
      console.error('Failed to load my requests', err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleWithdrawRequest = async (requestId) => {
    try {
      const result = await apiCall(`${API_ENDPOINTS.REQUESTS_UPDATE(requestId)}`, {
        method: 'DELETE'
      });
      
      setAllRequests(prev => prev.filter(req => req.id !== requestId));
      alert(result.message || 'Request withdrawn successfully');
    } catch (err) {
      console.error('Error withdrawing request:', err);
      alert(err.message || 'Failed to withdraw request. Please try again.');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const tabs = [
    { name: 'All', count: allRequests.length },
    { name: 'Pending', count: allRequests.filter(r => r.status === 'pending').length },
    { name: 'Accepted', count: allRequests.filter(r => r.status === 'accepted').length },
    { name: 'Declined', count: allRequests.filter(r => r.status === 'declined').length }
  ];

  const filteredRequests = activeTab === 'All' ? allRequests : allRequests.filter(req => req.status.toLowerCase() === activeTab.toLowerCase());

  const getStatusBadge = (status) => {
    const colors = { pending: 'bg-yellow-100 text-yellow-700', accepted: 'bg-green-100 text-green-700', declined: 'bg-red-100 text-red-700' };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Requests</h2>
            <p className="text-sm md:text-lg text-gray-600">Track your applications to help others</p>
          </div>

          <div className="flex items-center gap-4 md:gap-8 border-b border-gray-300 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button 
                key={tab.name} 
                onClick={() => setActiveTab(tab.name)} 
                className={`pb-4 px-2 font-medium transition-all whitespace-nowrap ${activeTab === tab.name ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  <div className="flex gap-4 flex-1 w-full">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0" style={{ background: request.color }}>
                      {request.ownerInitials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{request.task}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>

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
                        <span className="text-sm md:text-base text-gray-700">Task Owner: </span>
                        <span className="text-sky-600 font-medium text-sm md:text-base">{request.owner}</span>
                      </div>

                      <p className="text-sm md:text-base text-gray-700 mb-4 italic">"{request.description}"</p>

                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                        <span className="font-semibold text-sky-600">${request.price}</span>
                        <span>• {request.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-1 grid-cols-3 gap-2 md:gap-3 w-full lg:w-48">
                    <button 
                      onClick={() => handleViewDetails(request)}
                      className="h-12 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => navigate(`/messages/${request.ownerData?._id}`)}
                      className="h-12 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                    >
                      Message Owner
                    </button>
                    {request.status === 'pending' && (
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to withdraw this request?')) {
                            handleWithdrawRequest(request.id);
                          }
                        }}
                        className="h-12 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap flex items-center justify-center"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Details Modal */}
        {showDetails && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRequest.task}</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedRequest.status)}`}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Task Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Description</h3>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{selectedRequest.description || 'No description provided'}</p>
                </div>

                {/* Task Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
                    <p className="text-sm text-sky-600 font-medium mb-1">Budget</p>
                    <p className="text-2xl font-bold text-gray-900">${selectedRequest.price}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium mb-1">Requested On</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRequest.time}</p>
                  </div>
                </div>

                {/* Owner Profile Section */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Task Owner Profile
                  </h3>
                  
                  {/* Owner Basic Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg" style={{ background: selectedRequest.color }}>
                      {selectedRequest.ownerInitials}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{selectedRequest.owner}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FaMapMarkerAlt className="text-sky-600" size={14} />
                        <span className="text-sm text-gray-600">{selectedRequest.distance} miles away</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{selectedRequest.rating}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < Math.floor(selectedRequest.rating) ? "text-yellow-500" : "text-gray-300"} 
                              size={14}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-10 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedRequest.reviews}</p>
                        <p className="text-sm text-gray-600">Reviews</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Skills & Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.ownerData?.skills && selectedRequest.ownerData.skills.length > 0 ? (
                        selectedRequest.ownerData.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-white text-sky-700 rounded-full text-sm font-medium border border-sky-300"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No skills listed</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      navigate(`/messages/${selectedRequest.ownerData?._id}`);
                    }}
                    className="flex-1 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all"
                  >
                    Message Owner
                  </button>
                  {selectedRequest.status === 'pending' && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to withdraw this request?')) {
                          handleWithdrawRequest(selectedRequest.id);
                          setShowDetails(false);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-all"
                    >
                      Withdraw Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <BottomNav navigate={navigate} activeTab="myrequests" />
      </main>
    </div>
  );
}
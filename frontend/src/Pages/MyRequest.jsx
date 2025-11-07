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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiCall(API_ENDPOINTS.REQUESTS_ME);
        const reqs = res.requests || [];
        setAllRequests(reqs.map(r => ({ 
          id: r._id, 
          task: r.task ? r.task.title : 'Task', 
          status: r.status, 
          owner: r.owner ? `${r.owner.firstName || ''} ${r.owner.lastName || ''}`.trim() : '', 
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
    load();
  }, []);

  // Calculate tab counts dynamically
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

                  <div className="flex lg:flex-col items-center gap-2 md:gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap">
                      View Details
                    </button>
                    <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap">
                      Message Owner
                    </button>
                    {request.status === 'pending' && (
                      <button className="flex-1 lg:flex-none px-4 md:px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium text-sm md:text-base rounded-lg transition-all whitespace-nowrap">
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BottomNav navigate={navigate} activeTab="myrequests" />
      </main>
    </div>
  );
}
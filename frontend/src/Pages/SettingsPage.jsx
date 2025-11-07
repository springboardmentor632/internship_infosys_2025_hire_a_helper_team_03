import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaQuestionCircle, FaSignOutAlt, FaCreditCard, FaUser } from "react-icons/fa";
import { IoNotificationsOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("settings");
  const [taskUpdates, setTaskUpdates] = useState(true);
  const [messages, setMessages] = useState(true);
  const [recommendations, setRecommendations] = useState(true);

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    // Dispatch logout event
    window.dispatchEvent(new Event('userLogout'));
    
    // Navigate to home page
    navigate('/', { replace: true });
  };

  const settingsOptions = [
    { icon: FaUser, title: "Profile", description: "Manage Your Personal Information", color: "#3B82F6", path: "/profile" },
    { icon: IoNotificationsOutline, title: "Notifications", description: "Configure Notification Preferences", color: "#8B5CF6", path: "/notifications" },
    { icon: IoShieldCheckmarkOutline, title: "Privacy & Security", description: "Manage Your Security Settings", color: "#10B981", path: "/privacy" },
    { icon: FaCreditCard, title: "Payment Methods", description: "Manage Payment Information", color: "#F59E0B", path: "/payment" }
  ];

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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h2>
            <p className="text-sm md:text-lg text-gray-600">Manage your Account preference and Settings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="space-y-1">
              {settingsOptions.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => navigate(option.path)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${option.color}20` }}>
                      <option.icon size={24} style={{ color: option.color }} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-400 group-hover:text-gray-600 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900">Task Updates</h4>
                  <p className="text-sm text-gray-600">Get notified about task status changes</p>
                </div>
                <button onClick={() => setTaskUpdates(!taskUpdates)} className={`relative w-14 h-7 rounded-full transition-all ${taskUpdates ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-all ${taskUpdates ? 'translate-x-7' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900">Messages</h4>
                  <p className="text-sm text-gray-600">Receive Message Notifications</p>
                </div>
                <button onClick={() => setMessages(!messages)} className={`relative w-14 h-7 rounded-full transition-all ${messages ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-all ${messages ? 'translate-x-7' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Recommendations</h4>
                  <p className="text-sm text-gray-600">Get Helper Recommendation</p>
                </div>
                <button onClick={() => setRecommendations(!recommendations)} className={`relative w-14 h-7 rounded-full transition-all ${recommendations ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-all ${recommendations ? 'translate-x-7' : 'translate-x-0'}`}></span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                  <FaQuestionCircle size={24} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Help & Support</h3>
                </div>
              </div>
              <FaChevronRight className="text-gray-400 group-hover:text-gray-600 transition-all" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 hover:bg-red-50 rounded-xl transition-all text-red-600 font-semibold"
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </button>
          </div>
        </section>

        <BottomNav navigate={navigate} activeTab="settings" />
      </main>
    </div>
  );
}
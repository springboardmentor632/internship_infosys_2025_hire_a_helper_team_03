import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notification count
  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/notifications/unread-count', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  // Force re-render when profile is updated
  const [profileUpdateKey, setProfileUpdateKey] = useState(0);

  // Fetch count on mount and set up polling
  useEffect(() => {
    fetchUnreadCount();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    // Listen for custom events
    window.addEventListener('notificationUpdate', fetchUnreadCount);
    window.addEventListener('profileUpdate', () => setProfileUpdateKey(key => key + 1));

    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationUpdate', fetchUnreadCount);
      window.removeEventListener('profileUpdate', () => setProfileUpdateKey(key => key + 1));
    };
  }, []);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      {/* Header - Desktop */}
      <header className="hidden lg:flex items-center justify-between h-[77px] bg-white border-b-2 border-gray-300 px-8 py-4 shadow-sm sticky top-0 z-40">
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
          {/* Notification Bell with Badge */}
          <button 
            onClick={handleNotificationClick}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <FaBell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={handleProfileClick}
            className="relative w-10 h-10 hover:ring-2 hover:ring-sky-500/30 rounded-full transition-all overflow-hidden"
          >
            {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).profilePicture ? (
              <img 
                src={JSON.parse(localStorage.getItem('user')).profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold">
                {localStorage.getItem('userInitials') || 'U'}
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Header - Mobile */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between px-3 py-3 gap-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center shadow-md">
              <FaHandshakeAngle className="text-white text-xl" />
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-xs mx-2">
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search.."
                className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Side - Notification & Profile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Notification Bell */}
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaBell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Profile Picture */}
            <button 
              onClick={handleProfileClick}
              className="relative w-10 h-10 hover:ring-2 hover:ring-sky-500/30 rounded-full transition-all overflow-hidden"
            >
              {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).profilePicture ? (
                <img 
                  src={JSON.parse(localStorage.getItem('user')).profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {localStorage.getItem('userInitials') || 'U'}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
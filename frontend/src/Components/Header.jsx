import React, { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  // Load user info from localStorage
  const loadUserInfo = () => {
    try {
      const userData = localStorage.getItem("user");
      const userInitials = localStorage.getItem("userInitials");
      
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Header - Loading user info:', user);
        console.log('Header - All user keys:', Object.keys(user));
        console.log('Header - Profile picture:', user.profilePicture);
        console.log('Header - Has profilePicture key?', 'profilePicture' in user);
        setUserInfo({
          profilePicture: user.profilePicture || null,
          initials: userInitials || 'U'
        });
      } else {
        setUserInfo({
          profilePicture: null,
          initials: userInitials || 'U'
        });
      }
    } catch (e) {
      console.error("Error loading user data:", e);
      setUserInfo({
        profilePicture: null,
        initials: 'U'
      });
    }
  };

  // Fetch profile from backend to get the latest profile picture
  const fetchProfileFromBackend = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Header - Fetched profile from backend:', userData);
        
        // Update localStorage with the latest profile picture
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        existingUser.profilePicture = userData.profilePicture;
        localStorage.setItem('user', JSON.stringify(existingUser));
        
        // Update state
        const userInitials = localStorage.getItem("userInitials");
        setUserInfo({
          profilePicture: userData.profilePicture || null,
          initials: userInitials || 'U'
        });
        
        console.log('Header - Updated localStorage with profilePicture:', userData.profilePicture);
      }
    } catch (error) {
      console.error('Header - Error fetching profile:', error);
    }
  };

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

  // Fetch count on mount and set up polling
  useEffect(() => {
    console.log('Header - Component mounted, loading user info');
    loadUserInfo();
    fetchUnreadCount();
    
    // Fetch profile from backend to ensure we have the latest profile picture
    fetchProfileFromBackend();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    // Listen for custom events
    const handleNotificationUpdate = () => {
      console.log('Header - notificationUpdate event received');
      fetchUnreadCount();
    };
    
    const handleProfileUpdate = () => {
      console.log('Header - profileUpdate event received');
      fetchProfileFromBackend();
    };
    
    const handleUserLogin = () => {
      console.log('Header - userLogin event received');
      fetchProfileFromBackend();
    };

    window.addEventListener('notificationUpdate', handleNotificationUpdate);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    window.addEventListener('userLogin', handleUserLogin);

    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationUpdate', handleNotificationUpdate);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
      window.removeEventListener('userLogin', handleUserLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {userInfo?.profilePicture ? (
              <img 
                src={userInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold">
                {userInfo?.initials || 'U'}
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Header - Mobile */}
      <header className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="w-9 sm:w-10 h-9 sm:h-10 bg-sky-600 rounded-lg flex items-center justify-center shadow-sm hover:bg-sky-700 transition-colors">
              <FaHandshakeAngle className="text-white text-lg sm:text-xl" />
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-sm sm:max-w-md mx-2">
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Side - Notification & Profile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Notification Bell */}
            <button 
              onClick={handleNotificationClick}
              className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBell size={18} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Profile Picture */}
            <button 
              onClick={handleProfileClick}
              className="relative w-8 h-8 hover:ring-2 hover:ring-sky-500/30 rounded-full transition-all overflow-hidden"
            >
              {userInfo?.profilePicture ? (
                <img 
                  src={userInfo.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  {userInfo?.initials || 'U'}
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
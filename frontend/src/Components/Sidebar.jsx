import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle } from "react-icons/fa6";
import {
  MdDashboard,
  MdList,
  MdCheckBox,
  MdSettings,
  MdLaptop,
} from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

const Sidebar = ({
  activeNav,
  setActiveNav,
  mobileMenuOpen,
  setMobileMenuOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Load user info from localStorage when component mounts
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const userData = localStorage.getItem("user");
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        
        // Also check for individual user data fields (for profile updates)
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");
        
        if (userData && isLoggedIn) {
          const user = JSON.parse(userData);
          
          // If we have updated name/email in localStorage, use those
          if (userName) {
            const nameParts = userName.split(' ');
            user.firstName = nameParts[0] || user.firstName;
            user.lastName = nameParts.slice(1).join(' ') || user.lastName;
          }
          if (userEmail) {
            user.email = userEmail;
          }
          
          setUserInfo(user);
        } else if (userName || userEmail) {
          // Fallback: if no full user object but we have name/email
          const nameParts = (userName || '').split(' ');
          setUserInfo({
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: userEmail || ''
          });
        } else {
          setUserInfo(null);
        }
      } catch (e) {
        console.error("Error loading user data:", e);
        setUserInfo(null);
      }
    };

    // Load initially
    loadUserInfo();

    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener("storage", loadUserInfo);

    // Custom event for same-tab updates
    window.addEventListener("userLogin", loadUserInfo);
    window.addEventListener("userLogout", loadUserInfo);
    window.addEventListener("profileUpdate", loadUserInfo); // New event for profile updates

    // Refresh on window focus (when navigating back from edit profile)
    window.addEventListener("focus", loadUserInfo);

    return () => {
      window.removeEventListener("storage", loadUserInfo);
      window.removeEventListener("userLogin", loadUserInfo);
      window.removeEventListener("userLogout", loadUserInfo);
      window.removeEventListener("profileUpdate", loadUserInfo);
      window.removeEventListener("focus", loadUserInfo);
    };
  }, []);

  const navItems = [
    {
      id: "dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    { id: "feed", icon: MdList, label: "Feed", path: "/feedPage" },
    { id: "mytasks", icon: MdCheckBox, label: "My Tasks", path: "/mytasks" },
    { id: "requests", icon: FaEnvelope, label: "Requests", path: "/requests" },
    {
      id: "myrequests",
      icon: MdLaptop,
      label: "My Requests",
      path: "/myrequests",
    },
    { id: "settings", icon: MdSettings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`flex flex-col text-white flex-shrink-0 h-screen max-h-screen shadow-2xl z-50 bg-gradient-to-b from-sky-600 to-sky-700 transition-all duration-300 ${
          mobileMenuOpen
            ? "fixed left-0 top-0 w-64"
            : "hidden lg:flex lg:fixed lg:left-0 lg:top-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Collapse Toggle Button - Desktop */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-6 bg-sky-700 hover:bg-sky-800 text-white p-1 rounded-full border-2 border-white shadow-lg z-10"
        >
          {sidebarCollapsed ? (
            <IoIosArrowForward size={16} />
          ) : (
            <IoIosArrowBack size={16} />
          )}
        </button>

        {/* Close Button Mobile */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg z-10"
        >
          <IoIosClose size={24} />
        </button>

        {/* Logo - Fixed at top */}
        <div className="flex-shrink-0 px-2 pt-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaHandshakeAngle className="text-2xl text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-row leading-none">
                <span className="font-bold text-4xl text-white">Hire</span>
                <span className="font-semibold text-3xl text-white mt-3">
                  Helper
                </span>
              </div>
            )}
          </div>
          <div className="w-full h-px bg-white/30"></div>
        </div>

        {/* Navigation - Scrollable middle section */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden pt-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-200 ${
                activeNav === item.id
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/10"
              } ${sidebarCollapsed ? "justify-center" : ""}`}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <span
                  className={`text-lg ${
                    activeNav === item.id ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile - Fixed at bottom */}
        {!sidebarCollapsed && (
          <div className="flex-shrink-0 border-t border-white border-opacity-30 p-4">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all"
              onClick={() => {
                setActiveNav('profile');
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {`${userInfo?.firstName?.charAt(0) || ''}${userInfo?.lastName?.charAt(0) || ''}`.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">
                  {`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'User'}
                </p>
                <p className="text-xs text-white text-opacity-80 truncate">
                  {userInfo?.email || ''}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Profile - Fixed at bottom */}
        {sidebarCollapsed && (
          <div className="flex-shrink-0 border-t border-white border-opacity-30 p-4 flex justify-center">
            <div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-transform"
              onClick={() => {
                setActiveNav('profile');
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
              title={`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'User'}
            >
              {`${userInfo?.firstName?.charAt(0) || ''}${userInfo?.lastName?.charAt(0) || ''}`.toUpperCase() || 'U'}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
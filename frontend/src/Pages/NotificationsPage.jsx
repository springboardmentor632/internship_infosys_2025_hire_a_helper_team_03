import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBell, FaCheckCircle, FaClock,
} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import Sidebar   from "../Components/Sidebar";
import Header    from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import { API_ENDPOINTS, apiCall } from "../config/api";

/* ------------------------------------------------------------------ */
/* Static data & helpers                                              */
/* ------------------------------------------------------------------ */

const NOTIFICATIONS = [];

const TABS = ["all", "unread", "read"];

/* ------------------------------------------------------------------ */
/* Tiny components                                                    */
/* ------------------------------------------------------------------ */

const FilterBtn = ({ tab, active, unread, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
      active
        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {tab[0].toUpperCase() + tab.slice(1)}
    {tab === "unread" && unread > 0 && (
      <span className="ml-2 bg-white text-sky-600 px-2 py-0.5 rounded-full text-xs font-bold">
        {unread}
      </span>
    )}
  </button>
);

const NotificationCard = ({ n, markAsRead, remove }) => {
  const { id, icon: Icon, title, message, time, read, bg, color } = n;
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 overflow-hidden ${
        read ? "border-gray-200" : "border-sky-500"
      }`}
    >
      <div className="p-4 md:p-5 flex gap-4">
        <div
          className={`bg-gradient-to-br ${bg} rounded-xl p-3 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center`}
        >
          <Icon size={24} className={color} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className={`text-base md:text-lg text-gray-900 ${read ? "font-semibold" : "font-bold"}`}>
              {title}
            </h3>
            <button onClick={() => remove(id)} className="text-gray-400 hover:text-red-500 p-1" title="Delete">
              <IoIosClose size={24} />
            </button>
          </div>

          <p className="text-gray-600 text-sm md:text-base mb-2">{message}</p>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <FaClock size={12} /> {time}
            </span>

            {!read && (
              <button
                onClick={() => markAsRead(id)}
                className="text-sky-600 hover:text-sky-700 text-xs font-semibold flex items-center gap-1"
              >
                <FaCheckCircle size={12} /> Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav]         = useState("notifications");
  const [mobileMenuOpen, setMobileOpen]   = useState(false);
  const [sidebarCollapsed, setCollapsed]  = useState(false);
  const [filter, setFilter]               = useState("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiCall(API_ENDPOINTS.NOTIFICATIONS_LIST);
        const notifs = (res.notifications || []).map(x => ({ 
          id: x._id, 
          icon: FaBriefcase,
          title: x.title, 
          message: x.message, 
          time: new Date(x.createdAt).toLocaleString(), 
          read: x.read, 
          data: x.data,
          bg: 'from-blue-100 to-indigo-100',
          color: 'text-blue-600'
        }));
        setNotifications(notifs);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };
    load();
  }, []);

  const markAsRead   = async id => {
    try {
      await apiCall(API_ENDPOINTS.NOTIFICATIONS_MARK_READ(id), { method: 'PATCH' });
      setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
    } catch (err) { console.error(err); }
  };
  const markAllRead  = async ()  => {
    // naive local mark; could call API individually
    setNotifications(n => n.map(x => ({ ...x, read: true })));
  };
  const remove       = async id => {
    try {
      await apiCall(API_ENDPOINTS.NOTIFICATIONS_DELETE(id), { method: 'DELETE' });
      setNotifications(n => n.filter(x => x.id !== id));
    } catch (err) { console.error(err); }
  };

  const unread = notifications.filter(n => !n.read).length;
  const shown  = notifications.filter(n =>
    filter === "all" ? true : filter === "unread" ? !n.read : n.read
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Sidebar
        {...{ activeNav, setActiveNav, mobileMenuOpen, setMobileMenuOpen: setMobileOpen,
              sidebarCollapsed, setSidebarCollapsed: setCollapsed, navigate }}
      />

      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <Header {...{ mobileMenuOpen, setMobileMenuOpen: setMobileOpen, sidebarCollapsed }} />

        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Title + mark-all ----------------- */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
              <p className="text-sm md:text-lg text-gray-600">Stay updated with your latest activities</p>
            </div>

            {unread > 0 && (
              <button onClick={markAllRead} className="hidden md:flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-semibold">
                <FaCheckCircle size={16} /> Mark all as read
              </button>
            )}
          </div>

          {/* Tabs ------------------------------------------------------ */}
          <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 flex gap-2">
            {TABS.map(t => (
              <FilterBtn key={t} tab={t} active={filter === t} unread={unread} onClick={setFilter} />
            ))}
          </div>

          {/* Mobile mark-all ----------------------------------------- */}
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="md:hidden w-full mb-4 bg-white text-sky-600 hover:bg-sky-50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm border border-gray-200"
            >
              <FaCheckCircle size={16} /> Mark all as read
            </button>
          )}

          {/* Notification list / empty state ------------------------- */}
          <div className="space-y-4">
            {shown.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <FaBell className="text-blue-600" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            ) : (
              shown.map(n => (
                <NotificationCard key={n.id} n={n} markAsRead={markAsRead} remove={remove} />
              ))
            )}
          </div>
        </section>

        <BottomNav navigate={navigate} activeTab="notifications" />
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope, FaDollarSign, FaUserCircle, FaStar, FaBriefcase,
  FaBell, FaCheckCircle, FaClock,
} from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import Sidebar   from "../Components/Sidebar";
import Header    from "../Components/Header";
import BottomNav from "../Components/BottomNav";

/* ------------------------------------------------------------------ */
/* Static data & helpers                                              */
/* ------------------------------------------------------------------ */

const NOTIFICATIONS = [
  { id: 1, icon: FaBriefcase,  title: "New Job Application", message: "Sarah Johnson applied for House Cleaning position",  time: "5 minutes ago",  read: false, bg: "from-blue-100 to-indigo-100",   color: "text-blue-600"    },
  { id: 2, icon: FaEnvelope,   title: "New Message",         message: "You have a new message from John regarding the gardening job", time: "1 hour ago",    read: false, bg: "from-green-100 to-emerald-100", color: "text-green-600"   },
  { id: 3, icon: FaDollarSign, title: "Payment Received",    message: "Payment of $150 received for plumbing services",               time: "3 hours ago",   read: false, bg: "from-emerald-100 to-green-100", color: "text-emerald-600" },
  { id: 4, icon: MdCheckBox,   title: "Job Completed",       message: "Mike marked the electrical work job as completed",              time: "5 hours ago",   read: true,  bg: "from-purple-100 to-pink-100",   color: "text-purple-600"  },
  { id: 5, icon: FaUserCircle, title: "Profile View",        message: "Emma viewed your helper profile",                               time: "1 day ago",     read: true,  bg: "from-indigo-100 to-purple-100",  color: "text-indigo-600"  },
  { id: 6, icon: FaStar,       title: "Review Received",     message: "Tom left you a 5-star review for painting services",            time: "2 days ago",    read: true,  bg: "from-yellow-100 to-orange-100",   color: "text-yellow-600"  },
  { id: 7, icon: FaBriefcase,  title: "Task Request",        message: "Lisa wants to hire you for 'Fix Kitchen Sink' task",            time: "3 days ago",    read: true,  bg: "from-sky-100 to-blue-100",        color: "text-sky-600"     },
];

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

  const markAsRead   = id => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markAllRead  = ()  => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const remove       = id => setNotifications(n => n.filter(x => x.id !== id));

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

        <BottomNav {...{ navigate }} />
      </main>
    </div>
  );
}

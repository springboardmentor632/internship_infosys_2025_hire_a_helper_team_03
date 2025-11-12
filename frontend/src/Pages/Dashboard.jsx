import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaDollarSign,
  FaUserCircle,
  FaAward,
  FaClock,
} from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";

// Import components
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import StatsCard from "../Components/StatsCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user tasks
  const fetchUserTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/tasks/mytasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (res.ok) {
        setTasks(result);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  // Calculate statistics from tasks
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const activeTasksCount = tasks.filter(task => task.status === 'active').length;
  
  // Calculate total earnings from completed tasks
  const totalEarnings = tasks
    .filter(task => task.status === 'completed')
    .reduce((sum, task) => sum + (parseFloat(task.budget) || 0), 0);

  // Calculate average rating (placeholder - you'll need to implement rating system)
  const averageRating = "4.5"; // This should come from actual ratings when implemented

  // Get active tasks for display
  const activeTasks = tasks
    .filter(task => task.status === 'active')
    .slice(0, 2) // Show only first 2
    .map(task => ({
      title: task.title,
      location: task.location,
      requests: task.requests ? `${task.requests.length} requests` : "0 requests",
      price: `$${task.budget}`,
      button1: "View",
      button2: "Edit",
      gradient: "from-sky-600 to-blue-600",
      taskId: task._id
    }));

  const stats = [
    {
      label: "Tasks Completed",
      value: loading ? "..." : completedTasksCount.toString(),
      color: "#3B82F6",
      icon: MdCheckBox,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      label: "Active tasks",
      value: loading ? "..." : activeTasksCount.toString(),
      color: "#10B981",
      icon: FaClock,
      gradient: "from-green-400 to-green-600",
    },
    {
      label: "Total Earning",
      value: loading ? "..." : `$${totalEarnings.toFixed(0)}`,
      color: "#8B5CF6",
      icon: FaDollarSign,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      label: "Average Rating",
      value: averageRating,
      color: "#EF4444",
      icon: FaAward,
      gradient: "from-red-500 to-red-700",
    },
  ];

  const recentActivity = [
    {
      icon: FaUserCircle,
      text: "John requested your 'Fix Kitchen Sink' task",
      time: "2 minutes ago",
      bgColor: "bg-gradient-to-br from-indigo-100 to-blue-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: MdCheckBox,
      text: "You completed 'Garden Cleanup'",
      time: "1 hour ago",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
    },
    {
      icon: FaDollarSign,
      text: `Payment received: $${totalEarnings > 0 ? totalEarnings.toFixed(0) : '0'}`,
      time: "Yesterday",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-600",
    },
  ];

  const handleViewTask = (taskId) => {
    navigate('/mytasks'); // Navigate to My Tasks page
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      navigate('/posttask', { state: { task: task } });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b lg:bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Desktop Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileMenuOpen={false}
        setMobileMenuOpen={() => {}}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        navigate={navigate}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Dashboard Content */}
        <section className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-8 max-w-[1600px] mx-auto w-full">
          {/* Page Title */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Dashboard
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Here's what's happening with your tasks today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Quick Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4">
              Quick Tasks
            </h3>
            <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-3">
              <button
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 px-4 md:px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg sm:flex-1 text-sm md:text-base"
                onClick={() => navigate("/posttask")}
              >
                <FaPlusCircle size={18} />
                Post Task
              </button>
              <button
                className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-3 px-4 md:px-6 rounded-lg transition-all sm:flex-1 text-sm md:text-base"
                onClick={() => navigate("/feedPage")}
              >
                Browse Tasks
              </button>
              <button 
                className="bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-bold py-3 px-4 md:px-6 rounded-lg transition-all sm:flex-1 text-sm md:text-base"
                onClick={() => navigate("/mytasks")}
              >
                View Your Tasks
              </button>
            </div>
          </div>

          {/* Recent Activity and Active Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <button
                  onClick={() => navigate("/mytasks")}
                  className="text-sky-600 hover:text-sky-700 text-xs md:text-sm font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <div className="flex gap-3 md:gap-4 items-start">
                      <div
                        className={`${activity.bgColor} rounded-lg p-2.5 md:p-3 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center`}
                      >
                        <activity.icon
                          size={20}
                          className={activity.iconColor}
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-gray-900 text-xs md:text-sm lg:text-base font-medium">
                          {activity.text}
                        </p>
                        <p className="text-gray-500 text-[10px] md:text-xs">{activity.time}</p>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="border-b border-gray-200 mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Your Active Tasks */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4">
                Your Active Tasks
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                </div>
              ) : activeTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaClock className="text-gray-400" size={24} />
                  </div>
                  <p className="text-gray-500 text-sm mb-4">No active tasks yet</p>
                  <button
                    onClick={() => navigate("/posttask")}
                    className="text-sky-600 hover:text-sky-700 text-sm font-semibold"
                  >
                    Create your first task
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTasks.map((task, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-3 md:p-4 hover:shadow-md transition-all border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 flex-1">
                          {task.title}
                        </h4>
                        <span className="bg-green-100 text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 rounded whitespace-nowrap ml-2">
                          {task.price}
                        </span>
                      </div>

                      <div className="space-y-1 mb-3">
                        <p className="text-[10px] md:text-xs text-gray-600 flex items-center gap-1">
                          <span>📍</span>
                          {task.location}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-600 flex items-center gap-1">
                          <FaClock size={10} />
                          {task.requests}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewTask(task.taskId)}
                          className={`flex-1 text-white text-xs md:text-sm font-semibold py-2 rounded-lg bg-gradient-to-r ${task.gradient} hover:shadow-lg transition-all`}
                        >
                          {task.button1}
                        </button>
                        <button 
                          onClick={() => handleEditTask(task.taskId)}
                          className="flex-1 bg-white text-gray-700 text-xs md:text-sm font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
                        >
                          {task.button2}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <BottomNav navigate={navigate} activeTab="dashboard" />
      </main>
    </div>
  );
}
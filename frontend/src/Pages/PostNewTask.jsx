import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import TaskForm from "../Components/TaskForm";

export default function PostTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('posttask');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editTask, setEditTask] = useState(null);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Set overflow-y-auto on body when component mounts
    document.body.style.overflowY = 'auto';
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  // Check if we're editing a task
  useEffect(() => {
    if (location.state && location.state.task) {
      setEditTask(location.state.task);
    }
  }, [location]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

        {/* Post Task Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {editTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {editTask ? 'Update your task details' : 'Create a task and find someone to help you'}
            </p>
          </div>

          {/* Show Sign-in prompt if not logged in */}
          {!isLoggedIn ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Sign In Required
              </h3>
              <p className="text-gray-600 mb-8 text-base md:text-lg">
                Please sign in to your account to add a new task and connect with helpers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/signin')}
                  className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold py-3 px-8 rounded-lg transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : (
            <TaskForm navigate={navigate} editTask={editTask} />
          )}
        </section>

        <BottomNav navigate={navigate} activeTab="posttask" />
      </main>
    </div>
  );
}
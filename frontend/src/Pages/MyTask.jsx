import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import FilterTabs from "../Components/FilterTabs";
import TaskTable from "../Components/TaskTable";
import TaskCardMobile from "../Components/TaskCardMobile";

export default function MyTasks() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('mytasks');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/tasks/mytasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const filters = [
    { id: 'all', label: 'All Tasks', count: 23 },
    { id: 'active', label: 'Active', count: 5 },
    { id: 'completed', label: 'Completed', count: 18 },
    { id: 'drafts', label: 'Drafts', count: 2 },
  ];

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

        {/* My Tasks Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title and Post Task Button */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Tasks</h2>
              <p className="text-sm md:text-base text-gray-600">Manage all your posted tasks</p>
            </div>
            <button
              onClick={() => navigate("/posttask")}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaPlusCircle size={20} />
              Post New Task
            </button>
          </div>

          {/* Filter Tabs */}
          <FilterTabs 
            filters={filters} 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />

          {/* Task Cards - Mobile */}
          <div className="lg:hidden space-y-6">
            {tasks.map((task, index) => (
              <TaskCardMobile key={task._id || index} task={task} index={index} />
            ))}
          </div>

          {/* Task Table - Desktop */}
          <TaskTable tasks={tasks} />
        </section>

        <BottomNav navigate={navigate} />
      </main>
    </div>
  );
}
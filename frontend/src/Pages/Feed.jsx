import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import TaskCard from "../Components/TaskCard";
import TaskViewModal from "../Components/TaskViewModal";

export default function Feed() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [activeNav, setActiveNav] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // recent, price-low, price-high
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/tasks/all');
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch tasks');
      }

      console.log('Fetched tasks:', result);
      setTasks(result);
      // Initialize favorites array
      setFavorites(new Array(result.length).fill(false));
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  // Handle view task details
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // Handle close task modal
  const handleCloseModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  // Get unique categories from tasks
  const categories = ['all', ...new Set(tasks.map(task => task.category))];

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;

    // Apply category filter
    if (filterCategory !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filterCategory);
    }

    // Apply sorting
    const sortedTasks = [...filteredTasks];
    switch (sortBy) {
      case 'price-low':
        return sortedTasks.sort((a, b) => (a.budget || 0) - (b.budget || 0));
      case 'price-high':
        return sortedTasks.sort((a, b) => (b.budget || 0) - (a.budget || 0));
      case 'recent':
      default:
        return sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const displayTasks = getFilteredAndSortedTasks();

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

        {/* Feed Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Feed
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Find tasks that match your skills in your area
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-700 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white">
              <FaFilter size={14} />
              <span className="text-sm font-medium">
                {displayTasks.length} {displayTasks.length === 1 ? 'Task' : 'Tasks'}
              </span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && displayTasks.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No tasks available</h3>
                <p className="text-gray-600 mb-6">
                  {filterCategory !== 'all' 
                    ? `No tasks found in the ${filterCategory} category. Try selecting a different category.`
                    : 'There are no active tasks at the moment. Check back later!'}
                </p>
                {filterCategory !== 'all' && (
                  <button
                    onClick={() => setFilterCategory('all')}
                    className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Task List */}
          {!loading && !error && displayTasks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayTasks.map((task, index) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  index={index} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </section>

        <BottomNav navigate={navigate} />
      </main>

      {/* Task View Modal */}
      {showTaskModal && (
        <TaskViewModal
          task={selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
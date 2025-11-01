import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BottomNav from "../Components/BottomNav";
import TaskCardMobile from "../Components/TaskCardMobile";
import TaskTable from "../Components/TaskTable";
import TaskDetailsCard from "../Components/TaskDetailCard";

const MyTask = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("mytasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchUserTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view your tasks');
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

      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch tasks');
      }

      console.log('Fetched tasks:', result); // Log the fetched tasks
      setTasks(result);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle view button click
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  // Handle close task details
  const handleCloseTaskDetails = () => {
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  // Handle delete task
  const handleDeleteTask = async (task) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to delete tasks');
      return;
    }

    console.log('Task to delete:', task);
    console.log('Task ID type:', typeof task._id);
    console.log('Task ID value:', task._id);
    
    if (!task._id) {
      alert('Invalid task ID');
      return;
    }

    try {
      const url = `http://localhost:5000/api/tasks/${task._id}`;
      console.log('Making DELETE request to:', url);
      console.log('With token:', token.substring(0, 20) + '...');
      
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', res.status);
      console.log('Response status text:', res.statusText);

      const responseText = await res.text();
      console.log('Response body:', responseText);

      if (!res.ok) {
        throw new Error(responseText || 'Failed to delete task');
      }

      // Try to parse the response as JSON if it exists
      let response;
      try {
        if (responseText) {
          response = JSON.parse(responseText);
        }
      } catch (e) {
        console.warn('Response was not JSON:', e);
      }

      // Remove the deleted task from the state
      setTasks(prevTasks => {
        const newTasks = prevTasks.filter(t => t._id !== task._id);
        console.log('Tasks after deletion:', newTasks);
        return newTasks;
      });
      
      // Show success message
      alert(response?.message || 'Task deleted successfully');

      // Refresh the task list
      fetchUserTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        navigate={navigate}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                My Tasks
              </h1>
              <p className="text-gray-600">
                Manage and track all your posted tasks
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="max-w-md relative">
                <input
                  type="text"
                  placeholder="Search your tasks..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 text-gray-700 bg-white shadow-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
                <button
                  onClick={() => navigate('/signin')}
                  className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Go to Sign In
                </button>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <button
                  onClick={() => navigate('/posttask')}
                  className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Task
                </button>
              </div>

              {/* Tasks Count and Search Results */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {searchQuery && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {filteredTasks.length} result{filteredTasks.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </span>
                )}
                <span>
                  {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} total
                </span>
              </div>
            </div>

            {/* Tasks Display */}
            {filteredTasks.length === 0 && !error ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {searchQuery ? 'No tasks found' : 'No tasks yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No tasks match your search for "${searchQuery}". Try different keywords.`
                      : 'Create your first task to get help from our community'
                    }
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => navigate('/posttask')}
                      className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Post Your First Task
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                  {filteredTasks.map((task, index) => (
                    <TaskCardMobile 
                      key={task._id || index} 
                      task={task} 
                      index={index}
                      onViewClick={handleViewTask}
                    />
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block">
                  <TaskTable 
                    tasks={filteredTasks} 
                    onViewClick={handleViewTask}
                    onDeleteClick={handleDeleteTask}
                  />
                </div>
              </>
            )}

            {/* Task Details Modal */}
            {showTaskDetails && (
              <TaskDetailsCard
                task={selectedTask}
                onClose={handleCloseTaskDetails}
              />
            )}
          </div>
        </main>

        {/* Bottom Navigation for Mobile */}
  <BottomNav navigate={navigate} />
      </div>
    </div>
  );
};

export default MyTask;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BottomNav from "../Components/BottomNav";
import { useAlert } from "../Components/AlertContainer";

import TaskTable from "../Components/TaskTable";
import TaskDetailsCard from "../Components/TaskDetailCard";
import DraftCard from "../Components/DraftCard";

const MyTask = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("mytasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [filterView, setFilterView] = useState("all"); // all, drafts, active, completed, cancelled
  const [actionLoading, setActionLoading] = useState(false); // For publish/delete actions
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Separate tasks by status
  const drafts = tasks.filter(task => task.status === 'draft');
  const activeTasks = tasks.filter(task => task.status === 'active');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const cancelledTasks = tasks.filter(task => task.status === 'cancelled');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

  // Filter tasks based on selected filter view
  const getFilteredTasksByView = () => {
    switch (filterView) {
      case 'drafts':
        return drafts;
      case 'active':
        return activeTasks;
      case 'completed':
        return completedTasks;
      case 'cancelled':
        return cancelledTasks;
      case 'in-progress':
        return inProgressTasks;
      case 'all':
      default:
        return tasks;
    }
  };

  const viewFilteredTasks = getFilteredTasksByView();

  // Filter tasks based on search query
  const filteredTasks = viewFilteredTasks.filter(task =>
    task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate drafts and non-drafts from filtered results for display
  const displayDrafts = filteredTasks.filter(task => task.status === 'draft');
  const displayActiveTasks = filteredTasks.filter(task => task.status !== 'draft');

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

  // Refetch tasks when page regains focus (user returns from edit)
  useEffect(() => {
    const handleFocus = () => {
      console.log('Page regained focus, refetching tasks...');
      fetchUserTasks();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
      showError('Invalid task ID');
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
      showSuccess(response?.message || 'Task deleted successfully');

      // Refresh the task list
      fetchUserTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      showError('Failed to delete task: ' + err.message);
    }
  };

  // Handle mark task as complete
  const handleMarkComplete = async (task) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to update tasks');
      return;
    }

    if (!task._id) {
      showError('Invalid task ID');
      return;
    }

    try {
      const url = `http://localhost:5000/api/tasks/${task._id}/status`;
      console.log('Making PATCH request to:', url);
      
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'completed' })
      });

      const result = await res.json();
      console.log('Update response:', result);

      if (!res.ok) {
        throw new Error(result.message || 'Failed to update task status');
      }

      // Update the task in the state
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t._id === task._id ? { ...t, status: 'completed' } : t
        )
      );

      // Update selected task if it's the one being viewed
      if (selectedTask && selectedTask._id === task._id) {
        setSelectedTask({ ...selectedTask, status: 'completed' });
      }
      
      showSuccess('Task marked as completed!');
    } catch (err) {
      console.error('Error updating task status:', err);
      showError('Failed to update task: ' + err.message);
    }
  };

  // Handle publish draft
  const handlePublishDraft = async (draft) => {
    if (!window.confirm('Are you sure you want to publish this draft?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showError('Please login to publish drafts');
      return;
    }

    if (!draft._id) {
      showError('Invalid draft ID');
      return;
    }

    setActionLoading(true);
    try {
      const url = `http://localhost:5000/api/tasks/${draft._id}/publish`;
      console.log('Publishing draft:', url);
      
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();
      console.log('Publish response:', result);

      if (!res.ok) {
        throw new Error(result.message || 'Failed to publish draft');
      }

      // Update the draft in the state to active
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t._id === draft._id ? { ...t, status: 'active' } : t
        )
      );
      
      showSuccess('Draft published successfully!');
      fetchUserTasks(); // Refresh the list
    } catch (err) {
      console.error('Error publishing draft:', err);
      showError('Failed to publish draft: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle edit draft
  const handleEditDraft = (draft) => {
    // Navigate to post task page with draft data
    navigate('/posttask', { state: { task: draft } });
  };

  // Handle edit task
  const handleEditTask = (task) => {
    // Navigate to post task page with task data
    navigate('/posttask', { state: { task: task, returnToMyTasks: true } });
  };

  // Handle delete draft
  const handleDeleteDraft = async (draft) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showError('Please login to delete drafts');
      return;
    }

    if (!draft._id) {
      showError('Invalid draft ID');
      return;
    }

    setActionLoading(true);
    try {
      const url = `http://localhost:5000/api/tasks/${draft._id}`;
      console.log('Deleting draft:', url);
      
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to delete draft');
      }

      // Remove the deleted draft from the state
      setTasks(prevTasks => prevTasks.filter(t => t._id !== draft._id));
      
      showSuccess('Draft deleted successfully');
      fetchUserTasks(); // Refresh the list
    } catch (err) {
      console.error('Error deleting draft:', err);
      showError('Failed to delete draft: ' + err.message);
    } finally {
      setActionLoading(false);
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
        mobileMenuOpen={false}
        setMobileMenuOpen={() => {}}
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
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3 md:p-6 lg:p-8 pb-28 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  My Tasks
                </h1>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full">
                  {tasks.length}
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Manage and track all your posted tasks
              </p>
            </div>

            {/* Show Sign-in prompt if not logged in */}
            {!isLoggedIn ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Sign In to View Your Tasks
                </h3>
                <p className="text-gray-600 mb-8 text-base md:text-lg">
                  Please sign in to your account to view and manage your tasks.
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
              <>
            {/* Search and Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 text-gray-700 bg-white shadow-sm text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              {/* Filter Dropdown */}
              <div className="relative sm:max-w-[180px]">
                <select
                  value={filterView}
                  onChange={(e) => setFilterView(e.target.value)}
                  className="w-full appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 text-gray-700 bg-white shadow-sm font-medium text-sm cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <option value="all">All Tasks</option>
                  <option value="drafts">Drafts</option>
                  <option value="active">Active</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Create Task Button */}
              <button
                onClick={() => navigate('/posttask')}
                className="inline-flex items-center justify-center px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-sm hover:shadow-md gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
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

            {/* Tasks Count and Filter Info */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-6">
              {searchQuery && (
                <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                  {filteredTasks.length} result{filteredTasks.length !== 1 ? 's' : ''} for "{searchQuery}"
                </span>
              )}
              {filterView === 'all' ? (
                <>
                  {drafts.length > 0 && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                      {drafts.length} draft{drafts.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {activeTasks.length > 0 && (
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                      {activeTasks.length} active
                    </span>
                  )}
                  {inProgressTasks.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {inProgressTasks.length} in progress
                    </span>
                  )}
                  {completedTasks.length > 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {completedTasks.length} completed
                    </span>
                  )}
                </>
              ) : (
                <span className={`px-2 py-1 rounded-full font-medium ${
                  filterView === 'drafts' ? 'bg-amber-100 text-amber-700' :
                  filterView === 'active' ? 'bg-sky-100 text-sky-700' :
                  filterView === 'completed' ? 'bg-green-100 text-green-700' :
                  filterView === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {filteredTasks.length} {filterView === 'in-progress' ? 'in progress' : filterView}
                </span>
              )}
            </div>

            {/* Drafts Section - Only show when viewing "All" */}
            {displayDrafts.length > 0 && filterView === 'all' && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Drafts</h2>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
                    {displayDrafts.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayDrafts.map((draft, index) => (
                    <DraftCard
                      key={draft._id || index}
                      draft={draft}
                      onPublish={handlePublishDraft}
                      onDelete={handleDeleteDraft}
                      onEdit={handleEditDraft}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Active Tasks Section Header */}
            {displayActiveTasks.length > 0 && displayDrafts.length > 0 && filterView === 'all' && (
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Active Tasks</h2>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full">
                  {displayActiveTasks.length}
                </span>
              </div>
            )}

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
                    {searchQuery ? 'No tasks found' : 
                     filterView === 'all' ? 'No tasks yet' : 
                     `No ${filterView === 'in-progress' ? 'in progress' : filterView} tasks`}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No tasks match your search for "${searchQuery}". Try different keywords.`
                      : filterView === 'all'
                      ? 'Create your first task to get help from our community'
                      : `You don't have any ${filterView === 'in-progress' ? 'in progress' : filterView} tasks yet.`
                    }
                  </p>
                  {!searchQuery && filterView === 'all' && (
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
                  {!searchQuery && filterView !== 'all' && (
                    <button
                      onClick={() => setFilterView('all')}
                      className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      View All Tasks
                    </button>
                  )}
                </div>
              </div>
            ) : filterView === 'drafts' ? (
              // Show only drafts when drafts filter is selected
              displayDrafts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayDrafts.map((draft, index) => (
                    <DraftCard
                      key={draft._id || index}
                      draft={draft}
                      onPublish={handlePublishDraft}
                      onDelete={handleDeleteDraft}
                      onEdit={handleEditDraft}
                    />
                  ))}
                </div>
              ) : null
            ) : (
              <>
                {/* Mobile and Desktop View - Same Table Format */}
                <div className="w-full">
                  <TaskTable 
                    tasks={displayActiveTasks} 
                    onViewClick={handleViewTask}
                    onDeleteClick={handleDeleteTask}
                    onEditClick={handleEditTask}
                  />
                </div>
              </>
            )}

            {/* Task Details Modal */}
            {showTaskDetails && (
              <TaskDetailsCard
                task={selectedTask}
                onClose={handleCloseTaskDetails}
                onMarkComplete={handleMarkComplete}
                onEdit={handleEditTask}
              />
            )}

            {/* Action Loading Overlay */}
            {actionLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-sky-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-700 font-medium">Processing...</span>
                  </div>
                </div>
              </div>
            )}
            </>
            )}
          </div>
        </main>

        {/* Bottom Navigation for Mobile */}
        <BottomNav navigate={navigate} activeTab="mytasks" />
      </div>
    </div>
  );
};

export default MyTask;
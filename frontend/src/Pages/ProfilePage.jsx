import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      // Fetch user profile
      const userRes = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (userRes.ok) {
        const userResult = await userRes.json();
        setUserData(userResult);
      } else {
        throw new Error('Failed to fetch profile');
      }

      // Fetch user tasks for statistics
      const tasksRes = await fetch('http://localhost:5000/api/tasks/mytasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (tasksRes.ok) {
        const tasksResult = await tasksRes.json();
        setTasks(tasksResult);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      // If token is invalid, redirect to signin
      if (err.message.includes('401')) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Calculate statistics from tasks
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const averageRating = userData?.rating || 4.5; // Use user's rating or default
  const recommendedPercentage = completedTasksCount > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100) 
    : 0;

  // Get user's initials for default avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
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
          
          <section className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!userData) {
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
          
          <section className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Profile</h3>
              <p className="text-gray-600 mb-4">Please sign in again to view your profile.</p>
              <button
                onClick={() => navigate('/signin')}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all"
              >
                Sign In
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const profileData = {
    name: userData.name || userData.username || 'User',
    email: userData.email,
    image: userData.profilePicture || null,
    rating: averageRating,
    tasksCompleted: completedTasksCount,
    recommended: recommendedPercentage,
    bio: userData.bio || "No bio added yet. Click 'Edit profile' to add information about yourself."
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

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
        
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sky-100 to-blue-200 rounded-3xl p-6 md:p-12 shadow-lg">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  {profileData.image ? (
                    <img 
                      src={profileData.image} 
                      alt={profileData.name} 
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover" 
                    />
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl md:text-5xl font-bold">
                        {getInitials(profileData.name)}
                      </span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                <p className="text-lg text-sky-700 font-medium">{profileData.email}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profileData.rating.toFixed(1)}</div>
                  <div className="text-sm md:text-base text-gray-700 font-medium">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profileData.tasksCompleted}</div>
                  <div className="text-sm md:text-base text-gray-700 font-medium">Task Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profileData.recommended}%</div>
                  <div className="text-sm md:text-base text-gray-700 font-medium">Completion Rate</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Bio:</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{profileData.bio}</p>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/edit-profile')} 
                  className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all shadow-md"
                >
                  Edit profile
                </button>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Skills & Services</h3>
                <button 
                  onClick={() => navigate('/edit-profile')}
                  className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  + Add Skills
                </button>
              </div>
              {userData.skills && userData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {userData.skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-sky-100 text-sky-700 font-medium rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No skills added yet</p>
                  <button
                    onClick={() => navigate('/edit-profile')}
                    className="px-6 py-2 bg-sky-100 text-sky-700 font-semibold rounded-lg hover:bg-sky-200 transition-colors"
                  >
                    Add Your Skills
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Task Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{completedTasksCount}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {tasks.filter(task => task.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {tasks.filter(task => task.status === 'draft').length}
                  </div>
                  <div className="text-sm text-gray-600">Drafts</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h3>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-400">Reviews from clients will appear here</p>
              </div>
            </div>
          </div>
        </section>
        
        <BottomNav navigate={navigate} activeTab="profile" />
      </main>
    </div>
  );
}
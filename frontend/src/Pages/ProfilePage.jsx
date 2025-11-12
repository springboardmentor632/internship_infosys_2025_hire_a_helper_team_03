import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaCheckCircle, FaClock, FaEdit, FaTrophy, FaAward, FaPlus } from "react-icons/fa";
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

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
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
      if (err.message.includes('401')) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUserProfile();
    };

    window.addEventListener('profileUpdate', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, [fetchUserProfile]);

  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const averageRating = userData?.rating || 4.5;
  const recommendedPercentage = completedTasksCount > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100) 
    : 0;

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
        <Sidebar {...{activeNav, setActiveNav, mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, navigate}} />
        
        <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          <Header {...{mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed}} />
          
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
        <Sidebar {...{activeNav, setActiveNav, mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, navigate}} />
        
        <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          <Header {...{mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed}} />
          
          <section className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Profile</h3>
              <p className="text-gray-600 mb-4">Please sign in again to view your profile.</p>
              <button onClick={() => navigate('/signin')} className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all">
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
    bio: userData.bio || "No bio added yet. Click 'Edit profile' to add information about yourself.",
    location: userData.location || null
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

      <Sidebar {...{activeNav, setActiveNav, mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, navigate}} />
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header {...{mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed}} />
        
        <section className="flex-1 overflow-y-auto pb-32 lg:pb-8">
          <div className="bg-white shadow-md overflow-hidden">
            <div className="h-20 md:h-20 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <button onClick={() => navigate('/edit-profile')} className="absolute top-4 right-4 bg-sky-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg z-10">
                <FaEdit /> Edit Profile
              </button>
            </div>

            <div className="px-4 md:px-8 pb-6 pt-8">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 -mt-14 md:-mt-20">
                <div className="relative flex-shrink-0">
                  {userData.profilePicture ? (
                    <img src={userData.profilePicture} alt={profileData.name} className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl object-cover" />
                  ) : (
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-3xl md:text-4xl font-bold">{getInitials(profileData.name)}</span>
                    </div>
                  )}
                  {profileData.rating >= 4.5 && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-2 border-3 border-white shadow-lg">
                      <FaTrophy className="text-yellow-700 text-lg" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 text-sm md:text-base text-gray-600 mb-2">
                    {profileData.location ? (
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-sky-600" size={14} />
                        {profileData.location}
                      </span>
                    ) : (
                      <button onClick={() => navigate('/edit-profile')} className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-full text-sm font-medium transition-all border border-sky-200">
                        <FaPlus size={12} />
                        Add Location
                      </button>
                    )}
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-600" size={14} />
                      Verified Member
                    </span>
                  </div>
                </div>

                <div className="flex gap-8 bg-gray-50 px-6 py-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                      {profileData.rating.toFixed(1)}
                      <FaStar className="text-yellow-500" size={16} />
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">Rating</div>
                  </div>
                  <div className="h-full w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profileData.tasksCompleted}</div>
                    <div className="text-xs text-gray-600 mt-0.5">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 md:px-6 lg:px-8 mt-4 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white shadow-md p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">{profileData.bio}</p>
              </div>

              <div className="bg-white shadow-md p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FaAward className="text-sky-600" />
                    Skills & Expertise
                  </h3>
                  <button onClick={() => navigate('/edit-profile')} className="text-sky-600 hover:text-sky-700 text-xs font-medium flex items-center gap-1">
                    <FaEdit size={12} /> Edit
                  </button>
                </div>
                {userData.skills && userData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 font-medium rounded-full text-sm border border-sky-200 hover:shadow-md transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaAward className="text-sky-600 text-xl" />
                    </div>
                    <p className="text-gray-500 text-sm mb-2">No skills added yet</p>
                    <button onClick={() => navigate('/edit-profile')} className="px-4 py-1.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all">
                      Add Your Skills
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white shadow-md p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Reviews & Ratings
                </h3>
                
                <div className="mb-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{profileData.rating.toFixed(1)}</div>
                      <div className="flex justify-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(profileData.rating) ? "text-yellow-500" : "text-gray-300"} size={14} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Overall Rating</p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-600 w-2">{star}</span>
                          <FaStar className="text-yellow-500" size={10} />
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '10%' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center py-5 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm mb-0.5 font-medium">No reviews yet</p>
                  <p className="text-xs text-gray-400">Complete tasks to receive reviews</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white shadow-md p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Task Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total Tasks</p>
                        <p className="text-xl font-bold text-gray-900">{tasks.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="text-green-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Completed</p>
                        <p className="text-xl font-bold text-gray-900">{completedTasksCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FaClock className="text-yellow-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Active Tasks</p>
                        <p className="text-xl font-bold text-gray-900">
                          {tasks.filter(task => task.status === 'active').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1.5">Completion Rate</p>
                    <div className="flex items-end justify-between mb-2">
                      <p className="text-2xl font-bold text-purple-600">{recommendedPercentage}%</p>
                      <p className="text-xs text-gray-500">Success Rate</p>
                    </div>
                    <div className="h-1.5 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${recommendedPercentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  Achievements
                </h3>
                <div className="space-y-2">
                  {profileData.rating >= 4.5 && (
                    <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaTrophy className="text-yellow-600 text-lg" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Top Rated</p>
                        <p className="text-xs text-gray-600">Maintained 4.5+ rating</p>
                      </div>
                    </div>
                  )}
                  {completedTasksCount >= 5 && (
                    <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaAward className="text-green-600 text-lg" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Reliable Helper</p>
                        <p className="text-xs text-gray-600">Completed 5+ tasks</p>
                      </div>
                    </div>
                  )}
                  {completedTasksCount === 0 && profileData.rating < 4.5 && (
                    <div className="text-center py-5 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FaTrophy className="text-gray-400 text-xl" />
                      </div>
                      <p className="text-xs text-gray-500">Complete tasks to earn achievements</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <BottomNav navigate={navigate} activeTab="profile" />
      </main>
    </div>
  );
}
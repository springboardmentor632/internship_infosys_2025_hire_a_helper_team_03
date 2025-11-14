// ============================================
// COMPLETE FIXED EditProfilePage.jsx
// ============================================

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTimes, FaPlus, FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import { useAlert } from "../Components/AlertContainer";

export default function EditProfilePage() {
  const { showSuccess, showError, showWarning, showInfo } = useAlert();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "", bio: "",
    skills: [], profileImage: "", location: ""
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setSuccess("");
    setUploadProgress(0);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showError("Please upload an image file (JPG, PNG, etc.)");
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      showError("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please login again.");
      setTimeout(() => navigate("/signin"), 2000);
      return;
    }

    try {
      const data = new FormData();
      data.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/auth/upload-profile-image", true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded * 100) / event.total));
        }
      };

      const result = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (err) {
              reject(new Error("Invalid response from server"));
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              reject(new Error(errorData.message || "Upload failed"));
            } catch (err) {
              reject(new Error("Upload failed. Please try again."));
            }
          }
        };
        xhr.onerror = () => reject(new Error("Network error. Please check your connection."));
        xhr.ontimeout = () => reject(new Error("Upload timed out. Please try again."));
        xhr.timeout = 30000; // 30 second timeout
        xhr.send(data);
      });

      setFormData(prev => ({ ...prev, profileImage: result.imageUrl }));
      setSuccess("Profile image uploaded successfully!");
      showSuccess("Profile image uploaded successfully!");

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.profilePicture = result.imageUrl;
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("profileUpdate"));

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Image upload error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
      showError(err.message || "Failed to upload image. Please try again.");
      e.target.value = "";
    } finally {
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate("/signin");
          return;
        }
        throw new Error("Failed to fetch profile");
      }

      const userData = await response.json();
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        email: userData.email || "",
        bio: userData.bio || "",
        skills: userData.skills || [],
        profileImage: userData.profilePicture || "",
        location: userData.location || ""
      });

      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.profilePicture) {
        existingUser.profilePicture = userData.profilePicture;
        localStorage.setItem("user", JSON.stringify(existingUser));
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError("Failed to load profile data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill) {
      showWarning("Please enter a skill");
      setError("Please enter a skill");
      return;
    }
    if (formData.skills.includes(skill)) {
      showWarning("This skill is already added");
      setError("This skill is already added");
      return;
    }
    if (formData.skills.length >= 10) {
      showWarning("You can add maximum 10 skills");
      setError("You can add maximum 10 skills");
      return;
    }
    setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setNewSkill("");
    setError("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const handleUseCurrentLocation = () => {
    setError("");
    setSuccess("");
    setLocationLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: { "Accept": "application/json" },
              signal: controller.signal
            }
          );

          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error("Failed to fetch location data");
          }

          const data = await res.json();
          const city = data?.address?.city || 
                      data?.address?.town || 
                      data?.address?.village || 
                      data?.address?.suburb || "";
          const state = data?.address?.state || "";
          const loc = [city, state].filter(Boolean).join(", ");

          if (!loc) {
            throw new Error("Could not determine location");
          }

          setFormData(prev => ({ ...prev, location: loc }));
          setSuccess("Location updated successfully!");
          showSuccess("Location updated successfully!");
          setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
          console.error("Geocoding error:", err);
          if (err.name === 'AbortError') {
            setError("Location request timed out. Please try again.");
            showError("Location request timed out. Please try again.");
          } else {
            setError("Could not fetch your address. Please type it manually.");
            showWarning("Could not fetch your address. Please type it manually.");
          }
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        
        let errorMessage = "Unable to get location. ";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += "Please allow location access in your browser settings.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "Please try again or enter manually.";
        }
        
        setError(errorMessage);
        showError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const validateForm = () => {
    if (!formData.firstName?.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName?.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.phone?.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (formData.bio && formData.bio.length > 500) {
      setError("Bio must be less than 500 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please login again.");
      setTimeout(() => navigate("/signin"), 2000);
      setSaving(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
          skills: formData.skills,
          location: formData.location // ✅ FIXED: Now sending location!
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          setTimeout(() => {
            localStorage.clear();
            navigate("/signin");
          }, 2000);
          return;
        }
        throw new Error(data.message || "Failed to update profile");
      }

      setSuccess("Profile updated successfully!");
      showSuccess("Profile updated successfully! Redirecting...");

      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const initials = formData.firstName && formData.lastName
        ? (formData.firstName[0] + formData.lastName[0]).toUpperCase()
        : fullName.substring(0, 2).toUpperCase();

      localStorage.setItem("userName", fullName);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userInitials", initials);

      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({
        ...existingUser,
        ...formData,
        location: formData.location, // ✅ FIXED: Save location to localStorage
        profilePicture: existingUser.profilePicture || formData.profileImage
      }));

      window.dispatchEvent(new Event("profileUpdate"));
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message || "Failed to update profile. Please try again.");
      showError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    return formData.firstName && formData.lastName
      ? (formData.firstName[0] + formData.lastName[0]).toUpperCase()
      : "U";
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}
      
      <Sidebar {...{activeNav, setActiveNav, mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, navigate}} />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header {...{mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed}} />

        <section className="flex-1 overflow-y-auto pb-32 lg:pb-8">
          <div className="bg-white shadow-md overflow-hidden">
            <div className="h-20 md:h-25 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <button onClick={() => navigate("/profile")} className="absolute top-4 left-4 bg-sky-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <div className="px-4 md:px-8 pb-6">
              <div className="flex flex-col items-center -mt-16">
                <div className="relative group">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-2xl" />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center border-4 border-white shadow-2xl">
                      <span className="text-white text-3xl md:text-4xl font-bold">{getInitials()}</span>
                    </div>
                  )}
                  <label className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <FaCamera className="text-white text-2xl" />
                  </label>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-3 w-48">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">Uploading... {uploadProgress}%</p>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Edit Profile</h2>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-4 md:px-6 lg:px-8 mt-4 max-w-5xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white shadow-md p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaEdit className="text-sky-600" />Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input type="email" name="email" value={formData.email} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm" />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                      <div className="flex flex-col md:flex-row gap-2">
                        <div className="relative flex-1">
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="text" name="location" value={formData.location} onChange={handleInputChange} list="locationOptions" placeholder="City, State (e.g., Tiruppur, Tamil Nadu)" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                          <datalist id="locationOptions">
                            <option value="Chennai, Tamil Nadu" />
                            <option value="Coimbatore, Tamil Nadu" />
                            <option value="Tiruppur, Tamil Nadu" />
                            <option value="Bengaluru, Karnataka" />
                            <option value="Hyderabad, Telangana" />
                            <option value="Mumbai, Maharashtra" />
                            <option value="Delhi, Delhi" />
                            <option value="Kochi, Kerala" />
                          </datalist>
                        </div>
                        <button type="button" onClick={handleUseCurrentLocation} disabled={locationLoading} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                          {locationLoading ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Getting...
                            </>
                          ) : "Use current location"}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">This will be shown on your profile.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>About Me
                  </h3>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={5} placeholder="Tell us about yourself..." maxLength={500} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white shadow-md p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>Skills & Expertise
                  </h3>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddSkill(); }}} placeholder="Add a skill..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-all flex items-center gap-1">
                      <FaPlus size={12} /> Add
                    </button>
                  </div>
                  {formData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 font-medium rounded-full text-sm border border-sky-200 flex items-center gap-2">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-sky-700 hover:text-sky-900 transition-colors">
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (<div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">No skills added yet</p>
                      <p className="text-xs text-gray-400 mt-1">Add your skills above</p>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Profile Tips</h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Add a professional photo to increase trust</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Write a detailed bio to showcase your experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Add relevant skills to help clients find you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 pb-4">
              <button type="submit" disabled={saving} className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md">
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : "Save Changes"}
              </button>
              <button type="button" onClick={() => navigate("/profile")} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all">Cancel</button>
            </div>
          </form>
        </section>
        <BottomNav navigate={navigate} activeTab="profile" />
      </main>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Menu,
  Bell,
  User,
  Home,
  PlusCircle,
  MoreHorizontal,
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Upload,
  Lightbulb,
} from "lucide-react";

export default function PostNewTask() {

    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleNavigation = (page) => {
    console.log(`Navigate to: ${page}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const handleSaveDraft = () => console.log("Draft saved:", formData);
  const handleContinue = () => console.log("Continue:", formData);

  const tips = [
    {
      icon: "✏️",
      title: "Clear Title",
      description: "Use specific, descriptive titles that explain exactly what you need",
      color: "bg-blue-300",
    },
    {
      icon: "✅",
      title: "Right Category",
      description: "Choose the most relevant category to reach the right helpers",
      color: "bg-green-300",
    },
    {
      icon: "📸",
      title: "Add Photos",
      description: "Images help helpers understand your task better and get more responses",
      color: "bg-yellow-200",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" style={{ backgroundColor: 'rgba(231, 231, 231, 0.33)' }}>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col text-white flex-shrink-0" style={{ backgroundColor: '#5B86FF', width: '330px' }}>
        <div className="px-7 pt-11 pb-8">
          <h1 className="text-4xl font-bold mb-4">HireHelper</h1>
          <p className="text-xl font-normal">Welcome back, John</p>
        </div>
        <div className="w-full h-px bg-white"></div>
        <nav className="flex-1 pt-10 px-2">
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded" nClick={() => navigate("/feedPage")}>
            <LayoutDashboard size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">Dashboard</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded" onClick={() => navigate('/feedPage')}>
            <List size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">Feed</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded" onClick={() => navigate('/mytasks')}>
            <CheckSquare size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">My Tasks</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded">
            <Mail size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">Requests</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded">
            <Laptop size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">My Requests</span>
          </div>
          <div className="px-6 py-4 mt-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4 transition rounded">
            <Settings size={24} strokeWidth={2} />
            <span className="text-2xl font-normal">Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="hidden lg:flex items-center justify-between text-white px-14 py-6" style={{ backgroundColor: '#5B86FF', height: '85px' }}>
          <div className="flex-1 relative" style={{ maxWidth: '548px' }}>
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-14 pr-4 py-2 rounded-lg text-gray-600 text-xs focus:outline-none shadow-md"
            />
          </div>
          <div className="flex items-center gap-6 ml-12">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <Bell size={40} />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <User size={40} />
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden text-white p-4 shadow-lg" style={{ backgroundColor: '#5B86FF', borderRadius: '0 0 30px 30px' }}>
          <div className="flex items-center justify-between mb-4">
            <button className="p-2">
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <button className="p-2">
              <Bell size={24} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-12 pr-4 py-2 rounded-lg text-gray-600 text-sm focus:outline-none shadow-md"
            />
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 p-4 lg:p-12 overflow-y-auto pb-24 lg:pb-8">
          <div className="mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Post New Task</h2>
            <p className="text-sm lg:text-base font-normal text-black">
              Get help with your task from skilled helpers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Fix leaky faucet"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="gardening">Gardening</option>
                  <option value="painting">Painting</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={150}
                  placeholder="Brief description of your task"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-right text-sm text-gray-500 mt-1">{formData.description.length}/150 characters</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    {imagePreview ? (
                      <div>
                        <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg mb-2" />
                        <p className="text-sm text-gray-600">Click to change image</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                        <p className="text-gray-700 font-medium mb-1">Click to upload</p>
                        <p className="text-sm text-gray-500">or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-yellow-500" size={20} />
                <h3 className="text-lg font-bold text-gray-900">Tips for Success</h3>
              </div>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className={`${tip.color} rounded-lg p-4`}>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{tip.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-700">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 shadow-lg">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('dashboard')}>
              <LayoutDashboard size={28} style={{ color: 'rgba(0, 0, 0, 0.47)' }} />
              <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.47)' }}>Dashboard</span>
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('')}>
              <Home size={28} style={{ color: 'rgba(0, 0, 0, 0.47)' }} />
              <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.47)' }}>Home</span>
            </button>
            <button className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2B5CE6' }}>
              <PlusCircle size={36} className="text-white" />
            </button>
            <button className="flex flex-col items-center gap-1">
              <Mail size={28} style={{ color: 'rgba(0, 0, 0, 0.47)' }} />
              <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.47)' }}>Request</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MoreHorizontal size={28} style={{ color: 'rgba(0, 0, 0, 0.47)' }} />
              <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.47)' }}>More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
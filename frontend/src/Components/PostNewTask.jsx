import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  Bell,
  User,
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
  X,
  ImagePlus,
  Sparkles,
  Home,
} from "lucide-react";

export default function PostNewTask() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('posttask');

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

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

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSaveDraft = () => console.log("Draft saved:", formData);
  const handleContinue = () => console.log("Continue:", formData);

  const isFormValid = formData.title && formData.category && formData.description;

  const tips = [
    {
      icon: <Sparkles className="text-indigo-600" size={20} />,
      title: "Be Specific",
      description: "Clear, detailed titles get 3x more responses from helpers",
      gradient: "from-indigo-50 to-blue-100",
    },
    {
      icon: <CheckSquare className="text-emerald-600" size={20} />,
      title: "Right Category",
      description: "Proper categorization connects you with expert helpers faster",
      gradient: "from-emerald-50 to-green-100",
    },
    {
      icon: <ImagePlus className="text-purple-600" size={20} />,
      title: "Add Visuals",
      description: "Tasks with images receive 2.5x more qualified offers",
      gradient: "from-purple-50 to-purple-100",
    },
  ];

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: List, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: CheckSquare, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: Mail, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: Laptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:flex flex-col text-white flex-shrink-0 fixed top-0 left-0 h-screen shadow-2xl z-30 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700"
        style={{ width: "330px" }}
      >
        <div className="px-8 pt-12 pb-8">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">HireHelper</h1>
          <p className="text-lg text-blue-100">Welcome back, John</p>
        </div>

        <div className="w-full h-px bg-white/20"></div>

        <nav className="flex-1 pt-8 px-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`px-6 py-4 rounded-xl cursor-pointer flex items-center gap-4 transition-all duration-200 ${
                activeNav === item.id
                  ? 'bg-white/25 shadow-lg backdrop-blur-sm'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
              }}
            >
              <item.icon size={24} />
              <span className={`text-xl ${activeNav === item.id ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col" style={{ marginLeft: "0px" }}>
        {/* Header - Desktop */}
        <header
          className="hidden lg:flex items-center justify-between text-white px-12 py-5 shadow-lg sticky top-0 z-40 bg-gradient-to-r from-indigo-600 to-blue-600"
          style={{ marginLeft: "330px" }}
        >
          <div className="flex-1 max-w-xl relative">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks, helpers, or categories..."
              className="w-full pl-14 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-md transition-all"
            />
          </div>
          <div className="flex items-center gap-4 ml-8">
            <button className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 transform hover:scale-110">
              <Bell size={28} />
            </button>
            <button className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 transform hover:scale-110">
              <User size={28} />
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header
          className="lg:hidden text-white p-5 shadow-xl rounded-b-3xl sticky top-0 z-40 bg-gradient-to-br from-indigo-600 to-blue-600"
        >
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Bell size={24} />
            </button>
          </div>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none shadow-md"
            />
          </div>
        </header>

        {/* Content */}
        <section
          className="flex-1 p-6 lg:p-10 overflow-y-auto pb-28 lg:pb-10"
          style={{ marginLeft: "330px" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Post a New Task</h2>
              <p className="text-lg text-gray-600">
                Connect with skilled helpers in your area and get your task done quickly
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100">
                  {/* Task Title */}
                  <div className="mb-6">
                    <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      Task Title
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g., Fix leaky kitchen faucet"
                      className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none transition-all text-lg ${
                        focusedField === 'title' 
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {focusedField === 'title' && (
                      <p className="text-sm text-indigo-600 mt-2">💡 Be specific to attract the right helpers</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      Category
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('category')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none transition-all text-lg ${
                        focusedField === 'category' 
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option value="">Select a category</option>
                      <option value="plumbing">🔧 Plumbing</option>
                      <option value="electrical">⚡ Electrical</option>
                      <option value="carpentry">🔨 Carpentry</option>
                      <option value="cleaning">🧹 Cleaning</option>
                      <option value="gardening">🌱 Gardening</option>
                      <option value="painting">🎨 Painting</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      Task Description
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      maxLength={150}
                      placeholder="Describe your task in detail. Include what needs to be done, any specific requirements, and your timeline..."
                      className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none transition-all resize-none text-lg ${
                        focusedField === 'description' 
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-500">
                        {focusedField === 'description' ? '✍️ Add more details to get better offers' : ''}
                      </p>
                      <p className={`text-base font-medium ${
                        formData.description.length > 140 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {formData.description.length}/150
                      </p>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-8">
                    <label className="block text-lg font-bold text-gray-800 mb-3">
                      Task Image (Optional)
                    </label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      imagePreview 
                        ? 'border-indigo-400 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto max-h-64 rounded-2xl shadow-lg"
                          />
                          <button
                            onClick={removeImage}
                            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg transform hover:scale-110"
                          >
                            <X size={20} />
                          </button>
                          <label htmlFor="imageUpload" className="block mt-4 text-base text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">
                            Change image
                          </label>
                        </div>
                      ) : (
                        <label htmlFor="imageUpload" className="cursor-pointer block">
                          <Upload
                            className="mx-auto text-gray-400 mb-4"
                            size={52}
                          />
                          <p className="text-gray-800 font-semibold mb-2 text-xl">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-base text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSaveDraft}
                      className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={handleContinue}
                      disabled={!isFormValid}
                      className={`flex-1 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                        isFormValid
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 border border-indigo-200 sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-3 rounded-xl shadow-md">
                      <Lightbulb className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Tips for Success
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {tips.map((tip, index) => (
                      <div key={index} className={`bg-gradient-to-br ${tip.gradient} rounded-2xl p-5 shadow-sm border border-white hover:shadow-lg transition-all duration-200`}>
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            {tip.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 text-base">
                              {tip.title}
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-indigo-300">
                    <p className="text-sm text-gray-600 text-center font-medium">
                      💡 Tasks with complete information get responses 50% faster
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/feedPage")}
            >
              <Home size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Home</span>
            </button>

            <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 shadow-2xl transition-all duration-200 hover:scale-110">
              <PlusCircle size={36} className="text-white" />
            </button>

            <button 
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
              onClick={() => navigate("/mytasks")}
            >
              <CheckSquare size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">My Tasks</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <MoreHorizontal size={26} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
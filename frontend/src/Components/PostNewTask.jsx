import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle } from "react-icons/fa6";
import { FaSearch, FaBell, FaUser, FaHome, FaPlusCircle, FaEllipsisH, FaEnvelope, FaUpload, FaLightbulb, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDollarSign } from "react-icons/fa";
import { MdDashboard, MdList, MdCheckBox, MdSettings, MdLaptop, MdClose } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

export default function PostNewTask() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('posttask');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    budget: "",
    urgency: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
    alert("Task saved as draft!");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Adjust if you store auth token elsewhere
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
  const res = await fetch('http://localhost:5000/api/tasks/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      if (!res.ok) throw new Error('Failed to post task');
      await res.json();
      alert('Task posted successfully!');
      navigate('/mytasks');
    } catch (err) {
      alert('Error posting task: ' + err.message);
    }
  };

  const isFormValid = formData.title && formData.category && formData.description && formData.location;

  const tips = [
    {
      icon: "💡",
      title: "Be Specific",
      description: "Clear, detailed titles get 3x more responses from helpers",
      gradient: "from-blue-50 to-sky-100",
    },
    {
      icon: "✅",
      title: "Right Category",
      description: "Proper categorization connects you with expert helpers faster",
      gradient: "from-green-50 to-emerald-100",
    },
    {
      icon: "🖼️",
      title: "Add Visuals",
      description: "Tasks with images receive 2.5x more qualified offers",
      gradient: "from-purple-50 to-purple-100",
    },
  ];

  const navItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'feed', icon: MdList, label: 'Feed', path: '/feedPage' },
    { id: 'mytasks', icon: MdCheckBox, label: 'My Tasks', path: '/mytasks' },
    { id: 'requests', icon: FaEnvelope, label: 'Requests', path: '/requests' },
    { id: 'myrequests', icon: MdLaptop, label: 'My Requests', path: '/myrequests' },
    { id: 'settings', icon: MdSettings, label: 'Settings', path: '/settings' },
  ];

  const categories = [
    "Plumbing", "Electrical", "Carpentry", "Cleaning", "Gardening", 
    "Painting", "Moving", "Assembly", "Delivery", "Other"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - Within 2 weeks" },
    { value: "medium", label: "Medium - Within 1 week" },
    { value: "high", label: "High - Within 3 days" },
    { value: "urgent", label: "Urgent - Within 24 hours" }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`flex flex-col text-white flex-shrink-0 h-screen shadow-2xl z-50 bg-gradient-to-b from-sky-600 to-sky-700 transition-all duration-300 ${
          mobileMenuOpen
            ? "fixed left-0 top-0 w-64"
            : "hidden lg:flex lg:fixed lg:left-0 lg:top-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Collapse Toggle Button - Desktop */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-6 bg-sky-700 hover:bg-sky-800 text-white p-1 rounded-full border-2 border-white shadow-lg z-10"
        >
          {sidebarCollapsed ? <IoIosArrowForward size={16} /> : <IoIosArrowBack size={16} />}
        </button>

        {/* Close Button Mobile */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg"
        >
          <IoIosClose size={24} />
        </button>

        {/* Logo */}
        <div className="px-2 pt-2 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-[48px] h-[48px] bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FaHandshakeAngle className="text-xl font-bold w-[30px] h-[32px]" />
            </div>
            {!sidebarCollapsed && (
            <div className="flex">
              <p className="font-bold text-lg leading-none text-[39px] shadow-xl">Hire</p>
              <p className="text-xs font-semibold leading-none text-[29px] mt-[20px] shadow-xl">Helper</p>
            </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/30"></div>

        {/* Navigation */}
        <nav className="flex-1 pt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-200 ${
                activeNav === item.id
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/10"
              } ${sidebarCollapsed ? "justify-center" : ""}`}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <span
                  className={`text-lg ${
                    activeNav === item.id ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="border-t border-white border-opacity-30 p-4 mt-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                EC
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">Emily Chen</p>
                <p className="text-xs text-white text-opacity-80 truncate">
                  emilychen@gmail.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header - Desktop */}
        <header className="hidden lg:flex items-center justify-between bg-white border-b-2 border-gray-300 px-8 py-4 shadow-sm sticky top-0 z-40">
          <div className="flex-1 max-w-md relative">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-700 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <div className="flex items-center gap-4 ml-8">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <FaBell size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <FaUser size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Header - Mobile */}
        <header className="lg:hidden bg-white border-b-2 border-gray-300 px-4 py-4 sticky top-0 z-40 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <MdList size={24} className="text-gray-600" />
          </button>

          <div className="flex-1 max-w-xs mx-4 relative">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm border border-gray-400 focus:outline-none"
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaBell size={20} className="text-gray-600" />
          </button>
        </header>

        {/* Post Task Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Add New Task
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Create a task and find someone to help you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Details Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Task Details</h3>
                
                {/* Task Title */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g., Help moving furniture"
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    placeholder="Describe what help you need, any requirements, and what you'll provide..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700 resize-none"
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700 bg-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Timing Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location & Timing</h3>
                
                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Downtown Seattle or specific address"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                    />
                  </div>
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Time *
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date (Optional)
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Time (Optional)
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget & Urgency Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Budget & Urgency</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget (Optional)
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-gray-700 bg-white"
                    >
                      <option value="">Select urgency</option>
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Upload Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Task Image (Optional)</h3>
                
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  imagePreview ? 'border-sky-400 bg-sky-50' : 'border-gray-300 hover:border-sky-400 hover:bg-gray-50'
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
                        className="mx-auto max-h-48 rounded-lg shadow-md"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-lg"
                      >
                        <MdClose size={16} />
                      </button>
                      <label htmlFor="imageUpload" className="block mt-3 text-sm text-sky-600 font-medium cursor-pointer hover:text-sky-700">
                        Change image
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="imageUpload" className="cursor-pointer block">
                      <FaUpload className="mx-auto text-gray-400 mb-3" size={32} />
                      <p className="text-gray-800 font-semibold mb-1">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/mytasks')}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all duration-200 border border-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg border border-sky-600 hover:bg-sky-50 transition-all duration-200"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
                    isFormValid
                      ? 'bg-sky-500 hover:bg-sky-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post Task
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-sky-500 p-2 rounded-lg">
                    <FaLightbulb className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Tips for Success
                  </h3>
                </div>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div key={index} className={`bg-gradient-to-br ${tip.gradient} rounded-xl p-4 border border-gray-200`}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{tip.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                            {tip.title}
                          </h4>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center font-medium">
                    💡 Tasks with complete information get responses 50% faster
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 px-2 py-3 shadow-2xl z-50">
          <div className="flex items-center justify-around relative">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110"
            >
              <MdDashboard size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaHome size={24} className="text-sky-600" />
              <span className="text-xs font-bold text-sky-600">Home</span>
            </button>

            <button className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-sky-500 shadow-2xl transition-all duration-200 hover:scale-110">
              <FaPlusCircle size={32} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaEnvelope size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">Request</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-all hover:scale-110">
              <FaEllipsisH size={24} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { FaUpload, FaLightbulb, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDollarSign } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const TaskForm = ({ navigate, editTask = null }) => {
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
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load task data if editing
  useEffect(() => {
    if (editTask) {
      setIsEditMode(true);
      setFormData({
        title: editTask.title || "",
        category: editTask.category || "",
        description: editTask.description || "",
        location: editTask.location || "",
        startDate: editTask.startDate ? new Date(editTask.startDate).toISOString().split('T')[0] : "",
        startTime: editTask.startTime || "",
        endDate: editTask.endDate ? new Date(editTask.endDate).toISOString().split('T')[0] : "",
        endTime: editTask.endTime || "",
        budget: editTask.budget || "",
        urgency: editTask.urgency || "",
        image: null,
      });
      
      // Set image preview if task has an image
      if (editTask.imageUrl) {
        setImagePreview(editTask.imageUrl);
      }
    }
  }, [editTask]);

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

  const handleSaveDraft = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to save a draft');
      navigate('/login');
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    
    // Append all form data (even if empty - we'll use defaults on backend)
    submitData.append('title', formData.title || 'Untitled Draft');
    submitData.append('category', formData.category || 'other');
    submitData.append('description', formData.description || '');
    submitData.append('location', formData.location || '');
    
    // Append optional fields only if they have values
    if (formData.startDate) submitData.append('startDate', formData.startDate);
    if (formData.startTime) submitData.append('startTime', formData.startTime);
    if (formData.endDate) submitData.append('endDate', formData.endDate);
    if (formData.endTime) submitData.append('endTime', formData.endTime);
    if (formData.budget) submitData.append('budget', formData.budget);
    if (formData.urgency) submitData.append('urgency', formData.urgency);
    
    // Set status as draft if updating
    if (isEditMode) {
      submitData.append('status', 'draft');
    }
    
    // Append image if exists
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      // Use update endpoint if editing, otherwise create new draft
      const url = isEditMode 
        ? `http://localhost:5000/api/tasks/${editTask._id}`
        : 'http://localhost:5000/api/tasks/draft';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || result.error || 'Failed to save draft');
      }

      alert(isEditMode ? 'Draft updated successfully!' : 'Draft saved successfully!');
      navigate('/mytasks');
      
    } catch (err) {
      console.error('Error saving draft:', err);
      alert('Error saving draft: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // In TaskForm.jsx - Update the handleSubmit function

const handleSubmit = async () => {
  // Validate required fields
  if (!formData.title || !formData.category || !formData.description || !formData.location) {
    alert('Please fill in all required fields');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to post a task');
    navigate('/login');
    return;
  }

  setLoading(true);
  const submitData = new FormData();
  
  // Append all form data
  submitData.append('title', formData.title);
  submitData.append('category', formData.category);
  submitData.append('description', formData.description);
  submitData.append('location', formData.location);
  
  // Append optional fields only if they have values
  if (formData.startDate) submitData.append('startDate', formData.startDate);
  if (formData.startTime) submitData.append('startTime', formData.startTime);
  if (formData.endDate) submitData.append('endDate', formData.endDate);
  if (formData.endTime) submitData.append('endTime', formData.endTime);
  if (formData.budget) submitData.append('budget', formData.budget);
  if (formData.urgency) submitData.append('urgency', formData.urgency);
  
  // Set status as active when posting
  if (isEditMode) {
    submitData.append('status', 'active');
  }
  
  // Append image if exists
  if (formData.image) {
    submitData.append('image', formData.image);
  }

  try {
    console.log('Submitting task data:', {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      hasImage: !!formData.image,
      isEditMode: isEditMode
    });

    // Use update endpoint if editing, otherwise create new task
    const url = isEditMode 
      ? `http://localhost:5000/api/tasks/${editTask._id}`
      : 'http://localhost:5000/api/tasks/create';
    
    const method = isEditMode ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData - let browser set it with boundary
      },
      body: submitData
    });

    const result = await res.json();
    console.log('Server response:', result);

    if (!res.ok) {
      throw new Error(result.message || result.error || `HTTP ${res.status}: Failed to ${isEditMode ? 'update' : 'post'} task`);
    }

    alert(isEditMode ? 'Task updated successfully!' : 'Task posted successfully!');
    navigate('/mytasks');
    
  } catch (err) {
    console.error('Error posting task:', err);
    alert('Error posting task: ' + err.message);
  } finally {
    setLoading(false);
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
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all duration-200 border border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg border border-sky-600 hover:bg-sky-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Updating...' : 'Saving...'}
              </span>
            ) : (
              isEditMode ? 'Update Draft' : 'Save Draft'
            )}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
              isFormValid && !loading
                ? 'bg-sky-500 hover:bg-sky-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Updating...' : 'Posting...'}
              </span>
            ) : (
              isEditMode ? 'Update Task' : 'Post Task'
            )}
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
  );
};

export default TaskForm;
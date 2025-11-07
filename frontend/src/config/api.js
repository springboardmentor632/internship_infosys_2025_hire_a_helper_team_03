// API Configuration
// This ensures the API works on both desktop and mobile devices

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  SEND_OTP: `${API_BASE_URL}/api/auth/send-otp`,
  VERIFY_REGISTER: `${API_BASE_URL}/api/auth/verify-register`,
  RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  
  // Task endpoints
  TASKS_ALL: `${API_BASE_URL}/api/tasks/all`,
  TASKS_MY: `${API_BASE_URL}/api/tasks/mytasks`,
  TASKS_CREATE: `${API_BASE_URL}/api/tasks/create`,
  TASKS_DRAFT: `${API_BASE_URL}/api/tasks/draft`,
  TASK_BY_ID: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  TASK_UPDATE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  TASK_DELETE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  TASK_STATUS: (id) => `${API_BASE_URL}/api/tasks/${id}/status`,
  TASK_PUBLISH: (id) => `${API_BASE_URL}/api/tasks/${id}/publish`,
  
  // Request endpoints
  REQUESTS_CREATE: `${API_BASE_URL}/api/requests`,
  REQUESTS_OWNER: `${API_BASE_URL}/api/requests/owner`,
  REQUESTS_ME: `${API_BASE_URL}/api/requests/me`,
  REQUESTS_UPDATE: (id) => `${API_BASE_URL}/api/requests/${id}`,

  // Notifications
  NOTIFICATIONS_LIST: `${API_BASE_URL}/api/notifications`,
  NOTIFICATIONS_MARK_READ: (id) => `${API_BASE_URL}/api/notifications/${id}/read`,
  NOTIFICATIONS_DELETE: (id) => `${API_BASE_URL}/api/notifications/${id}`,
};

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper function for API calls with error handling
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_BASE_URL;

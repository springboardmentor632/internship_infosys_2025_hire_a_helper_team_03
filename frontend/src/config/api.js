// API Configuration
// This ensures the API works on both desktop and mobile devices

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
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
  
  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  USER_UPDATE: `${API_BASE_URL}/api/user/update`,
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

import axios from 'axios';
import { auth } from './firebase';

// Determine API URL based on environment
const getApiUrl = () => {
  // Check if we have an explicit API URL in env
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in development (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
  
  if (isDevelopment) {
    // Default to localhost for development
    return 'https://portfolio-rishu.onrender.com';
  }
  
  // For production, you should set VITE_API_URL in your environment variables
  // For now, return a placeholder that you need to replace
  console.warn('VITE_API_URL not set. Please set your backend URL in environment variables.');
  return 'https://portfolio-rishu.onrender.com'; // Fallback - update this with your production backend URL
};

const API_URL = "https://portfolio-rishu.onrender.com/api";


console.log('🔗 API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.warn('Failed to get auth token:', error);
        // Continue without token for public routes
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    });
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please check if the backend server is running.'));
    }
    
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const message = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to the server. Please check:\n1. Backend server is running\n2. Correct API URL is configured\n3. Your internet connection'
        : 'Network error occurred';
      return Promise.reject(new Error(message));
    }
    
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Unauthorized. Please login.'));
    }
    
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found.'));
    }
    
    if (error.response?.status === 500) {
      return Promise.reject(new Error(error.response?.data?.message || 'Server error. Please try again later.'));
    }
    
    // Return the error message from the server if available
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;

import axios from 'axios';
import { API_BASE_URL, API_VERSION, API_TIMEOUT } from '../../config/env';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error responses
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const status = error.response.status;
      
      // Unauthorized error handling
      if (status === 401) {
        localStorage.removeItem('auth_token');
        // Could also redirect to login page here
      }
      
      // Rate limiting
      if (status === 429) {
        console.warn('Rate limit exceeded. Please try again later.');
      }
      
      // Server error
      if (status >= 500) {
        console.error('Server error occurred', error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 
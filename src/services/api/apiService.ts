import apiClient from './config';
import { API_ENDPOINTS } from '../../config/env';

// Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences?: string[];
}

export interface DocSearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  relevance: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface UserFeedback {
  rating: number;
  comment?: string;
  page?: string;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  additionalInfo?: string;
  url: string;
  userAgent: string;
  timestamp: string;
}

// General API service
const apiService = {
  /**
   * Submit contact form
   */
  submitContactForm: async (formData: ContactFormData): Promise<{ success: boolean; messageId: string }> => {
    const response = await apiClient.post(API_ENDPOINTS.CONTACT_FORM, formData);
    return response.data;
  },

  /**
   * Subscribe to newsletter
   */
  subscribeToNewsletter: async (data: NewsletterSubscription): Promise<{ success: boolean }> => {
    const response = await apiClient.post(API_ENDPOINTS.NEWSLETTER, data);
    return response.data;
  },

  /**
   * Unsubscribe from newsletter
   */
  unsubscribeFromNewsletter: async (email: string, token: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post('/newsletter/unsubscribe', { email, token });
    return response.data;
  },

  /**
   * Search documentation
   */
  searchDocs: async (query: string): Promise<DocSearchResult[]> => {
    const response = await apiClient.get<DocSearchResult[]>(`/docs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Get framework status (versions, server status, etc.)
   */
  getFrameworkStatus: async (): Promise<{
    latestVersion: string;
    apiStatus: 'operational' | 'degraded' | 'outage';
    services: Record<string, 'operational' | 'degraded' | 'outage'>;
    uptime: number;
  }> => {
    const response = await apiClient.get('/status');
    return response.data;
  },

  /**
   * Get framework roadmap
   */
  getRoadmap: async (): Promise<{
    current: string;
    next: string;
    upcoming: { version: string; features: string[]; estimatedRelease: string }[];
  }> => {
    const response = await apiClient.get('/roadmap');
    return response.data;
  },

  /**
   * User authentication
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, { name, email, password });
    return response.data;
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const response = await apiClient.get(API_ENDPOINTS.CURRENT_USER);
    return response.data;
  },
  
  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, { email });
    return response.data;
  },
  
  /**
   * Submit user feedback
   */
  submitFeedback: async (feedback: UserFeedback): Promise<{ success: boolean }> => {
    const response = await apiClient.post('/feedback', feedback);
    return response.data;
  },

  /**
   * Reports an error to the backend
   */
  reportError: async (errorData: ErrorReport): Promise<{ success: boolean }> => {
    const response = await apiClient.post('/error-reports', errorData);
    return response.data;
  },
  
  /**
   * Get system status information
   */
  getSystemStatus: async (): Promise<{
    status: string;
    uptime: number;
    memoryUsage: string;
    cpuUsage: string;
  }> => {
    const response = await apiClient.get('/system/status');
    return response.data;
  },

  /**
   * Logs out the current user
   */
  logout: async (): Promise<{ success: boolean }> => {
    const response = await apiClient.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  }
};

export default apiService; 
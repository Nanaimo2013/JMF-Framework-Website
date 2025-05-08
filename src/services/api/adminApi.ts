import apiClient from './config';
import { API_ENDPOINTS, isDevelopment, DEV } from '../../config/env';
import { Release, Platform, ReleaseType } from './downloadsApi';
import { DocSection } from './docsApi';

// Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface AdminStats {
  totalReleases: number;
  totalDownloads: number;
  totalDocPages: number;
  activeUsers: number;
  lastUpdated: string;
}

// Mock data for development
const MOCK_ADMIN_STATS: AdminStats = {
  totalReleases: 12,
  totalDownloads: 45678,
  totalDocPages: 24,
  activeUsers: 890,
  lastUpdated: new Date().toISOString()
};

// Admin API service
const adminApi = {
  /**
   * Upload a file
   * @param file - File to upload
   * @param type - Type of file (release, image, document)
   */
  uploadFile: async (file: File, type: 'release' | 'image' | 'document'): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await apiClient.post(API_ENDPOINTS.ADMIN_UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  /**
   * Create a new release
   */
  createRelease: async (release: Omit<Release, 'id'>): Promise<Release> => {
    const response = await apiClient.post(API_ENDPOINTS.ADMIN_RELEASES, release);
    return response.data;
  },

  /**
   * Update an existing release
   */
  updateRelease: async (id: string, release: Partial<Release>): Promise<Release> => {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN_RELEASES}/${id}`, release);
    return response.data;
  },

  /**
   * Delete a release
   */
  deleteRelease: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.ADMIN_RELEASES}/${id}`);
  },

  /**
   * Upload a release binary
   * @param version - Version string
   * @param platform - Target platform
   * @param file - Binary file
   */
  uploadReleaseBinary: async (version: string, platform: Platform, file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('version', version);
    formData.append('platform', platform);
    
    const response = await apiClient.post(`${API_ENDPOINTS.ADMIN_RELEASES}/binary`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  /**
   * Create a new documentation section
   */
  createDocSection: async (section: Omit<DocSection, 'id'>): Promise<DocSection> => {
    const response = await apiClient.post(API_ENDPOINTS.ADMIN_DOCS, section);
    return response.data;
  },

  /**
   * Update a documentation section
   */
  updateDocSection: async (id: string, section: Partial<DocSection>): Promise<DocSection> => {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN_DOCS}/${id}`, section);
    return response.data;
  },

  /**
   * Delete a documentation section
   */
  deleteDocSection: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.ADMIN_DOCS}/${id}`);
  },

  /**
   * Reorder documentation sections
   */
  reorderDocSections: async (sections: { id: string, order: number }[]): Promise<void> => {
    await apiClient.put(`${API_ENDPOINTS.ADMIN_DOCS}/reorder`, { sections });
  },

  /**
   * Get admin dashboard statistics
   */
  getAdminStats: async (): Promise<AdminStats> => {
    // Use mock data if in development mode and mock API is enabled
    if (isDevelopment() && DEV.MOCK_API) {
      return Promise.resolve(MOCK_ADMIN_STATS);
    }
    
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      
      // Fallback to mock data if API call fails
      if (isDevelopment()) {
        console.warn('Falling back to mock admin stats data');
        return MOCK_ADMIN_STATS;
      }
      
      throw error;
    }
  }
};

export default adminApi; 
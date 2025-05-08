import apiClient from './config';
import { API_ENDPOINTS } from '../../config/env';

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  message?: string;
  lastUpdated: string;
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  description?: string;
  uptime: number; // in percentage
  responseTime?: number; // in ms
  lastUpdated: string;
}

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'critical' | 'major' | 'minor';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  affectedServices: string[]; // service IDs
  updates: IncidentUpdate[];
}

export interface IncidentUpdate {
  id: string;
  message: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  createdAt: string;
}

export interface StatusMetrics {
  uptime: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  responseTime: {
    current: number;
    daily: number[];
    weekly: number[];
  };
  incidents: {
    total: number;
    resolved: number;
    ongoing: number;
  };
}

export interface StatusPageData {
  system: SystemStatus;
  services: ServiceStatus[];
  incidents: IncidentReport[];
  metrics: StatusMetrics;
}

const statusApi = {
  /**
   * Get complete status page data
   */
  getStatusPageData: async (): Promise<StatusPageData> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}`);
    return response.data;
  },

  /**
   * Get current system status
   */
  getSystemStatus: async (): Promise<SystemStatus> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/system`);
    return response.data;
  },

  /**
   * Get all service statuses
   */
  getAllServiceStatuses: async (): Promise<ServiceStatus[]> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/services`);
    return response.data;
  },

  /**
   * Get a specific service status
   */
  getServiceStatus: async (serviceId: string): Promise<ServiceStatus> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/services/${serviceId}`);
    return response.data;
  },

  /**
   * Get all incidents
   */
  getAllIncidents: async (): Promise<IncidentReport[]> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/incidents`);
    return response.data;
  },

  /**
   * Get a specific incident
   */
  getIncident: async (incidentId: string): Promise<IncidentReport> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/incidents/${incidentId}`);
    return response.data;
  },

  /**
   * Get performance metrics
   */
  getPerformanceMetrics: async (): Promise<StatusMetrics> => {
    const response = await apiClient.get(`${API_ENDPOINTS.STATUS}/metrics`);
    return response.data;
  },

  /**
   * Report a new issue
   */
  reportIssue: async (issue: { 
    title: string; 
    description: string; 
    service?: string;
    email?: string;
  }): Promise<{ success: boolean; issueId: string }> => {
    const response = await apiClient.post(`${API_ENDPOINTS.STATUS}/report-issue`, issue);
    return response.data;
  },

  /**
   * Subscribe to status updates
   */
  subscribeToUpdates: async (email: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post(`${API_ENDPOINTS.STATUS}/subscribe`, { email });
    return response.data;
  }
};

export default statusApi; 
import apiClient from './config';

// Types
export type Platform = 'windows' | 'linux' | 'macos';
export type ReleaseType = 'stable' | 'beta' | 'alpha';

export interface Release {
  id: string;
  version: string;
  type: ReleaseType;
  date: string;
  platforms: Platform[];
  size: string;
  majorVersion: string;
  releaseNotes: string;
  downloadUrl: Record<Platform, string>;
  changelog: {
    type: string;
    text: string;
  }[];
}

export interface DownloadStats {
  totalDownloads: number;
  downloadsByVersion: Record<string, number>;
  downloadsByPlatform: Record<Platform, number>;
}

// API functions
const downloadsApi = {
  /**
   * Get all available releases
   */
  getAllReleases: async (): Promise<Release[]> => {
    const response = await apiClient.get<Release[]>('/releases');
    return response.data;
  },

  /**
   * Get releases filtered by type
   * @param type - Release type (stable, beta, alpha, or all)
   */
  getReleasesByType: async (type: ReleaseType | 'all'): Promise<Release[]> => {
    const url = type === 'all' ? '/releases' : `/releases?type=${type}`;
    const response = await apiClient.get<Release[]>(url);
    return response.data;
  },

  /**
   * Get a specific release by version
   * @param version - Version string (e.g. "1.2.0")
   */
  getReleaseByVersion: async (version: string): Promise<Release> => {
    const response = await apiClient.get<Release>(`/releases/${version}`);
    return response.data;
  },

  /**
   * Get the latest release (optionally by type)
   * @param type - Release type (defaults to stable)
   */
  getLatestRelease: async (type: ReleaseType = 'stable'): Promise<Release> => {
    const response = await apiClient.get<Release>(`/releases/latest?type=${type}`);
    return response.data;
  },

  /**
   * Download a specific release
   * @param version - Version string
   * @param platform - Target platform
   */
  downloadRelease: async (version: string, platform: Platform): Promise<Blob> => {
    const response = await apiClient.get<Blob>(
      `/download/${version}/${platform}`,
      {
        responseType: 'blob'
      }
    );
    return response.data;
  },

  /**
   * Track download event
   * @param version - Version string
   * @param platform - Target platform
   */
  trackDownload: async (version: string, platform: Platform): Promise<void> => {
    await apiClient.post('/analytics/download', {
      version,
      platform,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  },

  /**
   * Get download statistics
   */
  getDownloadStats: async (): Promise<DownloadStats> => {
    const response = await apiClient.get<DownloadStats>('/analytics/downloads');
    return response.data;
  },

  /**
   * Check for updates based on current version
   * @param currentVersion - Current version string
   */
  checkForUpdates: async (currentVersion: string): Promise<{
    hasUpdate: boolean;
    latestVersion: string;
    downloadUrl: string;
  }> => {
    const response = await apiClient.get(`/updates/check?currentVersion=${currentVersion}`);
    return response.data;
  }
};

export default downloadsApi; 
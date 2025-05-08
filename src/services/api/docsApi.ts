import apiClient from './config';

// Types
export interface DocSection {
  id: string;
  title: string;
  path: string;
  content: string;
  order: number;
  lastUpdated: string;
  parentId: string | null;
  children?: DocSection[];
}

export interface ApiMethod {
  id: string;
  name: string;
  description: string;
  module: string;
  signature: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
    defaultValue?: string;
  }[];
  returnType: string;
  returnDescription: string;
  examples: {
    title: string;
    code: string;
    output?: string;
  }[];
  since: string;
  deprecated?: {
    version: string;
    alternative: string;
    message: string;
  };
  tags: string[];
}

export interface SearchResult {
  section: string;
  title: string;
  path: string;
  excerpt: string;
  score: number;
}

// Documentation API service
const docsApi = {
  /**
   * Get the documentation table of contents
   */
  getTableOfContents: async (): Promise<DocSection[]> => {
    const response = await apiClient.get<DocSection[]>('/docs/toc');
    return response.data;
  },

  /**
   * Get a specific documentation section by path
   */
  getSection: async (path: string): Promise<DocSection> => {
    const response = await apiClient.get<DocSection>(`/docs/section/${path}`);
    return response.data;
  },

  /**
   * Search the documentation
   */
  search: async (query: string): Promise<SearchResult[]> => {
    const response = await apiClient.get<SearchResult[]>(`/docs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Get API reference data for a specific module
   */
  getApiReference: async (module: string): Promise<ApiMethod[]> => {
    const response = await apiClient.get<ApiMethod[]>(`/docs/api/${module}`);
    return response.data;
  },

  /**
   * Get all available API modules
   */
  getApiModules: async (): Promise<{
    id: string;
    name: string;
    description: string;
    methodCount: number;
  }[]> => {
    const response = await apiClient.get('/docs/api/modules');
    return response.data;
  },

  /**
   * Submit feedback on a documentation section
   */
  submitFeedback: async (sectionId: string, helpful: boolean, comment?: string): Promise<void> => {
    await apiClient.post('/docs/feedback', {
      sectionId,
      helpful,
      comment,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Report a documentation issue
   */
  reportIssue: async (sectionId: string, description: string, contactEmail?: string): Promise<{
    issueId: string;
    status: string;
  }> => {
    const response = await apiClient.post('/docs/report-issue', {
      sectionId,
      description,
      contactEmail,
      timestamp: new Date().toISOString()
    });
    return response.data;
  },

  /**
   * Get documentation version info
   */
  getVersionInfo: async (): Promise<{
    current: string;
    lastUpdated: string;
    versions: { version: string; releaseDate: string }[];
  }> => {
    const response = await apiClient.get('/docs/version');
    return response.data;
  }
};

export default docsApi; 
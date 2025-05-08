/**
 * Environment variables configuration
 * 
 * This file provides a centralized way to access environment variables with fallbacks.
 * All environment variables used in the application should be accessed through this file.
 */

// Site Configuration
export const SITE_TITLE = import.meta.env.VITE_SITE_TITLE || 'JMF Framework';
export const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION || 'The modern JavaScript framework for building scalable applications';
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:3000';
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'support@jmf-framework.com';

// Server Configuration
export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || 3000;
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

// API Endpoints
export const API_ENDPOINTS = {
  DOWNLOADS: import.meta.env.VITE_API_ENDPOINT_DOWNLOADS || '/downloads',
  DOCS: import.meta.env.VITE_API_ENDPOINT_DOCS || '/documentation',
  CONTACT: import.meta.env.VITE_API_ENDPOINT_CONTACT || '/contact',
  AUTH: import.meta.env.VITE_API_ENDPOINT_AUTH || '/auth',
  ADMIN: import.meta.env.VITE_API_ENDPOINT_ADMIN || '/admin',
  ADMIN_RELEASES: import.meta.env.VITE_API_ENDPOINT_ADMIN_RELEASES || '/admin/releases',
  ADMIN_DOCS: import.meta.env.VITE_API_ENDPOINT_ADMIN_DOCS || '/admin/docs',
  ADMIN_UPLOAD: import.meta.env.VITE_API_ENDPOINT_ADMIN_UPLOAD || '/admin/upload',
  STATUS: import.meta.env.VITE_API_ENDPOINT_STATUS || '/status',
};

// Admin Configuration
export const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
export const ADMIN_SESSION_DURATION = Number(import.meta.env.VITE_ADMIN_SESSION_DURATION) || 86400000; // 24 hours in ms

// Feature Flags
export const FEATURES = {
  DOCUMENTATION_ENABLED: import.meta.env.VITE_FEATURE_DOCUMENTATION_ENABLED !== 'false',
  DOWNLOADS_ENABLED: import.meta.env.VITE_FEATURE_DOWNLOADS_ENABLED !== 'false',
  CONTACT_FORM_ENABLED: import.meta.env.VITE_FEATURE_CONTACT_FORM_ENABLED !== 'false',
  STATUS_PAGE_ENABLED: import.meta.env.VITE_FEATURE_STATUS_PAGE_ENABLED !== 'false',
};

// Analytics and Tracking
export const ANALYTICS = {
  ENABLED: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  ID: import.meta.env.VITE_ANALYTICS_ID || '',
};

// Cache Configuration
export const CACHE_DURATION = Number(import.meta.env.VITE_CACHE_DURATION) || 3600000; // 1 hour in ms

// Development Settings
export const DEV = {
  MOCK_API: import.meta.env.VITE_DEV_MOCK_API !== 'false',
  LOGS_ENABLED: import.meta.env.VITE_DEV_LOGS_ENABLED !== 'false',
};

// Helper function to check if running in development mode
export const isDevelopment = () => import.meta.env.DEV === true;

// Helper function to check if running in production mode
export const isProduction = () => import.meta.env.PROD === true;

// Consolidated configuration object for easy access
export const APP_CONFIG = {
  APP_NAME: SITE_TITLE,
  APP_DESCRIPTION: SITE_DESCRIPTION,
  APP_URL: SITE_URL,
  CONTACT_EMAIL,
  SERVER_PORT,
  API_TIMEOUT,
  API_BASE_URL,
  API_VERSION,
  API_ENDPOINTS,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ADMIN_SESSION_DURATION,
  FEATURES,
  ANALYTICS,
  CACHE_DURATION,
  DEV,
  isDevelopment,
  isProduction
}; 
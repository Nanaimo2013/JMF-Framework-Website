import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAdmin } from '../../context/AuthContext';
import adminApi, { AdminStats } from '../../services/api/adminApi';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/AdminDashboard.css';
import { APP_CONFIG } from '../../config/env';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotification();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await adminApi.getAdminStats();
        setStats(data);
        
        // Mock recent activity - in a real app this would come from the API
        setRecentActivity([
          { type: 'release', action: 'created', target: 'v2.1.0', date: new Date(Date.now() - 24 * 60 * 60 * 1000), user: 'Admin' },
          { type: 'doc', action: 'updated', target: 'API Reference', date: new Date(Date.now() - 48 * 60 * 60 * 1000), user: 'Admin' },
          { type: 'file', action: 'uploaded', target: 'example-file.zip', date: new Date(Date.now() - 72 * 60 * 60 * 1000), user: 'Admin' },
        ]);
      } catch (error) {
        console.error('Failed to load admin stats', error);
        addNotification('Failed to load admin statistics', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [addNotification]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'release':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="activity-icon release">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
        );
      case 'doc':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="activity-icon doc">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'file':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="activity-icon file">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="activity-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{APP_CONFIG.APP_NAME} Admin Dashboard</h1>
        <p className="admin-subheader">Manage your content, releases, and documentation</p>
      </div>

      <div className="admin-dashboard-layout">
        <div className="admin-main-content">
          {isLoading ? (
            <div className="admin-loading">
              <div className="loading-spinner"></div>
              <p>Loading admin dashboard...</p>
            </div>
          ) : (
            <>
              {stats && (
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <h3>Total Releases</h3>
                    <div className="stat-value">{stats.totalReleases}</div>
                    <div className="stat-chart">
                      <div className="stat-chart-bar" style={{ width: `${Math.min(100, stats.totalReleases * 5)}%` }}></div>
                    </div>
                    <div className="stat-action">
                      <Link to="/admin/releases">Manage Releases</Link>
                    </div>
                  </div>
                  
                  <div className="admin-stat-card">
                    <h3>Total Downloads</h3>
                    <div className="stat-value">{stats.totalDownloads.toLocaleString()}</div>
                    <div className="stat-chart">
                      <div className="stat-chart-bar" style={{ width: `${Math.min(100, (stats.totalDownloads / 1000) * 2)}%` }}></div>
                    </div>
                    <div className="stat-action">
                      <Link to="/admin/analytics">View Analytics</Link>
                    </div>
                  </div>
                  
                  <div className="admin-stat-card">
                    <h3>Doc Pages</h3>
                    <div className="stat-value">{stats.totalDocPages}</div>
                    <div className="stat-chart">
                      <div className="stat-chart-bar" style={{ width: `${Math.min(100, stats.totalDocPages * 2)}%` }}></div>
                    </div>
                    <div className="stat-action">
                      <Link to="/admin/docs">Manage Documentation</Link>
                    </div>
                  </div>
                  
                  <div className="admin-stat-card">
                    <h3>Active Users</h3>
                    <div className="stat-value">{stats.activeUsers}</div>
                    <div className="stat-chart">
                      <div className="stat-chart-bar" style={{ width: `${Math.min(100, stats.activeUsers / 10)}%` }}></div>
                    </div>
                    <div className="stat-action">
                      <Link to="/admin/users">Manage Users</Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="admin-quick-access">
                <h2>Quick Access</h2>
                <div className="quick-access-grid">
                  <Link to="/admin/files" className="quick-access-item">
                    <div className="quick-access-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </div>
                    <span>File Manager</span>
                  </Link>
                  
                  <Link to="/admin/uploads" className="quick-access-item">
                    <div className="quick-access-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <span>Upload Files</span>
                  </Link>
                  
                  <Link to="/admin/releases/new" className="quick-access-item">
                    <div className="quick-access-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </div>
                    <span>New Release</span>
                  </Link>
                  
                  <Link to="/admin/docs/new" className="quick-access-item">
                    <div className="quick-access-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <span>New Doc Page</span>
                  </Link>
                </div>
              </div>

              <div className="admin-actions">
                <h2>Management</h2>
                <div className="admin-actions-grid">
                  <Link to="/admin/releases" className="admin-action-card">
                    <div className="action-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        <line x1="16" y1="8" x2="2" y2="22"></line>
                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                      </svg>
                    </div>
                    <h3>Release Manager</h3>
                    <p>Manage software releases, versions, and changelog</p>
                  </Link>

                  <Link to="/admin/docs" className="admin-action-card">
                    <div className="action-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <h3>Documentation Editor</h3>
                    <p>Create and edit documentation pages and organize content</p>
                  </Link>

                  <Link to="/admin/files" className="admin-action-card">
                    <div className="action-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </div>
                    <h3>File Manager</h3>
                    <p>Browse, upload, and organize files and media</p>
                  </Link>

                  <Link to="/admin/settings" className="admin-action-card">
                    <div className="action-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </div>
                    <h3>Site Settings</h3>
                    <p>Configure website settings and options</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="admin-sidebar">
          <div className="admin-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div className="activity-item" key={index}>
                  <div className="activity-icon-wrapper">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-details">
                    <div className="activity-action">
                      <strong>{activity.user}</strong> {activity.action} {activity.type} <strong>{activity.target}</strong>
                    </div>
                    <div className="activity-time">
                      {activity.date.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="admin-system-status">
            <h2>System Status</h2>
            <div className="status-item">
              <span className="status-label">API Connection</span>
              <span className="status-value">
                <span className="status-indicator online"></span> Online
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Server Load</span>
              <span className="status-value">12%</span>
            </div>
            <div className="status-item">
              <span className="status-label">Storage Usage</span>
              <span className="status-value">428 MB / 10 GB</span>
            </div>
            <div className="status-item">
              <span className="status-label">Last Backup</span>
              <span className="status-value">Today, 03:45 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-footer">
        <p>Last updated: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Loading...'}</p>
        <p><Link to="/" className="back-to-site">Back to Website</Link></p>
      </div>
    </div>
  );
};

export default withAdmin(AdminDashboard); 
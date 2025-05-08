import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import statusApi, { StatusPageData, ServiceStatus, IncidentReport } from '../services/api/statusApi';
import { useNotification } from '../components/NotificationManager';
import '../styles/StatusPage.css';

const StatusPage: React.FC = () => {
  const [statusData, setStatusData] = useState<StatusPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'history'>('overview');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchStatusData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchStatusData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatusData = async () => {
    try {
      setIsLoading(true);
      const data = await statusApi.getStatusPageData();
      setStatusData(data);
    } catch (error) {
      console.error('Failed to load status data', error);
      addNotification('Failed to load system status information', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Status indicator component
  const StatusIndicator: React.FC<{ status: ServiceStatus['status'] }> = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'operational': return '#2ecc71';
        case 'degraded': return '#f39c12';
        case 'outage': return '#e74c3c';
        case 'maintenance': return '#3498db';
        default: return '#95a5a6';
      }
    };

    const getStatusText = () => {
      switch (status) {
        case 'operational': return 'Operational';
        case 'degraded': return 'Degraded';
        case 'outage': return 'Outage';
        case 'maintenance': return 'Maintenance';
        default: return 'Unknown';
      }
    };

    return (
      <div className="status-indicator" style={{ backgroundColor: getStatusColor() }}>
        {getStatusText()}
      </div>
    );
  };

  // Report issue form
  const ReportIssueModal: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [affectedService, setAffectedService] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!title || !description) {
        addNotification('Please fill in the required fields', 'error');
        return;
      }
      
      try {
        setIsSubmitting(true);
        await statusApi.reportIssue({
          title,
          description,
          service: affectedService || undefined,
          email: email || undefined
        });
        
        addNotification('Issue report submitted successfully', 'success');
        setIsReportModalOpen(false);
      } catch (error) {
        console.error('Failed to submit issue report', error);
        addNotification('Failed to submit issue report', 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="status-modal report-issue-modal">
          <button className="modal-close" onClick={() => setIsReportModalOpen(false)}>×</button>
          <h2>Report an Issue</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="issue-title">Title*</label>
              <input
                type="text"
                id="issue-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issue-service">Affected Service</label>
              <select
                id="issue-service"
                value={affectedService}
                onChange={(e) => setAffectedService(e.target.value)}
              >
                <option value="">Select a service</option>
                {statusData?.services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="issue-description">Description*</label>
              <textarea
                id="issue-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue in detail including steps to reproduce if applicable"
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issue-email">Email (optional)</label>
              <input
                type="email"
                id="issue-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com - to receive updates on this issue"
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Subscribe to updates modal
  const SubscribeModal: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email) {
        addNotification('Please enter your email address', 'error');
        return;
      }
      
      try {
        setIsSubmitting(true);
        await statusApi.subscribeToUpdates(email);
        
        addNotification('You have been subscribed to status updates', 'success');
        setIsSubscribeModalOpen(false);
      } catch (error) {
        console.error('Failed to subscribe', error);
        addNotification('Failed to subscribe to updates', 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="status-modal subscribe-modal">
          <button className="modal-close" onClick={() => setIsSubscribeModalOpen(false)}>×</button>
          <h2>Subscribe to Status Updates</h2>
          <p>Get notified when services go down or incidents are resolved.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subscribe-email">Email Address</label>
              <input
                type="email"
                id="subscribe-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Format date string
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Incident status badge
  const IncidentStatusBadge: React.FC<{ status: IncidentReport['status'] }> = ({ status }) => {
    let className = 'incident-status';
    switch (status) {
      case 'investigating':
        className += ' investigating';
        break;
      case 'identified':
        className += ' identified';
        break;
      case 'monitoring':
        className += ' monitoring';
        break;
      case 'resolved':
        className += ' resolved';
        break;
    }

    return <span className={className}>{status}</span>;
  };

  return (
    <div className="status-page">
      <div className="status-header">
        <h1>System Status</h1>
        <div className="status-actions">
          <button
            className="action-button report-issue"
            onClick={() => setIsReportModalOpen(true)}
          >
            Report an Issue
          </button>
          <button
            className="action-button subscribe"
            onClick={() => setIsSubscribeModalOpen(true)}
          >
            Subscribe to Updates
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="status-loading">
          <div className="loading-spinner"></div>
          <p>Loading system status...</p>
        </div>
      ) : statusData ? (
        <>
          <div className="system-status-card">
            <div className="status-overview">
              <h2>Current Status</h2>
              <div className="system-status">
                <StatusIndicator status={statusData.system.status} />
                <div className="status-message">
                  <p>{statusData.system.message || 'All systems are operational'}</p>
                  <span className="status-updated">
                    Last updated: {formatDate(statusData.system.lastUpdated)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="status-metrics">
              <div className="metric-card">
                <h3>Uptime</h3>
                <div className="metric-value">{statusData.metrics.uptime.daily}%</div>
                <div className="metric-label">Last 24 hours</div>
              </div>
              
              <div className="metric-card">
                <h3>Response Time</h3>
                <div className="metric-value">{statusData.metrics.responseTime.current}ms</div>
                <div className="metric-label">Current average</div>
              </div>
              
              <div className="metric-card">
                <h3>Incidents</h3>
                <div className="metric-value">{statusData.metrics.incidents.ongoing}</div>
                <div className="metric-label">Active incidents</div>
              </div>
            </div>
          </div>

          <div className="status-tabs">
            <button
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Services Overview
            </button>
            <button
              className={`tab-button ${activeTab === 'incidents' ? 'active' : ''}`}
              onClick={() => setActiveTab('incidents')}
            >
              Incidents
            </button>
            <button
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Uptime History
            </button>
          </div>

          <div className="status-content">
            {activeTab === 'overview' && (
              <div className="services-overview">
                <h2>Services</h2>
                <div className="services-list">
                  {statusData.services.map(service => (
                    <div key={service.id} className="service-card">
                      <div className="service-header">
                        <h3>{service.name}</h3>
                        <StatusIndicator status={service.status} />
                      </div>
                      {service.description && <p className="service-description">{service.description}</p>}
                      <div className="service-metrics">
                        <div className="service-metric">
                          <span className="metric-label">Uptime</span>
                          <span className="metric-value">{service.uptime}%</span>
                        </div>
                        {service.responseTime && (
                          <div className="service-metric">
                            <span className="metric-label">Response</span>
                            <span className="metric-value">{service.responseTime}ms</span>
                          </div>
                        )}
                      </div>
                      <div className="service-updated">
                        Updated {formatDate(service.lastUpdated)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'incidents' && (
              <div className="incidents-list">
                <h2>Recent Incidents</h2>
                {statusData.incidents.length === 0 ? (
                  <div className="no-incidents">
                    <p>No incidents reported in the last 90 days.</p>
                  </div>
                ) : (
                  statusData.incidents.map(incident => (
                    <div key={incident.id} className="incident-card">
                      <div className="incident-header">
                        <h3>{incident.title}</h3>
                        <IncidentStatusBadge status={incident.status} />
                      </div>
                      <p className="incident-description">{incident.description}</p>
                      <div className="incident-meta">
                        <span className="incident-date">
                          Reported: {formatDate(incident.createdAt)}
                        </span>
                        {incident.resolvedAt && (
                          <span className="incident-date">
                            Resolved: {formatDate(incident.resolvedAt)}
                          </span>
                        )}
                      </div>
                      <div className="incident-updates">
                        <h4>Updates</h4>
                        {incident.updates.map(update => (
                          <div key={update.id} className="incident-update">
                            <div className="update-header">
                              <span className="update-time">{formatDate(update.createdAt)}</span>
                              <span className="update-status">{update.status}</span>
                            </div>
                            <p className="update-message">{update.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="uptime-history">
                <h2>Uptime History</h2>
                <div className="uptime-stats">
                  <div className="uptime-stat">
                    <h3>30-Day Uptime</h3>
                    <div className="uptime-percentage">{statusData.metrics.uptime.monthly}%</div>
                  </div>
                  <div className="uptime-stat">
                    <h3>7-Day Uptime</h3>
                    <div className="uptime-percentage">{statusData.metrics.uptime.weekly}%</div>
                  </div>
                </div>
                
                <div className="response-time-chart">
                  <h3>Response Time (ms) - Last 7 Days</h3>
                  <div className="chart-container">
                    {/* In a real app, use a proper charting library here */}
                    <div className="chart-placeholder">
                      <div className="chart-bars">
                        {statusData.metrics.responseTime.weekly.map((value, index) => (
                          <div 
                            key={index} 
                            className="chart-bar" 
                            style={{ 
                              height: `${Math.min(100, (value / Math.max(...statusData.metrics.responseTime.weekly)) * 100)}%` 
                            }}
                          >
                            <span className="bar-value">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="chart-days">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                          <div key={index} className="chart-day">{day}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="incident-history">
                  <h3>Incident History</h3>
                  <div className="incident-stats">
                    <div className="incident-stat">
                      <div className="stat-value">{statusData.metrics.incidents.total}</div>
                      <div className="stat-label">Total Incidents</div>
                    </div>
                    <div className="incident-stat">
                      <div className="stat-value">{statusData.metrics.incidents.resolved}</div>
                      <div className="stat-label">Resolved</div>
                    </div>
                    <div className="incident-stat">
                      <div className="stat-value">{statusData.metrics.incidents.ongoing}</div>
                      <div className="stat-label">Ongoing</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="status-error">
          <p>Failed to load system status information. Please try again later.</p>
          <button onClick={fetchStatusData} className="retry-button">Retry</button>
        </div>
      )}

      {isReportModalOpen && <ReportIssueModal />}
      {isSubscribeModalOpen && <SubscribeModal />}
    </div>
  );
};

export default StatusPage; 
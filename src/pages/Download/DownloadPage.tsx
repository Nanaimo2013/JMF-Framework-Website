import { useState, useEffect, useRef } from 'react';
import '../../styles/DownloadPage.css';
import downloadsApi, { Release, Platform, ReleaseType } from '../../services/api/downloadsApi';
import { useNotification } from '../../components/NotificationManager';

const DownloadPage = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<ReleaseType | 'all'>('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestRelease, setLatestRelease] = useState<Release | null>(null);
  const [downloadStats, setDownloadStats] = useState<{
    totalDownloads: number;
    downloadsByPlatform: Record<Platform, number>;
  } | null>(null);
  
  const { addNotification } = useNotification();
  const filterContainerRef = useRef<HTMLDivElement>(null);
  
  // Fetch releases on component mount
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all releases
        const data = await downloadsApi.getAllReleases();
        setReleases(data);
        
        // Fetch latest stable release
        const latest = await downloadsApi.getLatestRelease();
        setLatestRelease(latest);
        
        // Fetch download statistics
        try {
          const stats = await downloadsApi.getDownloadStats();
          setDownloadStats({
            totalDownloads: stats.totalDownloads,
            downloadsByPlatform: stats.downloadsByPlatform
          });
        } catch (statsError) {
          console.error('Failed to load download statistics', statsError);
          // Non-critical error, don't show to user
        }
      } catch (err) {
        console.error('Failed to load releases', err);
        setError('Failed to load releases. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReleases();
  }, []);
  
  // Get unique major versions for categorization
  const majorVersions = Array.from(
    new Set(releases.map(release => release.majorVersion))
  ).sort((a, b) => parseFloat(b) - parseFloat(a)); // Sort in descending order
  
  // Apply filters
  const filteredReleases = releases.filter(release => 
    (filterType === 'all' || release.type === filterType)
  );
  
  // Group releases by major version
  const releasesByMajorVersion = majorVersions.reduce((acc, majorVersion) => {
    acc[majorVersion] = filteredReleases.filter(
      release => release.majorVersion === majorVersion
    );
    return acc;
  }, {} as Record<string, Release[]>);
  
  const handleFilterChange = (type: ReleaseType | 'all') => {
    if (type !== filterType) {
      setIsAnimating(true);
      
      // Add animation class to filter container
      if (filterContainerRef.current) {
        filterContainerRef.current.classList.add('filter-transition');
      }
      
      // Delay filter change to allow for animation
      setTimeout(() => {
        setFilterType(type);
        setIsAnimating(false);
        
        // Remove animation class
        if (filterContainerRef.current) {
          filterContainerRef.current.classList.remove('filter-transition');
        }
      }, 300);
    }
  };
  
  const toggleCategory = (majorVersion: string) => {
    if (expandedCategory === majorVersion) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(majorVersion);
    }
  };
  
  const handleDownload = async (version: string, platform: Platform) => {
    try {
      addNotification(`Starting download for JMF Framework ${version} (${platform})`, 'info', 3000);
      
      // Get the release data
      const release = releases.find(r => r.version === version);
      if (!release) {
        throw new Error(`Release ${version} not found`);
      }
      
      // Track download analytics
      await downloadsApi.trackDownload(version, platform);
      
      // Trigger the download
      const downloadUrl = release.downloadUrl[platform];
      
      // Create a link element and click it to start the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `jmf-framework-${version}-${platform}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addNotification(`Download started for JMF Framework ${version}`, 'success', 3000);
    } catch (err) {
      console.error('Download failed', err);
      addNotification('Download failed. Please try again later.', 'error', 5000);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="download-page">
        <section className="download-hero">
          <div className="container">
            <h1>Download JMF Framework</h1>
            <p className="download-subtitle">Loading releases...</p>
            <div className="loading-spinner"></div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="download-page">
        <section className="download-hero">
          <div className="container">
            <h1>Download JMF Framework</h1>
            <p className="download-subtitle">Error loading releases</p>
            <div className="error-message">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="retry-button"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="download-page">
      <section className="download-hero">
        <div className="container">
          <h1>Download JMF Framework</h1>
          <p className="download-subtitle">Get the latest version for your platform</p>
          {downloadStats && (
            <div className="download-stats">
              <span>{downloadStats.totalDownloads.toLocaleString()} total downloads</span>
            </div>
          )}
        </div>
      </section>

      {/* Tabs for Download Sections */}
      <div className="download-tabs container">
        <button 
          className={`download-tab ${activeTab === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveTab('latest')}
        >
          Latest Release
        </button>
        <button 
          className={`download-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Versions
        </button>
        <button 
          className={`download-tab ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          Custom Installer
        </button>
      </div>

      {/* Latest Version Download Section */}
      {activeTab === 'latest' && latestRelease && (
        <section className="section latest-version-section">
          <div className="container">
            <div className="latest-version-card">
              <div className="latest-version-header">
                <h2>JMF Framework {latestRelease.version}</h2>
                <span className={`version-tag ${latestRelease.type}`}>
                  {latestRelease.type.toUpperCase()}
                </span>
              </div>
              
              <div className="latest-version-info">
                <div className="version-metadata">
                  <span>Released: {formatDate(latestRelease.date)}</span>
                  <span>Size: {latestRelease.size}</span>
                </div>

                <div className="platform-downloads">
                  {latestRelease.platforms.map(platform => (
                    <button
                      key={platform}
                      className="download-button"
                      onClick={() => handleDownload(latestRelease.version, platform)}
                    >
                      <span className="platform-icon">
                        {platform === 'windows' ? 
                          <i className="fa-brands fa-windows"></i> : 
                          platform === 'linux' ? 
                            <i className="fa-brands fa-linux"></i> : 
                            <i className="fa-brands fa-apple"></i>}
                      </span>
                      <span className="platform-name">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="release-notes">
                <h3>Release Notes</h3>
                <div className="changelog">
                  {latestRelease.changelog.map((item, index) => (
                    <div key={index} className={`changelog-item ${item.type}`}>
                      <span className="changelog-type">{item.type}:</span>
                      <span className="changelog-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href={latestRelease.releaseNotes} target="_blank" rel="noopener noreferrer" className="view-full-notes">
                  View Full Release Notes
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Versions Section */}
      {activeTab === 'all' && (
        <section className="section all-versions-section">
          <div className="container">
            <div className="filter-container" ref={filterContainerRef}>
              <h2>All Versions</h2>
              
              <div className="release-filters">
                <button 
                  className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${filterType === 'stable' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('stable')}
                >
                  Stable
                </button>
                <button 
                  className={`filter-button ${filterType === 'beta' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('beta')}
                >
                  Beta
                </button>
                <button 
                  className={`filter-button ${filterType === 'alpha' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('alpha')}
                >
                  Alpha
                </button>
              </div>
            </div>

            {majorVersions.length === 0 ? (
              <div className="no-releases">
                <p>No releases match the selected filter.</p>
              </div>
            ) : (
              <div className="versions-list">
                {majorVersions.map(majorVersion => {
                  const versionsInCategory = releasesByMajorVersion[majorVersion] || [];
                  const isExpanded = expandedCategory === majorVersion;
                  
                  return (
                    <div key={majorVersion} className="version-category">
                      <div 
                        className="category-header"
                        onClick={() => toggleCategory(majorVersion)}
                      >
                        <h3>Version {majorVersion}</h3>
                        <span className="toggle-icon">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                      
                      {isExpanded && (
                        <div className="category-releases">
                          {versionsInCategory.map(release => (
                            <div key={release.version} className="release-item">
                              <div className="release-header">
                                <div className="release-title">
                                  <h4>v{release.version}</h4>
                                  <span className={`version-tag ${release.type}`}>
                                    {release.type.toUpperCase()}
                                  </span>
                                </div>
                                <div className="release-meta">
                                  <span>{formatDate(release.date)}</span>
                                  <span>{release.size}</span>
                                </div>
                              </div>
                              
                              <div className="release-platforms">
                                {release.platforms.map(platform => (
                                  <button
                                    key={platform}
                                    className="download-button small"
                                    onClick={() => handleDownload(release.version, platform)}
                                  >
                                    <span className="platform-icon">
                                      {platform === 'windows' ? 
                                        <i className="fa-brands fa-windows"></i> : 
                                        platform === 'linux' ? 
                                          <i className="fa-brands fa-linux"></i> : 
                                          <i className="fa-brands fa-apple"></i>}
                                    </span>
                                    <span className="platform-name">
                                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </span>
                                  </button>
                                ))}
                              </div>
                              
                              <div className="release-changes">
                                {release.changelog.slice(0, 2).map((item, index) => (
                                  <div key={index} className={`changelog-item ${item.type}`}>
                                    <span className="changelog-type">{item.type}:</span>
                                    <span className="changelog-text">{item.text}</span>
                                  </div>
                                ))}
                                {release.changelog.length > 2 && (
                                  <a href={release.releaseNotes} target="_blank" rel="noopener noreferrer" className="more-changes">
                                    + {release.changelog.length - 2} more changes
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Custom Installer Section */}
      {activeTab === 'custom' && (
        <section className="section custom-installer-section">
          <div className="container">
            <div className="custom-installer-content">
              <h2>Custom Installer</h2>
              <p>Build a custom JMF Framework installer tailored to your specific needs:</p>
              
              <div className="custom-installer-form">
                <div className="form-section">
                  <h3>Core Components</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={true} readOnly />
                      <span>Core Framework</span>
                      <small>(Required)</small>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>CLI Tools</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>Development Toolkit</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3>Optional Modules</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>UI Components</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>Data Management</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Server Extensions</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Analytics Tools</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Testing Framework</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3>Target Platform</h3>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="platform" value="windows" defaultChecked />
                      <span>Windows</span>
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="platform" value="linux" />
                      <span>Linux</span>
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="platform" value="macos" />
                      <span>macOS</span>
                    </label>
                  </div>
                </div>
                
                <button 
                  className="build-button"
                  onClick={() => addNotification('Custom installer feature coming soon!', 'info', 3000)}
                >
                  Build Custom Installer
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DownloadPage; 
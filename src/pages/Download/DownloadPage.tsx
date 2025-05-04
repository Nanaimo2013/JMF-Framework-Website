import { useState, useEffect, useRef } from 'react';
import '../../styles/DownloadPage.css';

// Type declarations
type Platform = 'windows' | 'linux' | 'macos';
type ReleaseType = 'stable' | 'beta' | 'alpha';

// Type for release objects
interface Release {
  version: string;
  type: ReleaseType;
  date: string;
  platforms: Platform[];
  size: string;
  majorVersion: string;
  releaseNotes: string;
  changelog: {
    type: string;
    text: string;
  }[];
}

// Expanded mock release data with version categories and more details
const RELEASES: Release[] = [
  // Version 1.x
  {
    version: '1.2.0',
    type: 'stable',
    date: '2025-06-15',
    platforms: ['windows', 'linux', 'macos'],
    size: '4.2 MB',
    majorVersion: '1.0',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v1.2.0',
    changelog: [
      { type: 'major', text: 'Performance improvements in core rendering engine' },
      { type: 'feature', text: 'New data visualization components' },
      { type: 'feature', text: 'Expanded CLI capabilities with custom plugins' },
      { type: 'fix', text: 'Fixed memory leak in state management system' },
    ]
  },
  {
    version: '1.1.0',
    type: 'stable',
    date: '2025-05-10',
    platforms: ['windows', 'linux', 'macos'],
    size: '4.0 MB',
    majorVersion: '1.0',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v1.1.0',
    changelog: [
      { type: 'feature', text: 'Added internationalization support' },
      { type: 'feature', text: 'New theme system with dark mode' },
      { type: 'fix', text: 'Fixed routing issues with nested routes' },
    ]
  },
  {
    version: '1.0.0',
    type: 'stable',
    date: '2025-04-02',
    platforms: ['windows', 'linux', 'macos'],
    size: '3.8 MB',
    majorVersion: '1.0',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v1.0.0',
    changelog: [
      { type: 'major', text: 'Initial stable release' },
      { type: 'feature', text: 'Core libraries with full TypeScript support' },
      { type: 'feature', text: 'Command line interface with project scaffolding' },
      { type: 'feature', text: 'Documentation and API reference' },
    ]
  },
  
  // Version 0.9.x
  {
    version: '0.9.5',
    type: 'beta',
    date: '2025-03-20',
    platforms: ['windows', 'linux', 'macos'],
    size: '3.6 MB',
    majorVersion: '0.9',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v0.9.5',
    changelog: [
      { type: 'feature', text: 'Final beta release before stable' },
      { type: 'feature', text: 'Complete documentation' },
      { type: 'fix', text: 'Last minute bug fixes and optimizations' },
    ]
  },
  {
    version: '0.9.0',
    type: 'beta',
    date: '2025-03-15',
    platforms: ['windows', 'linux'],
    size: '3.5 MB',
    majorVersion: '0.9',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v0.9.0',
    changelog: [
      { type: 'feature', text: 'Pre-release version with core functionality' },
      { type: 'feature', text: 'Basic CLI commands implemented' },
      { type: 'fix', text: 'Fixed performance issues in development mode' }
    ]
  },
  
  // Version 0.8.x
  {
    version: '0.8.5',
    type: 'beta',
    date: '2025-03-01',
    platforms: ['windows'],
    size: '3.2 MB',
    majorVersion: '0.8',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v0.8.5',
    changelog: [
      { type: 'feature', text: 'Initial beta release' },
      { type: 'fix', text: 'Multiple bug fixes and performance improvements' }
    ]
  },
  {
    version: '0.8.0',
    type: 'alpha',
    date: '2025-02-20',
    platforms: ['windows'],
    size: '3.0 MB',
    majorVersion: '0.8',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v0.8.0',
    changelog: [
      { type: 'feature', text: 'Major architecture redesign' },
      { type: 'feature', text: 'Preparing for beta release' },
    ]
  },
  
  // Version 0.7.x
  {
    version: '0.7.0',
    type: 'alpha',
    date: '2025-02-15',
    platforms: ['windows'],
    size: '2.8 MB',
    majorVersion: '0.7',
    releaseNotes: 'https://github.com/jmf-framework/release-notes/v0.7.0',
    changelog: [
      { type: 'feature', text: 'Alpha preview for early testing' }
    ]
  }
];

const DownloadPage = () => {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<ReleaseType | 'all'>('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('latest');
  const filterContainerRef = useRef<HTMLDivElement>(null);
  
  // Get unique major versions for categorization
  const majorVersions = Array.from(new Set(RELEASES.map(release => release.majorVersion)))
    .sort((a, b) => parseFloat(b) - parseFloat(a)); // Sort in descending order
  
  // Apply filters
  const filteredReleases = RELEASES.filter(release => 
    (filterType === 'all' || release.type === filterType)
  );
  
  // Group releases by major version
  const releasesByMajorVersion = majorVersions.reduce((acc, majorVersion) => {
    acc[majorVersion] = filteredReleases.filter(
      release => release.majorVersion === majorVersion
    );
    return acc;
  }, {} as Record<string, Release[]>);
  
  // Get latest stable release
  const latestStableRelease = RELEASES.find(release => release.type === 'stable');
  
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
  
  const handleDownload = (version: string, platform: Platform) => {
    // In a real app, this would trigger the download
    console.log(`Downloading ${version} for ${platform}`);
    alert(`Starting download for JMF Framework ${version} (${platform})`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="download-page">
      <section className="download-hero">
        <div className="container">
          <h1>Download JMF Framework</h1>
          <p className="download-subtitle">Get the latest version for your platform</p>
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
      {activeTab === 'latest' && latestStableRelease && (
        <section className="section latest-version-section">
          <div className="container">
            <div className="latest-version-card">
              <div className="version-info">
                <div className="version-header">
                  <h3>JMF Framework {latestStableRelease.version}</h3>
                  <span className={`release-tag ${latestStableRelease.type}`}>{latestStableRelease.type}</span>
                </div>
                <p className="release-date">Released on {formatDate(latestStableRelease.date)}</p>
                <p className="release-size">Size: {latestStableRelease.size}</p>
                <div className="version-platforms">
                  {['windows', 'linux', 'macos'].map((platform) => (
                    <button
                      key={platform}
                      className={`platform-button ${latestStableRelease.platforms.includes(platform as Platform) ? 'available' : 'unavailable'}`}
                      disabled={!latestStableRelease.platforms.includes(platform as Platform)}
                      onClick={() => latestStableRelease.platforms.includes(platform as Platform) && 
                        handleDownload(latestStableRelease.version, platform as Platform)}
                    >
                      <span className={`platform-icon ${platform}`}></span>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
                <a 
                  href={latestStableRelease.releaseNotes} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="release-notes-link"
                >
                  Release Notes
                </a>
              </div>
              <div className="version-changelog">
                <h4>What's New</h4>
                <ul className="changelog-list">
                  {latestStableRelease.changelog.map((item, index) => (
                    <li key={index} className={`changelog-item ${item.type}`}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Releases Section */}
      {activeTab === 'all' && (
        <section className="section all-releases-section">
          <div className="container">
            <div className="section-header">
              <h2>All Releases</h2>
              <div className="release-filters" ref={filterContainerRef}>
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

            <div className={`releases-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              {majorVersions.map(majorVersion => (
                releasesByMajorVersion[majorVersion]?.length > 0 && (
                  <div key={majorVersion} className="release-category">
                    <div 
                      className="category-header" 
                      onClick={() => toggleCategory(majorVersion)}
                    >
                      <h3>Version {majorVersion}.x</h3>
                      <span className={`category-toggle ${expandedCategory === majorVersion ? 'open' : ''}`}></span>
                    </div>
                    
                    <div className={`category-releases ${expandedCategory === majorVersion ? 'expanded' : ''}`}>
                      {releasesByMajorVersion[majorVersion]?.map((release) => (
                        <div key={release.version} className={`release-card ${selectedVersion === release.version ? 'expanded' : ''}`}>
                          <div 
                            className="release-header"
                            onClick={() => setSelectedVersion(
                              selectedVersion === release.version ? null : release.version
                            )}
                          >
                            <div className="release-title">
                              <h4>Version {release.version}</h4>
                              <span className={`release-type ${release.type}`}>{release.type}</span>
                            </div>
                            <div className="release-meta">
                              <span className="release-date">{formatDate(release.date)}</span>
                              <span className="release-size">{release.size}</span>
                              <div className="platform-indicators">
                                {['windows', 'linux', 'macos'].map(platform => (
                                  <span 
                                    key={platform}
                                    className={`platform-dot ${release.platforms.includes(platform as Platform) ? 'available' : 'unavailable'}`}
                                    title={`${platform.charAt(0).toUpperCase() + platform.slice(1)} ${release.platforms.includes(platform as Platform) ? 'Available' : 'Unavailable'}`}
                                  ></span>
                                ))}
                              </div>
                              <span className={`expand-icon ${selectedVersion === release.version ? 'open' : ''}`}></span>
                            </div>
                          </div>
                          
                          {selectedVersion === release.version && (
                            <div className="release-details">
                              <div className="release-changelog">
                                <h4>Changelog</h4>
                                <ul className="changelog-list">
                                  {release.changelog.map((item, index) => (
                                    <li key={index} className={`changelog-item ${item.type}`}>
                                      {item.text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="release-actions">
                                <div className="release-downloads">
                                  <h4>Download</h4>
                                  <div className="download-buttons">
                                    {['windows', 'linux', 'macos'].map(platform => (
                                      <button
                                        key={platform}
                                        className={`download-button ${release.platforms.includes(platform as Platform) ? 'available' : 'unavailable'}`}
                                        disabled={!release.platforms.includes(platform as Platform)}
                                        onClick={() => release.platforms.includes(platform as Platform) && 
                                          handleDownload(release.version, platform as Platform)}
                                      >
                                        <span className={`platform-icon ${platform}`}></span>
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <a 
                                  href={release.releaseNotes} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="release-notes-link"
                                >
                                  Release Notes
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Installer Section */}
      {activeTab === 'custom' && (
        <section className="section custom-installer-section">
          <div className="container">
            <div className="installer-content">
              <div className="installer-text">
                <h2>Custom Installer</h2>
                <p>Our modern UI installer allows you to customize your installation with the components you need.</p>
                <ul className="installer-features">
                  <li>Select specific components to install</li>
                  <li>Automatic PATH integration</li>
                  <li>Development environment setup</li>
                  <li>Project templates</li>
                </ul>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleDownload(latestStableRelease?.version || '1.0.0', 'windows')}
                >
                  Download Installer
                </button>
              </div>
              <div className="installer-image">
                {/* Placeholder for installer screenshot */}
                <div className="installer-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <p>Installer Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DownloadPage; 
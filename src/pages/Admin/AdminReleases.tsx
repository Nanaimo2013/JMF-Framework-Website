import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAdmin } from '../../context/AuthContext';
import adminApi from '../../services/api/adminApi';
import downloadsApi, { Release, ReleaseType, Platform } from '../../services/api/downloadsApi';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/AdminReleases.css';

const AdminReleases: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ReleaseType | 'all'>('all');
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      setIsLoading(true);
      const data = await downloadsApi.getAllReleases();
      setReleases(data);
    } catch (error) {
      console.error('Failed to load releases', error);
      addNotification('Failed to load releases', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRelease = async (id: string, version: string) => {
    if (!window.confirm(`Are you sure you want to delete release ${version}? This action cannot be undone.`)) {
      return;
    }

    try {
      await adminApi.deleteRelease(id);
      addNotification(`Release ${version} deleted successfully`, 'success');
      // Remove the release from the state
      setReleases(prevReleases => prevReleases.filter(release => release.id !== id));
    } catch (error) {
      console.error('Failed to delete release', error);
      addNotification('Failed to delete release', 'error');
    }
  };

  // Filter and search releases
  const filteredReleases = releases.filter(release => {
    const matchesType = filterType === 'all' || release.type === filterType;
    const matchesSearch = searchQuery === '' || 
      release.version.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-releases">
      <div className="admin-section-header">
        <h1>Manage Releases</h1>
        <Link to="/admin/releases/new" className="new-release-button">
          Add New Release
        </Link>
      </div>

      <div className="releases-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search releases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filterType === 'stable' ? 'active' : ''}`}
            onClick={() => setFilterType('stable')}
          >
            Stable
          </button>
          <button 
            className={`filter-button ${filterType === 'beta' ? 'active' : ''}`}
            onClick={() => setFilterType('beta')}
          >
            Beta
          </button>
          <button 
            className={`filter-button ${filterType === 'alpha' ? 'active' : ''}`}
            onClick={() => setFilterType('alpha')}
          >
            Alpha
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading releases...</p>
        </div>
      ) : filteredReleases.length === 0 ? (
        <div className="no-releases">
          <p>No releases found matching your criteria.</p>
        </div>
      ) : (
        <div className="releases-table-container">
          <table className="releases-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Type</th>
                <th>Date</th>
                <th>Platforms</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReleases.map(release => (
                <tr key={release.id}>
                  <td className="version-cell">
                    <span className="version-number">{release.version}</span>
                    <span className="version-major">v{release.majorVersion}</span>
                  </td>
                  <td>
                    <span className={`release-type ${release.type}`}>
                      {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                    </span>
                  </td>
                  <td>{formatDate(release.date)}</td>
                  <td className="platforms-cell">
                    {release.platforms.map(platform => (
                      <span key={platform} className={`platform-badge ${platform}`}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    ))}
                  </td>
                  <td>{release.size}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Link 
                        to={`/admin/releases/edit/${release.id}`} 
                        className="edit-button"
                        title="Edit Release"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </Link>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteRelease(release.id, release.version)}
                        title="Delete Release"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-navigation">
        <Link to="/admin/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default withAdmin(AdminReleases); 
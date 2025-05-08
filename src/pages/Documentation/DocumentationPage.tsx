import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/DocumentationPage.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import Prism theme
import { useNotification } from '../../components/NotificationManager';

// Documentation sections
import GettingStarted from './sections/GettingStarted';
import ApiReference from './sections/ApiReference';
import CliCommands from './sections/CliCommands';
import Examples from './sections/Examples';

// New documentation sections
import CliConfig from './sections/cli/CliConfig';
import ApiCore from './sections/api/ApiCore';
import ApiRouter from './sections/api/ApiRouter';
import ApiState from './sections/api/ApiState';
import ApiUi from './sections/api/ApiUi';
import ApiData from './sections/api/ApiData';

// Search icon component
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);

// Language icons component
const LanguageIcon = ({ language }: { language: string }) => {
  switch (language) {
    case 'javascript':
    case 'js':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f7df1e">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      );
    case 'typescript':
    case 'ts':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#007acc">
          <path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.011z"/>
        </svg>
      );
    case 'bash':
    case 'shell':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4eaa25">
          <path d="M21.038 4.9l-7.577-4.498C13.009.071 12.505 0 12 0s-1.009.071-1.461.403L2.961 4.9C2.057 5.442 1.5 6.451 1.5 7.518v8.966c0 1.066.557 2.075 1.462 2.617l7.577 4.498c.452.332.956.403 1.461.403s1.009-.071 1.461-.403l7.577-4.498c.904-.542 1.462-1.551 1.462-2.617V7.518c0-1.066-.557-2.075-1.462-2.617zM23.5 16.484c0 1.066-.557 2.075-1.462 2.617l-7.577 4.498c-.452.332-.956.403-1.461.403s-1.009-.071-1.461-.403l-7.577-4.498c-.904-.542-1.462-1.551-1.462-2.617V7.518c0-1.066.557-2.075 1.462-2.617l7.577-4.498C11.991.071 12.495 0 13 0s1.009.071 1.461.403l7.577 4.498c.904.542 1.462 1.551 1.462 2.617v8.966z M2.5 10.484l5 3-5 3v-6zM8.5 13.484l5-3 5 3-5 3-5-3z"/>
        </svg>
      );
    case 'html':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e34f26">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      );
    case 'css':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#264de4">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#cccccc">
          <path d="M9.8 15.5L6 11.7 9.8 8 11.2 9.4 8.6 12 11.2 14.6zM14.2 15.5L17.9 11.7 14.2 8 12.8 9.4 15.4 12 12.8 14.6z"/>
          <path d="M22,0H2v24h20V0z M20,22H4V2h16V22z"/>
        </svg>
      );
  }
};

// Sidebar navigation icons
const GetStartedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const QuickStartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
  </svg>
);

const ProjectStructureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const ApiOverviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const ApiCoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ApiRouterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ApiStateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10"></path>
    <path d="M12 20V4"></path>
    <path d="M6 20v-6"></path>
  </svg>
);

const ApiUIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <path d="M3 9h18"></path>
    <path d="M9 21V9"></path>
  </svg>
);

const ApiDataIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const CliOverviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m9 8-5 4 5 4"></path>
    <path d="M15 8h4"></path>
  </svg>
);

const CliCreateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"></path>
    <path d="M3 8h18"></path>
    <path d="M8 3v18"></path>
    <circle cx="13" cy="13" r="3"></circle>
  </svg>
);

const CliServeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const CliConfigIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ExamplesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const AdvancedExamplesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const DocumentationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Extract the current section from the URL
  const currentPath = location.pathname.split('/').filter(Boolean);
  
  // Improved section detection logic
  let currentSection = 'getting-started';
  let currentSubSection = '';
  
  if (currentPath.length > 1) {
    // First, determine if we're using /docs or /documentation pattern
    const isDocsPattern = currentPath[0] === 'docs';
    const isDocumentationPattern = currentPath[0] === 'documentation';
    
    if (isDocsPattern) {
      // Handle /docs pattern
      if (currentPath.length === 2) {
        // Path format: /docs/section
        currentSection = currentPath[1];
      } else if (currentPath.length >= 3) {
        // Path format: /docs/category/section
        if (currentPath[1] === 'api') {
          currentSection = 'api';
          currentSubSection = currentPath[2];
        } else if (currentPath[1] === 'cli') {
          currentSection = 'cli';
          currentSubSection = currentPath[2];
        } else {
          currentSection = currentPath[1];
        }
      }
    } else if (isDocumentationPattern) {
      // Handle /documentation pattern
      if (currentPath.length === 2) {
        // Path format: /documentation/section
        currentSection = currentPath[1];
      } else if (currentPath.length >= 3) {
        // Check if using old pattern with /sections/
        if (currentPath[1] === 'sections' && currentPath.length >= 4) {
          // Path format: /documentation/sections/category/section
          if (currentPath[2] === 'api') {
            currentSection = 'api';
            currentSubSection = currentPath[3];
          } else if (currentPath[2] === 'cli') {
            currentSection = 'cli';
            currentSubSection = currentPath[3];
          }
        } else {
          currentSection = currentPath[1];
        }
      }
    }
  }
  
  // Mock search data (in a real app, this would come from a search index)
  const searchData = [
    { title: 'Installation', path: '/docs/getting-started', category: 'Getting Started' },
    { title: 'Quick Start', path: '/docs/quick-start', category: 'Getting Started' },
    { title: 'Project Structure', path: '/docs/project-structure', category: 'Getting Started' },
    { title: 'API Overview', path: '/docs/api', category: 'API Reference' },
    { title: 'Core API', path: '/docs/api/api-core', category: 'API Reference' },
    { title: 'Router API', path: '/docs/api/api-router', category: 'API Reference' },
    { title: 'State Management API', path: '/docs/api/api-state', category: 'API Reference' },
    { title: 'UI Components API', path: '/docs/api/api-ui', category: 'API Reference' },
    { title: 'Data Handling API', path: '/docs/api/api-data', category: 'API Reference' },
    { title: 'CLI Commands Overview', path: '/docs/cli', category: 'CLI Commands' },
    { title: 'Creating Projects', path: '/docs/cli-create', category: 'CLI Commands' },
    { title: 'Development Server', path: '/docs/cli-serve', category: 'CLI Commands' },
    { title: 'CLI Configuration', path: '/docs/cli/cli-config', category: 'CLI Commands' },
    { title: 'Basic Examples', path: '/docs/examples', category: 'Examples' },
    { title: 'Advanced Examples', path: '/docs/examples-advanced', category: 'Examples' },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setShowResults(false);
      return;
    }
    
    // Search through the data (in a real app, this would be a more sophisticated search)
    const results = searchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setShowResults(true);
  };
  
  const handleResultClick = (path: string) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery('');
  };
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Keep search results open when interacting with the search box
  const handleSearchContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Initialize Prism syntax highlighting when the component mounts
  useEffect(() => {
    Prism.highlightAll();
  }, [location.pathname]); // Re-highlight when the route changes

  return (
    <div className="documentation-page">
      <section className="documentation-hero">
        <div className="container">
          <h1>Documentation</h1>
          <p className="documentation-subtitle">Everything you need to know about JMF Framework</p>
          <div onClick={handleSearchContainerClick}>
            <form className="documentation-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search documentation..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() !== '') {
                    handleSearch(e as unknown as React.FormEvent);
                  } else {
                    setShowResults(false);
                  }
                }}
              />
              <button type="submit">
                <SearchIcon />
                <span>Search</span>
              </button>
              
              {showResults && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result, index) => (
                        <li key={index} onClick={() => handleResultClick(result.path)}>
                          <span className="result-category">{result.category}</span>
                          <span className="result-title">{result.title}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="no-results">No matching documentation found</div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="documentation-content">
        <div className="container">
          <div className="documentation-layout">
            {/* Sidebar Navigation */}
            <aside className="documentation-sidebar">
              <nav className="documentation-nav">
                <div className="nav-section">
                  <h3>
                    <span className="nav-section-icon">
                      <GetStartedIcon />
                    </span>
                    Getting Started
                  </h3>
                  <ul>
                    <li className={currentSection === 'getting-started' ? 'active' : ''}>
                      <Link to="/docs/getting-started">
                        <span className="nav-item-icon"><CliCreateIcon /></span>
                        Installation
                      </Link>
                    </li>
                    <li className={currentSection === 'quick-start' ? 'active' : ''}>
                      <Link to="/docs/quick-start">
                        <span className="nav-item-icon"><QuickStartIcon /></span>
                        Quick Start
                      </Link>
                    </li>
                    <li className={currentSection === 'project-structure' ? 'active' : ''}>
                      <Link to="/docs/project-structure">
                        <span className="nav-item-icon"><ProjectStructureIcon /></span>
                        Project Structure
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="nav-section">
                  <h3>
                    <span className="nav-section-icon">
                      <ApiOverviewIcon />
                    </span>
                    API Reference
                  </h3>
                  <ul>
                    <li className={currentSection === 'api' ? 'active' : ''}>
                      <Link to="/docs/api">
                        <span className="nav-item-icon"><ApiOverviewIcon /></span>
                        Overview
                      </Link>
                    </li>
                    <li className={currentSection === 'api-core' ? 'active' : ''}>
                      <Link to="/docs/api/api-core">
                        <span className="nav-item-icon"><ApiCoreIcon /></span>
                        Core API
                      </Link>
                    </li>
                    <li className={currentSection === 'api-router' ? 'active' : ''}>
                      <Link to="/docs/api/api-router">
                        <span className="nav-item-icon"><ApiRouterIcon /></span>
                        Router API
                      </Link>
                    </li>
                    <li className={currentSection === 'api-state' ? 'active' : ''}>
                      <Link to="/docs/api/api-state">
                        <span className="nav-item-icon"><ApiStateIcon /></span>
                        State Management API
                      </Link>
                    </li>
                    <li className={currentSection === 'api-ui' ? 'active' : ''}>
                      <Link to="/docs/api/api-ui">
                        <span className="nav-item-icon"><ApiUIIcon /></span>
                        UI Components API
                      </Link>
                    </li>
                    <li className={currentSection === 'api-data' ? 'active' : ''}>
                      <Link to="/docs/api/api-data">
                        <span className="nav-item-icon"><ApiDataIcon /></span>
                        Data Handling API
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="nav-section">
                  <h3>
                    <span className="nav-section-icon">
                      <CliOverviewIcon />
                    </span>
                    CLI Commands
                  </h3>
                  <ul>
                    <li className={currentSection === 'cli' ? 'active' : ''}>
                      <Link to="/docs/cli">
                        <span className="nav-item-icon"><CliOverviewIcon /></span>
                        Command Overview
                      </Link>
                    </li>
                    <li className={currentSection === 'cli-create' ? 'active' : ''}>
                      <Link to="/docs/cli-create">
                        <span className="nav-item-icon"><CliCreateIcon /></span>
                        Creating Projects
                      </Link>
                    </li>
                    <li className={currentSection === 'cli-serve' ? 'active' : ''}>
                      <Link to="/docs/cli-serve">
                        <span className="nav-item-icon"><CliServeIcon /></span>
                        Development Server
                      </Link>
                    </li>
                    <li className={currentSection === 'cli-config' ? 'active' : ''}>
                      <Link to="/docs/cli/cli-config">
                        <span className="nav-item-icon"><CliConfigIcon /></span>
                        Configuration
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="nav-section">
                  <h3>
                    <span className="nav-section-icon">
                      <ExamplesIcon />
                    </span>
                    Examples
                  </h3>
                  <ul>
                    <li className={currentSection === 'examples' ? 'active' : ''}>
                      <Link to="/docs/examples">
                        <span className="nav-item-icon"><ExamplesIcon /></span>
                        Basic Examples
                      </Link>
                    </li>
                    <li className={currentSection === 'examples-advanced' ? 'active' : ''}>
                      <Link to="/docs/examples-advanced">
                        <span className="nav-item-icon"><AdvancedExamplesIcon /></span>
                        Advanced Examples
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="documentation-main">
              <Routes>
                {/* Routes for /docs pattern */}
                <Route path="/" element={<GettingStarted />} />
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/api" element={<ApiReference />} />
                <Route path="/cli" element={<CliCommands />} />
                
                {/* API subsections - /docs pattern */}
                <Route path="/api/api-core" element={<ApiCore />} />
                <Route path="/api/api-router" element={<ApiRouter />} />
                <Route path="/api/api-state" element={<ApiState />} />
                <Route path="/api/api-ui" element={<ApiUi />} />
                <Route path="/api/api-data" element={<ApiData />} />
                
                {/* CLI subsections - /docs pattern */}
                <Route path="/cli/cli-config" element={<CliConfig />} />
                
                {/* Routes for /documentation pattern */}
                <Route path="/documentation" element={<GettingStarted />} />
                <Route path="/documentation/getting-started" element={<GettingStarted />} />
                <Route path="/documentation/examples" element={<Examples />} />
                <Route path="/documentation/api" element={<ApiReference />} />
                <Route path="/documentation/cli" element={<CliCommands />} />
                
                {/* API subsections - /documentation pattern with /sections/ */}
                <Route path="/documentation/sections/api/api-core" element={<ApiCore />} />
                <Route path="/documentation/sections/api/api-router" element={<ApiRouter />} />
                <Route path="/documentation/sections/api/api-state" element={<ApiState />} />
                <Route path="/documentation/sections/api/api-ui" element={<ApiUi />} />
                <Route path="/documentation/sections/api/api-data" element={<ApiData />} />
                
                {/* CLI subsections - /documentation pattern with /sections/ */}
                <Route path="/documentation/sections/cli/cli-config" element={<CliConfig />} />
                
                <Route 
                  path="*" 
                  element={
                    <div className="documentation-placeholder">
                      <h2>Documentation Coming Soon</h2>
                      <p>We're working on this section of the documentation. Please check back later!</p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/docs/getting-started')}
                      >
                        Go to Getting Started
                      </button>
                    </div>
                  } 
                />
              </Routes>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

// Table of Contents component that can be used in documentation sections
export const TableOfContents = ({ items }: { items: {id: string, title: string}[] }) => {
  return (
    <div className="table-of-contents">
      <h3>In this section</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Code Block component for better code formatting
export const CodeBlock = ({ language, title, children, showLineNumbers = false }: { 
  language: string, 
  title?: string, 
  children: React.ReactNode,
  showLineNumbers?: boolean
}) => {
  const { addNotification } = useNotification();
  const [copying, setCopying] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const code = codeRef.current.textContent || '';
      navigator.clipboard.writeText(code)
        .then(() => {
          setCopying(true);
          addNotification('Code copied to clipboard!', 'success', 3000);
          setTimeout(() => setCopying(false), 2000);
        })
        .catch(() => {
          addNotification('Failed to copy code. Please try again.', 'error', 3000);
        });
    }
  };
  
  return (
    <div className={`code-block ${showLineNumbers ? 'line-numbers' : ''}`}>
      <div className="code-block-header">
        {title && <span className="code-block-title">{title}</span>}
        <span className="code-block-language">
          <LanguageIcon language={language} />
          {language}
        </span>
        <button 
          className="code-block-copy" 
          onClick={copyToClipboard}
          aria-label="Copy code to clipboard"
        >
          {copying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className={`language-${language}`}>
        <code 
          ref={codeRef}
          className={`language-${language}`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

export default DocumentationPage; 
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

// Icon components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const DocsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PrivacyPolicyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <path d="M12 7v10"></path>
    <path d="M8 11h8"></path>
  </svg>
);

const TermsOfServiceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar-logo-icon">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
  </svg>
);

const DocItemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

const ApiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const CliIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 10 4 15 9 20"></polyline>
    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
  </svg>
);

const ExampleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const StatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [docsDropdownOpen, setDocsDropdownOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const docsDropdownRef = useRef<HTMLLIElement>(null);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (docsDropdownRef.current && !docsDropdownRef.current.contains(event.target as Node)) {
        setDocsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setDocsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setDocsDropdownOpen(false);
    }
  };

  const toggleDocsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDocsDropdownOpen(!docsDropdownOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : 
           location.pathname.startsWith(path) && path !== '/' ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrollPosition > 50 ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <LogoIcon />
          <span className="logo-text">JMF Framework</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <span className="nav-link-icon"><HomeIcon /></span>
              <span className="nav-link-text">Home</span>
              <span className="nav-link-highlight"></span>
            </Link>
          </li>
          <li className="nav-item dropdown" ref={docsDropdownRef}>
            <a 
              href="#" 
              className={`nav-link ${isActive('/documentation')} dropdown-toggle`}
              onClick={toggleDocsDropdown}
            >
              <span className="nav-link-icon"><DocsIcon /></span>
              <span className="nav-link-text">Docs</span>
              <span className={`dropdown-arrow ${docsDropdownOpen ? 'open' : ''}`}></span>
              <span className="nav-link-highlight"></span>
            </a>
            <div className={`dropdown-menu ${docsDropdownOpen ? 'show' : ''}`}>
              <Link to="/documentation/getting-started" className="dropdown-item">
                <DocItemIcon /> Getting Started
              </Link>
              <div className="dropdown-divider"></div>
              <h6 className="dropdown-header">API Reference</h6>
              <Link to="/documentation/sections/api/api-core" className="dropdown-item">
                <ApiIcon /> Core API
              </Link>
              <Link to="/documentation/sections/api/api-router" className="dropdown-item">
                <ApiIcon /> Router API
              </Link>
              <Link to="/documentation/sections/api/api-state" className="dropdown-item">
                <ApiIcon /> State Management
              </Link>
              <Link to="/documentation/sections/api/api-ui" className="dropdown-item">
                <ApiIcon /> UI Components
              </Link>
              <Link to="/documentation/sections/api/api-data" className="dropdown-item">
                <ApiIcon /> Data Handling
              </Link>
              <div className="dropdown-divider"></div>
              <h6 className="dropdown-header">CLI Reference</h6>
              <Link to="/documentation/sections/cli/cli-config" className="dropdown-item">
                <CliIcon /> Configuration
              </Link>
              <Link to="/documentation/cli-create" className="dropdown-item">
                <CliIcon /> Project Creation
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/documentation/examples" className="dropdown-item">
                <ExampleIcon /> Examples
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/download" className={`nav-link ${isActive('/download')}`}>
              <span className="nav-link-icon"><DownloadIcon /></span>
              <span className="nav-link-text">Download</span>
              <span className="nav-link-highlight"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              <span className="nav-link-icon"><AboutIcon /></span>
              <span className="nav-link-text">About</span>
              <span className="nav-link-highlight"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              <span className="nav-link-icon"><ContactIcon /></span>
              <span className="nav-link-text">Contact</span>
              <span className="nav-link-highlight"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/status" className={`nav-link ${isActive('/status')}`}>
              <span className="nav-link-icon"><StatusIcon /></span>
              <span className="nav-link-text">System Status</span>
              <span className="nav-link-highlight"></span>
            </Link>
          </li>
          <li className="nav-item circle-icon-item">
            <Link to="/privacy-policy" className={`nav-link circle-icon ${isActive('/privacy-policy')}`} title="Privacy Policy">
              <span className="nav-link-icon"><PrivacyPolicyIcon /></span>
            </Link>
          </li>
          <li className="nav-item circle-icon-item">
            <Link to="/terms-of-service" className={`nav-link circle-icon ${isActive('/terms-of-service')}`} title="Terms of Service">
              <span className="nav-link-icon"><TermsOfServiceIcon /></span>
            </Link>
          </li>
          <li className="nav-item">
            <a href="https://github.com/jmf-framework/jmf-framework" className="nav-link github" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
              <span className="nav-link-text">GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 
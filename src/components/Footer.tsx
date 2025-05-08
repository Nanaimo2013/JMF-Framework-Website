import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { useNotification } from './NotificationManager';
import styled from 'styled-components';

// Icon components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const DocsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM14 11l-4 4v-7l4 3z"></path>
  </svg>
);

const BugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12" y2="16"></line>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-logo-icon">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
  </svg>
);

// New icons for enhanced footer
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const TutorialIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const LegalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
    <path d="M10 14L8 12l2-2"></path>
    <path d="M14 14l2-2-2-2"></path>
  </svg>
);

const _TutorialIcon = styled(TutorialIcon)`
  // Add any necessary styles here
`;

const _BookIcon = styled(BookIcon)`
  // Add any necessary styles here
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { addNotification } = useNotification();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      addNotification('Please enter a valid email address', 'error', 3000);
      return;
    }
    
    // In a real implementation, you would send this to your backend
    addNotification('Thanks for subscribing to our newsletter!', 'success', 3000);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-branding">
          <div className="footer-logo">
            <LogoIcon />
            <h3 className="footer-title">JMF Framework</h3>
          </div>
          <p className="footer-description">
            A modern development framework providing tools and libraries for Full Stack Website development.
          </p>
          <div className="footer-social">
            <a href="https://github.com/jmf-framework/jmf-framework" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon github">
              <GithubIcon />
            </a>
            <a href="https://twitter.com/jmf_framework" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon twitter">
              <TwitterIcon />
            </a>
            <a href="https://discord.gg/jmf-framework" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="social-icon discord">
              <DiscordIcon />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/"><HomeIcon /> Home</Link></li>
            <li><Link to="/documentation"><DocsIcon /> Documentation</Link></li>
            <li><Link to="/download"><DownloadIcon /> Download</Link></li>
            <li><Link to="/about"><AboutIcon /> About</Link></li>
            <li><Link to="/contact"><EmailIcon /> Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li><Link to="/documentation/getting-started"><DocsIcon /> Getting Started</Link></li>
            <li><Link to="/documentation/api"><DocsIcon /> API Reference</Link></li>
            <li><Link to="/documentation/cli"><DocsIcon /> CLI Commands</Link></li>
            <li><Link to="/documentation/examples"><DocsIcon /> Examples</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Community</h3>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/jmf-framework/jmf-framework" target="_blank" rel="noopener noreferrer">
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href="https://github.com/jmf-framework/jmf-framework/issues" target="_blank" rel="noopener noreferrer">
                <BugIcon /> Issue Tracker
              </a>
            </li>
            <li>
              <a href="https://discord.gg/jmf-framework" target="_blank" rel="noopener noreferrer">
                <DiscordIcon /> Discord
              </a>
            </li>
            <li>
              <a href="https://twitter.com/jmf_framework" target="_blank" rel="noopener noreferrer">
                <TwitterIcon /> Twitter
              </a>
            </li>
            <li>
              <Link to="/showcase">
                <StarIcon /> Showcase
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Stay Updated</h3>
          <p className="footer-description">
            Subscribe to our newsletter to get the latest updates on JMF Framework.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="input-group">
              <EmailIcon />
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address for newsletter"
              />
            </div>
            <button type="submit" className="newsletter-submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} JMF Framework. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy"><LegalIcon /> Privacy Policy</Link>
            <Link to="/terms-of-service"><LegalIcon /> Terms of Service</Link>
            <Link to="/contact"><EmailIcon /> Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
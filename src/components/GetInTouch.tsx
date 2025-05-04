import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GetInTouch.css';

// Icon components
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM14 11l-4 4v-7l4 3z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const WorldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

type GetInTouchProps = {
  variant?: 'primary' | 'secondary' | 'accent';
  showOnlinePresence?: boolean;
}

const GetInTouch: React.FC<GetInTouchProps> = ({
  variant = 'primary',
  showOnlinePresence = true
}) => {
  // Scroll animations for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const sections = document.querySelectorAll('.get-in-touch-section, .online-presence-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className={`get-in-touch-container ${variant}`}>
      <div className="get-in-touch-background">
        <div className="gradient-orb primary"></div>
        <div className="gradient-orb secondary"></div>
      </div>
      
      <section className="get-in-touch-section animate-section">
        <div className="container">
          <div className="get-in-touch-content">
            <h2 className="section-title gradient-text">Get in Touch</h2>
            <p className="contact-description">
              I'm always happy to hear from users, contributors, or anyone interested in JMF Framework. 
              Whether you have questions, feedback, or just want to say hello, there are several ways to reach me.
            </p>
            <div className="contact-links">
              <a href="mailto:contact@jmf-framework.org" className="contact-link email">
                <EmailIcon />
                Email Me
              </a>
              <a href="https://github.com/jmf-framework" className="contact-link github" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                GitHub
              </a>
              <a href="https://twitter.com/jmf_framework" className="contact-link twitter" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
                Twitter
              </a>
              <a href="https://discord.gg/jmf-framework" className="contact-link discord" target="_blank" rel="noopener noreferrer">
                <DiscordIcon />
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {showOnlinePresence && (
        <section className="online-presence-section animate-section">
          <div className="container">
            <h2 className="section-title gradient-text">Find Us Online</h2>
            <div className="online-presence-container">
              <div className="online-presence-card">
                <div className="presence-icon">
                  <GithubIcon />
                </div>
                <h3>Open Source</h3>
                <p>JMF Framework is an open-source project created by a solo developer. The source code is available on GitHub where you can explore, contribute, and report issues.</p>
                <div className="presence-links">
                  <a href="https://github.com/jmf-framework/core" target="_blank" rel="noopener noreferrer" className="presence-link">
                    <CodeIcon /> View Source Code
                  </a>
                  <a href="https://github.com/jmf-framework/core/issues" target="_blank" rel="noopener noreferrer" className="presence-link">
                    <GithubIcon /> Report Issues
                  </a>
                </div>
              </div>
              
              <div className="online-presence-card">
                <div className="presence-icon">
                  <DiscordIcon />
                </div>
                <h3>Community</h3>
                <p>Join our online community to connect with other JMF Framework users, get help with your projects, and stay updated on new releases and features.</p>
                <div className="presence-links">
                  <a href="https://discord.gg/jmf-framework" target="_blank" rel="noopener noreferrer" className="presence-link">
                    <DiscordIcon /> Join Discord
                  </a>
                  <a href="https://twitter.com/jmf_framework" target="_blank" rel="noopener noreferrer" className="presence-link">
                    <TwitterIcon /> Follow on Twitter
                  </a>
                </div>
              </div>
              
              <div className="online-presence-card">
                <div className="presence-icon">
                  <StarIcon />
                </div>
                <h3>Showcase</h3>
                <p>Check out projects built with JMF Framework or submit your own to be featured in our showcase gallery.</p>
                <div className="presence-links">
                  <Link to="/showcase" className="presence-link">
                    <StarIcon /> View Showcase
                  </Link>
                  <Link to="/documentation" className="presence-link">
                    <WorldIcon /> Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GetInTouch; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomePage.css';

const HomePage = () => {
  const [commandCopied, setCommandCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCommandCopied(id);
    setTimeout(() => setCommandCopied(null), 2000);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Build Full Stack Websites Fast with JMF Framework</h1>
          <p className="hero-subtitle">
            A modern development framework providing tools and libraries for efficient, scalable web development
          </p>
          <div className="hero-buttons">
            <Link to="/download" className="btn btn-primary">
              Download
            </Link>
            <Link to="/documentation/getting-started" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <p className="section-description">Our framework offers everything you need to build modern web applications</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3>Core Libraries</h3>
              <p>Essential framework components designed for modern web development with a focus on performance</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <h3>CLI Tools</h3>
              <p>Powerful command-line interface for project scaffolding, development, testing, and deployment</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Development API</h3>
              <p>Extensible programming interface with customizable components and plugins architecture</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Documentation</h3>
              <p>Comprehensive guides, references, and examples to help you build efficiently</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="stats-title">Framework Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">N/A</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">N/A</div>
              <div className="stat-label">GitHub Stars</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">N/A</div>
              <div className="stat-label">Contributors</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">N/A</div>
              <div className="stat-label">Projects Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="section quickstart-section">
        <div className="container">
          <div className="quickstart-content">
            <div className="quickstart-text">
              <h2>Get Started in Minutes</h2>
              <p>JMF Framework is designed to be easy to install and use. Follow our quick start guide and build your first project today.</p>
              <Link to="/documentation/getting-started" className="btn btn-primary">
                Read the Guide
              </Link>
            </div>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                </div>
                <div className="terminal-title">Terminal</div>
              </div>
              <div className="terminal-body">
                <div className="terminal-command">
                  <span className="command-prompt">$</span>
                  <span className="command-text">npm install -g jmf-framework</span>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard("npm install -g jmf-framework", "install")}
                  >
                    {commandCopied === "install" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="command-output">
                  Installing JMF Framework...<br />
                  Successfully installed JMF Framework v1.0.0
                </div>

                <div className="terminal-command">
                  <span className="command-prompt">$</span>
                  <span className="command-text">jmf create my-awesome-project</span>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard("jmf create my-awesome-project", "create")}
                  >
                    {commandCopied === "create" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="command-output">
                  Creating a new JMF project in /my-awesome-project...<br />
                  Installing dependencies...<br />
                  Project created successfully!
                </div>

                <div className="terminal-command">
                  <span className="command-prompt">$</span>
                  <span className="command-text">cd my-awesome-project && jmf serve</span>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard("cd my-awesome-project && jmf serve", "serve")}
                  >
                    {commandCopied === "serve" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="command-output">
                  Starting development server...<br />
                  🚀 Server running at http://localhost:3000<br />
                  Ready for development<span className="blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="section community-section">
        <div className="container">
          <h2 className="section-title">Join Our Community</h2>
          <p className="section-subtitle">Connect with developers and get help from our active community</p>
          
          <div className="community-links">
            <a href="https://github.com/jmf-framework/jmf-framework" className="community-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://discord.gg/jmf-framework" className="community-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              Discord
            </a>
            <a href="https://twitter.com/jmf_framework" className="community-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Build Something Amazing?</h2>
          <p className="cta-text">
            Start using JMF Framework today and experience the difference in your development workflow.
            Our comprehensive documentation and active community will help you every step of the way.
          </p>
          <Link to="/download" className="cta-button">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
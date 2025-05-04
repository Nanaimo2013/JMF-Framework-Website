import React, { useEffect, useRef } from 'react';
import '../../styles/AboutPage.css';

const AboutPage = () => {
  // Empty profile SVG icon for unfilled positions
  const emptyProfileIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  );

  // Refs for scroll animations
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const historyRef = useRef(null);
  const roadmapRef = useRef(null);
  
  // Handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const refs = [missionRef, valuesRef, teamRef, historyRef, roadmapRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="animate-title">About JMF Framework</h1>
          <p className="about-subtitle animate-subtitle">Building the future of web development</p>
          <div className="hero-gradient-orb"></div>
          <div className="hero-gradient-orb secondary"></div>
        </div>
      </section>

      <section className="section about-mission" ref={missionRef}>
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title gradient-text">Our Mission</h2>
              <p className="mission-paragraph">
                JMF Framework was created with a simple mission: to provide developers with powerful, 
                flexible tools that make building modern web applications easier and more enjoyable.
              </p>
              <p className="mission-paragraph">
                We believe that development should be focused on creating value, not fighting with tooling 
                or reinventing solutions to common problems. That's why we've built a comprehensive framework 
                that handles the complexity, letting you focus on what matters.
              </p>
            </div>
            <div className="mission-image">
              <div className="image-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="url(#mission-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mission-icon pulse-animation">
                  <defs>
                    <linearGradient id="mission-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary-color)" />
                      <stop offset="100%" stopColor="var(--accent-color)" />
                    </linearGradient>
                  </defs>
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                <div className="floating-particles"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-values" ref={valuesRef}>
        <div className="container">
          <h2 className="section-title text-center gradient-text">Our Values</h2>
          <div className="values-grid">
            <div className="value-card fade-in-card">
              <div className="value-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div className="icon-background"></div>
              </div>
              <h3 className="value-title">Security First</h3>
              <p className="value-description">
                We prioritize security in every aspect of our framework, ensuring your applications are 
                built on a solid foundation that protects your users and their data.
              </p>
            </div>
            
            <div className="value-card fade-in-card delay-1">
              <div className="value-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <div className="icon-background"></div>
              </div>
              <h3 className="value-title">Developer Experience</h3>
              <p className="value-description">
                We believe that good tools should be a joy to use. We focus on creating intuitive APIs, 
                comprehensive documentation, and smooth workflows.
              </p>
            </div>
            
            <div className="value-card fade-in-card delay-2">
              <div className="value-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path>
                </svg>
                <div className="icon-background"></div>
              </div>
              <h3 className="value-title">Performance</h3>
              <p className="value-description">
                Performance is not an afterthought for us. JMF Framework is built from the ground up with 
                performance in mind, ensuring your applications run fast and efficiently.
              </p>
            </div>
            
            <div className="value-card fade-in-card delay-3">
              <div className="value-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div className="icon-background"></div>
              </div>
              <h3 className="value-title">Extensibility</h3>
              <p className="value-description">
                We design our framework to be modular and extensible, allowing you to add or modify functionality 
                to meet your specific needs without fighting against the framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-team" ref={teamRef}>
        <div className="container">
          <h2 className="section-title text-center gradient-text">Our Team</h2>
          <p className="section-subtitle">Current and future contributors to JMF Framework</p>
          
          <div className="team-wrapper">
            <div className="team-grid">
              {/* Active Team Member */}
              <div className="team-member active-member">
                <div className="member-spotlight"></div>
                <div className="member-avatar">
                  <div className="avatar-custom">
                    <div className="avatar-border"></div>
                    <img 
                      src="/images/icons/Nan.png" 
                      alt="Jaden Bowditch" 
                      className="avatar-image"
                    />
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">Jaden Bowditch</h3>
                  <p className="member-username">@Nanaimo_2013</p>
                  <div className="member-role-badge">Founder & Lead Developer</div>
                  <p className="member-bio">
                    Currently, I'm the sole developer working on JMF Framework, having started the project in 2025.
                    I'm passionate about creating a powerful, flexible framework that makes web development more enjoyable
                    and accessible to developers of all skill levels.
                  </p>
                  <div className="member-social">
                    <a href="https://github.com/Nanaimo_2013" className="social-link github" aria-label="GitHub Profile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com/Nanaimo_2013" className="social-link twitter" aria-label="Twitter Profile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Unfilled Position 1 */}
              <div className="team-member unfilled-position">
                <div className="member-avatar">
                  <div className="avatar-placeholder">
                    {emptyProfileIcon}
                    <div className="ripple-effect"></div>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="position-title">Frontend Specialist</h3>
                  <div className="position-badge">Position Open</div>
                  <p className="position-description">
                    We're looking for a frontend specialist with expertise in React, TypeScript, and 
                    UI/UX best practices to help develop the framework's component library and enhance 
                    the developer experience.
                  </p>
                  <div className="position-skills">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">UI/UX</span>
                  </div>
                </div>
              </div>
              
              {/* Unfilled Position 2 */}
              <div className="team-member unfilled-position">
                <div className="member-avatar">
                  <div className="avatar-placeholder">
                    {emptyProfileIcon}
                    <div className="ripple-effect"></div>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="position-title">Backend Engineer</h3>
                  <div className="position-badge">Position Open</div>
                  <p className="position-description">
                    Seeking a backend developer with experience in Node.js, API design, and database 
                    optimization to help develop the server-side capabilities of the framework.
                  </p>
                  <div className="position-skills">
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">API Design</span>
                    <span className="skill-tag">Databases</span>
                  </div>
                </div>
              </div>
              
              {/* Unfilled Position 3 */}
              <div className="team-member unfilled-position">
                <div className="member-avatar">
                  <div className="avatar-placeholder">
                    {emptyProfileIcon}
                    <div className="ripple-effect"></div>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="position-title">Documentation Specialist</h3>
                  <div className="position-badge">Position Open</div>
                  <p className="position-description">
                    Looking for someone with technical writing experience to create comprehensive, 
                    accessible documentation that helps developers get the most out of the framework.
                  </p>
                  <div className="position-skills">
                    <span className="skill-tag">Technical Writing</span>
                    <span className="skill-tag">Documentation</span>
                    <span className="skill-tag">Communication</span>
                  </div>
                </div>
              </div>
              
              {/* Unfilled Position 4 */}
              <div className="team-member unfilled-position">
                <div className="member-avatar">
                  <div className="avatar-placeholder">
                    {emptyProfileIcon}
                    <div className="ripple-effect"></div>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="position-title">DevOps Engineer</h3>
                  <div className="position-badge">Position Open</div>
                  <p className="position-description">
                    We need a DevOps expert to build and maintain CI/CD pipelines, testing infrastructure, 
                    and deployment tools that support the framework's development workflow.
                  </p>
                  <div className="position-skills">
                    <span className="skill-tag">CI/CD</span>
                    <span className="skill-tag">Docker</span>
                    <span className="skill-tag">Cloud Infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="join-team-container">
            <div className="join-team-background"></div>
            
            <h3 className="join-team-title">Open Source Contribution</h3>
            <p className="join-team-text">
              While JMF Framework is not currently accepting official team members, it remains an open source project
              that welcomes community contributions. The codebase is accessible to anyone interested in exploring and enhancing the framework.
            </p>
            <p className="join-team-subtitle">
              <strong>How to get involved:</strong> If you're passionate about modern web development and contribute consistently over time,
              you might be considered for an official role on the team in the future. Quality and commitment are key factors for potential team members.
            </p>
            <div className="join-team-cta">
              <a 
                href="https://github.com/jmf-framework/jmf-framework" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Explore on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-history" ref={historyRef}>
        <div className="container">
          <div className="history-content">
            <div className="history-text">
              <h2 className="section-title gradient-text">Our Journey</h2>
              <p className="history-paragraph">
                JMF Framework began in early 2025 as a response to the growing complexity of web development frameworks.
                While modern frameworks offer powerful capabilities, they often come with steep learning curves and overwhelming
                configurations. JMF aims to strike the perfect balance between power and simplicity.
              </p>
              <p className="history-paragraph">
                The framework emerged from countless hours of research, experimentation, and a deep understanding of 
                the pain points developers face daily. By combining the best aspects of established frameworks with innovative new
                approaches, JMF creates a development experience that is both familiar and refreshingly straightforward.
              </p>
              <p className="history-paragraph">
                Currently, the project is in active development with a focus on establishing solid core functionality, 
                comprehensive documentation, and building a foundation for community growth. Every feature is carefully
                considered, tested, and refined before integration, ensuring quality is never compromised for speed.
              </p>
            </div>
            <div className="history-timeline">
              <div className="timeline-track"></div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">Q1 2025</div>
                <div className="timeline-content">
                  <h4>Concept & Research</h4>
                  <p>Initial framework architecture and core concepts defined</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">Q2 2025</div>
                <div className="timeline-content">
                  <h4>Core Development</h4>
                  <p>Development of essential components and foundational systems</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">Q3 2025</div>
                <div className="timeline-content">
                  <h4>Documentation & Testing</h4>
                  <p>Creating comprehensive docs and establishing testing protocols</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">Q4 2025</div>
                <div className="timeline-content">
                  <h4>Alpha Release</h4>
                  <p>First public release for early adopters and feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section about-roadmap" ref={roadmapRef}>
        <div className="container">
          <h2 className="section-title text-center gradient-text">Framework Roadmap</h2>
          <p className="section-subtitle text-center">
            Our vision for the future of JMF Framework is ambitious and practical. Here's where we're headed:
          </p>
          
          <div className="roadmap-grid">
            <div className="roadmap-item short-term">
              <div className="roadmap-accent"></div>
              <h3 className="roadmap-title">Short-term (2025-2026)</h3>
              <ul className="roadmap-list">
                <li className="roadmap-list-item">Complete core feature development and stabilization</li>
                <li className="roadmap-list-item">Establish comprehensive documentation portal</li>
                <li className="roadmap-list-item">Create starter templates and examples</li>
                <li className="roadmap-list-item">Release first stable version with CLI tools</li>
                <li className="roadmap-list-item">Build initial plugin ecosystem</li>
                <li className="roadmap-list-item">Implement testing frameworks and utilities</li>
                <li className="roadmap-list-item">Develop first-party VS Code extension</li>
              </ul>
            </div>
            
            <div className="roadmap-item mid-term">
              <div className="roadmap-accent"></div>
              <h3 className="roadmap-title">Mid-term (2026-2027)</h3>
              <ul className="roadmap-list">
                <li className="roadmap-list-item">Expand community contributions and governance</li>
                <li className="roadmap-list-item">Implement advanced state management solutions</li>
                <li className="roadmap-list-item">Develop enterprise-grade security features</li>
                <li className="roadmap-list-item">Create advanced data fetching and caching systems</li>
                <li className="roadmap-list-item">Build official component libraries</li>
                <li className="roadmap-list-item">Support for server-side rendering and static generation</li>
                <li className="roadmap-list-item">Establish a certification program for developers</li>
              </ul>
            </div>
            
            <div className="roadmap-item long-term">
              <div className="roadmap-accent"></div>
              <h3 className="roadmap-title">Long-term (2027+)</h3>
              <ul className="roadmap-list">
                <li className="roadmap-list-item">Framework adoption by major enterprises</li>
                <li className="roadmap-list-item">AI-assisted development tools and features</li>
                <li className="roadmap-list-item">Advanced visualization and analytics capabilities</li>
                <li className="roadmap-list-item">Cross-platform support for mobile and desktop</li>
                <li className="roadmap-list-item">Integration with emerging web technologies</li>
                <li className="roadmap-list-item">Developer conferences and events</li>
                <li className="roadmap-list-item">Dedicated cloud hosting and deployment solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="contact-title gradient-text">Get in Touch</h2>
            <p className="contact-description">
              I'm always happy to hear from users, contributors, or anyone interested in JMF Framework. 
              Whether you have questions, feedback, or just want to say hello, there are several ways to reach me.
            </p>
            <div className="contact-links">
              <a href="mailto:contact@jmf-framework.org" className="contact-link email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email Me
              </a>
              <a href="https://github.com/jmf-framework/jmf-framework" className="contact-link github" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="https://twitter.com/jmf_framework" className="contact-link twitter" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 
import React, { useState, useEffect } from 'react';
import './Legal.css';
import GetInTouch from '../../components/GetInTouch';

const TermsOfService = () => {
  const [lastUpdated] = useState('June 15, 2023');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  
  // Animation for section entrance
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSectionEnter = (id: string) => {
    setActiveSection(id);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      content: `
        <p>Welcome to JMF Framework ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, software, documentation, APIs, and all related services (collectively, the "Services").</p>
        <p>By accessing or using the Services, you agree to be bound by these Terms. If you are using the Services on behalf of an organization, you agree to these Terms on behalf of that organization and represent that you have the authority to do so.</p>
        <p>Please read these Terms carefully. If you do not agree with these Terms, you may not access or use the Services.</p>
      `
    },
    {
      id: 'license',
      title: 'License and Usage',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      content: `
        <p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Services.</p>
        <p>The JMF Framework software is licensed under the MIT License. You are free to use, modify, and distribute the software according to the terms of that license, which can be found at <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">https://opensource.org/licenses/MIT</a>.</p>
        <p>You may not:</p>
        <ul>
          <li>Use the Services in any way that violates any applicable law or regulation</li>
          <li>Use the Services to infringe the intellectual property rights of others</li>
          <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services</li>
          <li>Impose an unreasonable or disproportionately large load on our infrastructure</li>
          <li>Upload or transmit viruses, malware, or other types of malicious software</li>
          <li>Use the Services for any purpose other than their intended purpose</li>
        </ul>
      `
    },
    {
      id: 'content',
      title: 'User Content',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      content: `
        <p>The Services may allow you to submit, upload, publish, or otherwise make available content such as code, text, data, or other materials ("User Content"). You retain ownership of any intellectual property rights that you hold in that User Content.</p>
        <p>By making User Content available, you grant us a worldwide, royalty-free, perpetual, irrevocable license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such User Content for the limited purpose of operating, developing, providing, and improving the Services.</p>
        <p>You represent and warrant that:</p>
        <ul>
          <li>You own or have the necessary rights to use and authorize us to use your User Content as described in these Terms</li>
          <li>Your User Content does not infringe or violate the intellectual property rights or any other rights of any third party</li>
        </ul>
      `
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <path d="M12 7v10"></path>
          <path d="M8 11h8"></path>
        </svg>
      ),
      content: `
        <p>Our Privacy Policy, available at <a href="/privacy-policy">Privacy Policy</a>, describes how we collect, use, and share your personal information. By using the Services, you also agree to our Privacy Policy.</p>
      `
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <path d="M13 2v7h7"></path>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
      content: `
        <p>We may terminate or suspend your access to the Services at any time and for any reason, including for violations of these Terms, without prior notice or liability.</p>
        <p>You may terminate your use of the Services at any time by discontinuing your use of the Services.</p>
        <p>Upon termination, your right to use the Services will immediately cease.</p>
      `
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      ),
      content: `
        <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
        <p>WE DO NOT WARRANT THAT THE SERVICES WILL FUNCTION WITHOUT ERROR OR INTERRUPTION, OR THAT THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
      `
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      content: `
        <p>IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (iii) ANY CONTENT OBTAINED FROM THE SERVICES; AND (iv) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
      `
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      content: `
        <p>We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such as by posting the revised Terms on our website or updating the "Last Updated" date.</p>
        <p>Your continued use of the Services following notification of changes constitutes your acceptance of those changes.</p>
      `
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      content: `
        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where our company is established, without regard to its conflict of law provisions.</p>
        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
      `
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      content: `
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@jmf-framework.org">legal@jmf-framework.org</a>.</p>
      `
    }
  ];

  // Initialize expandedSections on mount
  useEffect(() => {
    const initialExpanded: { [key: string]: boolean } = {};
    sections.forEach(section => {
      initialExpanded[section.id] = true; // All sections expanded by default
    });
    setExpandedSections(initialExpanded);
  }, []);

  return (
    <div className="legal-page terms-of-service">
      <div className="legal-header animate-section">
        <div className="legal-header-bg"></div>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last Updated: {lastUpdated}</p>
        <div className="legal-action-bar">
          <button className="print-button" onClick={() => window.print()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
          </button>
          <button 
            className="expand-all-button"
            onClick={() => {
              const allExpanded = Object.values(expandedSections).every(value => value);
              const newState = !allExpanded;
              const newExpandedSections: { [key: string]: boolean } = {};
              sections.forEach(section => {
                newExpandedSections[section.id] = newState;
              });
              setExpandedSections(newExpandedSections);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {Object.values(expandedSections).every(value => value) ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </>
              )}
            </svg>
            {Object.values(expandedSections).every(value => value) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      <div className="legal-container">
        <div className="legal-sidebar animate-section">
          <div className="table-of-contents">
            <h3>Contents</h3>
            <ul>
              {sections.map(section => (
                <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
                  <a href={`#${section.id}`} className="toc-link">
                    <span className="toc-icon">{section.icon}</span>
                    <span className="toc-text">{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="legal-sidebar-help">
            <h4>Need Help?</h4>
            <p>If you have any questions about our Terms of Service, please reach out to our legal team.</p>
            <a href="/contact" className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Contact Support
            </a>
          </div>
        </div>

        <div className="legal-content animate-section">
          {sections.map(section => (
            <section 
              key={section.id} 
              id={section.id} 
              className="legal-section"
              onMouseEnter={() => handleSectionEnter(section.id)}
              onMouseLeave={handleSectionLeave}
            >
              <div className="section-header" onClick={() => toggleSection(section.id)}>
                <div className="section-title">
                  <span className="section-icon">{section.icon}</span>
                  <h2>{section.title}</h2>
                </div>
                <button className={`toggle-button ${expandedSections[section.id] ? 'expanded' : ''}`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={expandedSections[section.id] ? 'rotate' : ''}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <div className={`section-content ${expandedSections[section.id] ? 'expanded' : ''}`}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </section>
          ))}
          
          <div className="legal-footer">
            <p>© {new Date().getFullYear()} JMF Framework. All Rights Reserved.</p>
            <div className="legal-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <span className="divider">|</span>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="legal-cta-section animate-section">
        <div className="cta-card">
          <h3>Have questions about our Terms?</h3>
          <p>Our support team is here to help you understand our legal policies.</p>
          <a href="/contact" className="cta-button">Contact Support</a>
        </div>
        <div className="cta-card">
          <h3>Ready to get started?</h3>
          <p>Download JMF Framework and start building amazing projects today.</p>
          <a href="/download" className="cta-button">Download Now</a>
        </div>
      </div>
      
      <GetInTouch variant="secondary" />
    </div>
  );
};

export default TermsOfService; 
import React, { useState, useEffect } from 'react';
import './Legal.css';
import GetInTouch from '../../components/GetInTouch';

const PrivacyPolicy = () => {
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
        <p>This Privacy Policy describes how JMF Framework ("we," "our," or "us") collects, uses, and shares information about you when you use our website, software, documentation, APIs, and related services (collectively, the "Services").</p>
        <p>By using the Services, you agree to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with our policies and practices, do not use the Services.</p>
      `
    },
    {
      id: 'information',
      title: 'Information We Collect',
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
        <h3>Information You Provide to Us</h3>
        <p>We collect information you provide directly to us, such as:</p>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
          <li><strong>Profile Information:</strong> Information you add to your profile, such as a profile picture, biography, website, and social media handles.</li>
          <li><strong>Communication:</strong> Information you provide when you contact us, participate in surveys, or communicate with other users.</li>
          <li><strong>Payment Information:</strong> If you make a purchase, we collect payment information, billing address, and contact details.</li>
          <li><strong>User Content:</strong> Content you submit, post, or share through the Services, such as code, comments, and feedback.</li>
        </ul>

        <h3>Information We Collect Automatically</h3>
        <p>When you use the Services, we may automatically collect certain information, including:</p>
        <ul>
          <li><strong>Usage Information:</strong> Information about your interactions with the Services, such as the pages or content you view, the features you use, and the actions you take.</li>
          <li><strong>Device Information:</strong> Information about the device you use to access the Services, including the hardware model, operating system, browser type, and IP address.</li>
          <li><strong>Location Information:</strong> General location information inferred from your IP address.</li>
          <li><strong>Cookies and Similar Technologies:</strong> We and our third-party partners may use cookies, web beacons, and similar technologies to collect information about your use of the Services.</li>
        </ul>
      `
    },
    {
      id: 'use',
      title: 'How We Use Your Information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      content: `
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve the Services</li>
          <li>Process transactions and send related information, including confirmations, receipts, and invoices</li>
          <li>Send technical notices, updates, security alerts, and administrative messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Communicate with you about products, services, offers, promotions, and events</li>
          <li>Monitor and analyze trends, usage, and activities in connection with the Services</li>
          <li>Detect, investigate, and prevent security incidents and other malicious, fraudulent, or illegal activity</li>
          <li>Personalize and improve the Services</li>
          <li>Debug to identify and repair errors in the Services</li>
          <li>Comply with our legal obligations</li>
        </ul>
      `
    },
    {
      id: 'share',
      title: 'How We Share Your Information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      ),
      content: `
        <p>We may share information about you as follows or as otherwise described in this Privacy Policy:</p>
        <ul>
          <li><strong>With Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
          <li><strong>With Other Users:</strong> When you submit content or information that is intended to be shared with other users, such information will be visible to other users of the Services.</li>
          <li><strong>For Legal Reasons:</strong> We may share information if we believe that disclosure is reasonably necessary to comply with a law, regulation, legal request, or governmental request; to protect the safety, rights, or property of the public, any person, or JMF Framework; or to detect, prevent, or otherwise address security or technical issues.</li>
          <li><strong>Business Transfers:</strong> We may share or transfer information in connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li><strong>Aggregated or De-identified Information:</strong> We may share aggregated or de-identified information, which cannot reasonably be used to identify you.</li>
        </ul>
      `
    },
    {
      id: 'security',
      title: 'Security',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      content: `
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.</p>
        <p>Some of the security measures we implement include:</p>
        <ul>
          <li>Using encryption to protect sensitive data in transit and at rest</li>
          <li>Implementing access controls to limit who can access your personal information</li>
          <li>Regularly reviewing our information collection, storage, and processing practices</li>
          <li>Restricting access to personal information to employees, contractors, and agents who need to know that information</li>
        </ul>
      `
    },
    {
      id: 'choices',
      title: 'Your Choices',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      ),
      content: `
        <h3>Account Information</h3>
        <p>You may update, correct, or delete your account information at any time by logging into your account or contacting us. Note that we may retain certain information as required by law or for legitimate business purposes.</p>

        <h3>Cookies</h3>
        <p>Most web browsers are set to accept cookies by default. If you prefer, you can usually set your browser to remove or reject cookies. Please note that removing or rejecting cookies could affect the availability and functionality of the Services.</p>

        <h3>Promotional Communications</h3>
        <p>You may opt out of receiving promotional communications from us by following the instructions in those messages or by contacting us. If you opt out, we may still send you non-promotional communications, such as those about your account or our ongoing business relations.</p>
      `
    },
    {
      id: 'data-transfers',
      title: 'International Data Transfers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      content: `
        <p>We are based in the United States and the information we collect is governed by U.S. law. By accessing or using the Services or otherwise providing information to us, you consent to the processing, transfer, and storage of information in and to the U.S. and other countries, where you may not have the same rights as you do under local law.</p>
      `
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      content: `
        <p>The Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information of a child under 13, we will take steps to delete such information from our files as soon as possible.</p>
        <p>If you believe we might have any information from or about a child under 13, please contact us at <a href="mailto:privacy@jmf-framework.org">privacy@jmf-framework.org</a>.</p>
      `
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      content: `
        <p>We may modify this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide additional notice (such as adding a statement to our website or sending you a notification).</p>
        <p>Your continued use of the Services after the modified Privacy Policy has been posted constitutes your acceptance of the changes.</p>
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
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@jmf-framework.org">privacy@jmf-framework.org</a>.</p>
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
    <div className="legal-page privacy-policy">
      <div className="legal-header animate-section">
        <div className="legal-header-bg"></div>
        <h1>Privacy Policy</h1>
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
            <p>If you have any questions about our Privacy Policy, please reach out to our team.</p>
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
          <div className="privacy-summary-cards">
            <div className="summary-card">
              <div className="summary-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Data Collection</h3>
              <p>We collect information you provide directly and data generated through your use of our services.</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Data Security</h3>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access.</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
              </div>
              <h3>Your Controls</h3>
              <p>You can update your account information, manage cookie settings, and opt out of promotional communications.</p>
            </div>
          </div>

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
              <a href="/terms-of-service">Terms of Service</a>
              <span className="divider">|</span>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-controls animate-section">
        <h3>Privacy Control Links</h3>
        <div className="control-links">
          <a href="/contact" className="control-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Data Request
          </a>
          <a href="/contact" className="control-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
            Delete My Data
          </a>
          <a href="/contact" className="control-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Opt Out
          </a>
          <a href="/contact" className="control-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Privacy FAQ
          </a>
        </div>
      </div>
      
      <div className="legal-cta-section animate-section">
        <div className="cta-card">
          <h3>Have questions about our Privacy Policy?</h3>
          <p>Our support team is here to help you understand our privacy practices.</p>
          <a href="/contact" className="cta-button">Contact Support</a>
        </div>
        <div className="cta-card">
          <h3>Ready to get started?</h3>
          <p>Download JMF Framework and start building amazing projects today.</p>
          <a href="/download" className="cta-button">Download Now</a>
        </div>
      </div>
      
      <GetInTouch variant="accent" />
    </div>
  );
};

export default PrivacyPolicy; 
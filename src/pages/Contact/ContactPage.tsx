import React, { useState, useEffect } from 'react';
import { useNotification } from '../../components/NotificationManager';
import './ContactPage.css';
import GetInTouch from '../../components/GetInTouch';

// Adding more icon components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

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

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const BugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="8" height="14" rx="4"></rect>
    <path d="M19 8c0-1.5-2-3-7-3s-7 1.5-7 3"></path>
    <path d="M5 8v8c0 1.5 2 3 7 3s7-1.5 7-3V8"></path>
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

const ContactPage = () => {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [submitted, setSubmitted] = useState(false);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject) {
      errors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification('Please correct the errors in the form', 'error', 5000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      addNotification('Your message has been sent successfully!', 'success', 5000);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Hide success message after some time
      setTimeout(() => {
        setSubmitted(false);
      }, 8000);
    }, 1500);
  };
  
  // Updated contact methods to reflect it's a single-person open source project
  const contactMethods = [
    {
      title: 'GitHub Repository',
      icon: <GithubIcon />,
      content: (
        <>
          <p>The main repository for the JMF Framework project</p>
          <p className="hours">Open source contributions are welcome!</p>
          <div className="action-button">
            <a href="https://github.com/jmf-framework/core" target="_blank" rel="noopener noreferrer" className="contact-action">
              <GithubIcon />
              View Repository
            </a>
          </div>
        </>
      )
    },
    {
      title: 'Email Support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      content: (
        <>
          <p>support@jmf-framework.org</p>
          <p className="hours">Response time: Usually within 48 hours</p>
          <div className="action-button">
            <a href="mailto:support@jmf-framework.org" className="contact-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Send Email
            </a>
          </div>
        </>
      )
    },
    {
      title: 'Community',
      icon: <DiscordIcon />,
      content: (
        <>
          <p>Join our community on Discord to chat, ask questions, and collaborate</p>
          <div className="social-links">
            <a href="https://github.com/jmf-framework" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com/jmf_framework" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://discord.gg/jmf-framework" target="_blank" rel="noopener noreferrer">Discord</a>
          </div>
          <div className="action-button">
            <a href="https://discord.gg/jmf-framework" target="_blank" rel="noopener noreferrer" className="contact-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Join Our Community
            </a>
          </div>
        </>
      )
    }
  ];
  
  // Subject options with explanations
  const subjectOptions = [
    { value: "General Inquiry", label: "General Inquiry", description: "Questions about JMF Framework or how to use it." },
    { value: "Technical Support", label: "Technical Support", description: "Help with implementation issues or technical problems." },
    { value: "Feature Request", label: "Feature Request", description: "Suggest new functionality or improvements to the framework." },
    { value: "Bug Report", label: "Bug Report", description: "Report issues or unexpected behavior in the framework." },
    { value: "Partnership", label: "Partnership", description: "Discuss potential collaboration or partnership opportunities." },
    { value: "Documentation Feedback", label: "Documentation Feedback", description: "Suggestions to improve the framework documentation." },
    { value: "Other", label: "Other", description: "Any other topics not covered by the categories above." }
  ];
  
  const faqs = [
    {
      question: 'How do I get started with JMF Framework?',
      answer: 'Visit our <a href="/documentation/getting-started">Getting Started</a> guide to learn how to install and set up your first JMF Framework project.'
    },
    {
      question: 'Is JMF Framework free to use?',
      answer: 'Yes, JMF Framework is open-source and free to use for personal and commercial projects under the MIT license.'
    },
    {
      question: 'How do I report a bug?',
      answer: 'You can report bugs by opening an issue on our <a href="https://github.com/jmf-framework/core/issues" target="_blank" rel="noopener noreferrer">GitHub repository</a> or by contacting us through this form.'
    },
    {
      question: 'Can I contribute to JMF Framework?',
      answer: 'Absolutely! Check out our <a href="https://github.com/jmf-framework/core/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contribution guidelines</a> to get started.'
    },
    {
      question: 'What browsers does JMF Framework support?',
      answer: 'JMF Framework supports all modern browsers including Chrome, Firefox, Safari, and Edge. We provide fallbacks for older browsers when possible.'
    },
    {
      question: 'How often is JMF Framework updated?',
      answer: 'We release minor updates and patches monthly, with major version updates approximately every 6 months.'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-header animate-section">
        <div className="header-background"></div>
        <h1>Contact Us</h1>
        <p>Have questions about JMF Framework? We're here to help!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info animate-section">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className={`info-card ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="info-icon">
                {method.icon}
              </div>
              <h3>{method.title}</h3>
              <div className="info-content">
                {method.content}
              </div>
              <div className="card-background"></div>
            </div>
          ))}
        </div>

        <div className="contact-form-container animate-section">
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>Message Sent!</h2>
              <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
              <button 
                className="new-message-button"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className={`form-group ${formErrors.name ? 'error' : ''}`}>
                  <label htmlFor="name">Your Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><UserIcon /></span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                  <div className="field-description">Let us know who we're talking to</div>
                </div>

                <div className={`form-group ${formErrors.email ? 'error' : ''}`}>
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><EmailIcon /></span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                  <div className="field-description">We'll use this to respond to your inquiry</div>
                </div>

                <div className={`form-group ${formErrors.subject ? 'error' : ''}`}>
                  <label htmlFor="subject">Subject</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><TagIcon /></span>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.subject && <div className="error-message">{formErrors.subject}</div>}
                  <div className="field-description">
                    {formData.subject 
                      ? subjectOptions.find(option => option.value === formData.subject)?.description
                      : "Choose the topic that best fits your message"}
                  </div>
                </div>

                <div className={`form-group ${formErrors.message ? 'error' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <div className="input-wrapper textarea-wrapper">
                    <span className="input-icon textarea-icon"><MessageIcon /></span>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you? Please provide as much detail as possible."
                      rows={6}
                    />
                  </div>
                  {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                  <div className="field-description">Be specific to help us understand your needs better</div>
                </div>

                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <EmailIcon />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="faq-section animate-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h3>{faq.question}</h3>
              <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          ))}
        </div>
      </div>
      
      <GetInTouch variant="primary" />
    </div>
  );
};

export default ContactPage; 
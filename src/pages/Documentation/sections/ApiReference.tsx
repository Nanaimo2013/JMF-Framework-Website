import React from 'react';
import { TableOfContents, CodeBlock } from '../DocumentationPage';
import { useNotification } from '../../../components/NotificationManager';

const ApiReference = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'core-api-overview', title: 'Core API Overview' },
    { id: 'core-api-examples', title: 'Core API Examples' },
    { id: 'api-documentation', title: 'API Documentation' }
  ];
  
  const showApiNotification = () => {
    addNotification('API documentation has been copied to clipboard!', 'success', 5000);
  };

  return (
    <div className="documentation-section">
      <h1>API Reference</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="introduction" className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF Framework API provides a comprehensive set of tools and utilities for building 
          modern web applications. This reference documentation covers the core API features and 
          provides examples of how to use them.
        </p>
      </section>
      
      <section id="core-api-overview" className="doc-section">
        <h2>Core API Overview</h2>
        
        <p>
          JMF Framework is organized into several core modules that handle different aspects of 
          application development:
        </p>
        
        <ul className="api-modules">
          <li>
            <h3>jmf-core</h3>
            <p>The foundation of the framework, providing essential utilities and base classes.</p>
            <a href="/documentation/sections/api/api-core">View Details</a>
          </li>
          <li>
            <h3>jmf-router</h3>
            <p>Client and server-side routing for your application.</p>
            <a href="/documentation/sections/api/api-router">View Details</a>
          </li>
          <li>
            <h3>jmf-state</h3>
            <p>State management solutions for maintaining application data.</p>
            <a href="/documentation/sections/api/api-state">View Details</a>
          </li>
          <li>
            <h3>jmf-ui</h3>
            <p>UI components and utilities for building interfaces.</p>
            <a href="/documentation/sections/api/api-ui">View Details</a>
          </li>
          <li>
            <h3>jmf-data</h3>
            <p>Data fetching, caching, and persistence utilities.</p>
            <a href="/documentation/sections/api/api-data">View Details</a>
          </li>
        </ul>
      </section>
      
      <section id="core-api-examples" className="doc-section">
        <h2>Core API Examples</h2>
        
        <h3>Creating a Component</h3>
        <CodeBlock language="javascript" title="Component Creation Example" showLineNumbers={true}>
{`import { Component } from 'jmf-core';

class MyComponent extends Component {
  render() {
    return {
      type: 'div',
      props: {
        className: 'my-component',
        children: 'Hello, JMF Framework!'
      }
    };
  }
}

export default MyComponent;`}
        </CodeBlock>
        
        <h3>Setting Up Routing</h3>
        <CodeBlock language="jsx" title="Router Configuration" showLineNumbers={true}>
{`import { Router, Route } from 'jmf-router';
import { HomePage, AboutPage, ContactPage } from './pages';

const AppRouter = () => (
  <Router>
    <Route path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/contact" component={ContactPage} />
  </Router>
);

export default AppRouter;`}
        </CodeBlock>
      </section>
      
      <section id="api-documentation" className="doc-section">
        <h2>API Documentation</h2>
        <p>
          For detailed documentation on each API module, please visit the following pages:
        </p>
        
        <div className="example-card">
          <h3>API Module Documentation</h3>
          <p>Explore our comprehensive API documentation for each module:</p>
          <div className="example-links">
            <a href="/documentation/sections/api/api-core" className="example-link">Core API</a>
            <a href="/documentation/sections/api/api-router" className="example-link">Router API</a>
            <a href="/documentation/sections/api/api-state" className="example-link">State API</a>
            <a href="/documentation/sections/api/api-ui" className="example-link">UI Components API</a>
            <a href="/documentation/sections/api/api-data" className="example-link">Data API</a>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={showApiNotification} 
            style={{ 
              background: '#3b82f6',
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy API Reference Links
          </button>
        </div>
      </section>
    </div>
  );
};

export default ApiReference; 
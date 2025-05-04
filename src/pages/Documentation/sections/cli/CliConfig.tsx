import React from 'react';
import { TableOfContents, CodeBlock } from '../../DocumentationPage';
import { useNotification } from '../../../../components/NotificationManager';

const CliConfig = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'configuration-file', title: 'Configuration File' },
    { id: 'available-options', title: 'Available Configuration Options' },
    { id: 'advanced-configuration', title: 'Advanced Configuration' },
    { id: 'environment-specific', title: 'Environment-Specific Configuration' }
  ];
  
  const showCopyNotification = () => {
    addNotification('Configuration example copied to clipboard!', 'success', 3000);
  };

  return (
    <div className="documentation-section">
      <h1>CLI Configuration</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="introduction" className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF Framework CLI can be customized through a configuration file named <code>jmf.config.js</code> in the root of your project.
          This file allows you to define project-specific settings and customize the behavior of various CLI commands.
        </p>
      </section>
      
      <section id="configuration-file" className="doc-section">
        <h2>Configuration File</h2>
        <p>
          The configuration file is a JavaScript file that exports an object with various configuration options.
          Here's a simple example of a <code>jmf.config.js</code> file:
        </p>
        
        <CodeBlock language="javascript" title="jmf.config.js" showLineNumbers={true}>
{`// jmf.config.js
module.exports = {
  server: {
    port: 8080,
    host: '0.0.0.0',
    https: false
  },
  build: {
    output: 'dist',
    sourceMaps: true,
    minify: true
  },
  plugins: [
    'jmf-seo',
    'jmf-pwa'
  ]
};`}
        </CodeBlock>
        
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={showCopyNotification} 
            style={{ 
              background: '#10b981',
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
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            Copy Config Example
          </button>
        </div>
      </section>
      
      <section id="available-options" className="doc-section">
        <h2>Available Configuration Options</h2>
        
        <h3>Server Options</h3>
        <div className="config-option">
          <h4>server.port</h4>
          <p><strong>Type:</strong> Number</p>
          <p><strong>Default:</strong> 3000</p>
          <p>The port number to use for the development server.</p>
        </div>
        
        <div className="config-option">
          <h4>server.host</h4>
          <p><strong>Type:</strong> String</p>
          <p><strong>Default:</strong> 'localhost'</p>
          <p>The host to bind the server to. Use '0.0.0.0' to allow access from external devices.</p>
        </div>
        
        <div className="config-option">
          <h4>server.https</h4>
          <p><strong>Type:</strong> Boolean | Object</p>
          <p><strong>Default:</strong> false</p>
          <p>Enable HTTPS. When set to an object, you can provide custom SSL certificate options.</p>
        </div>
        
        <h3>Build Options</h3>
        <div className="config-option">
          <h4>build.output</h4>
          <p><strong>Type:</strong> String</p>
          <p><strong>Default:</strong> 'dist'</p>
          <p>The directory where built files will be output.</p>
        </div>
        
        <div className="config-option">
          <h4>build.sourceMaps</h4>
          <p><strong>Type:</strong> Boolean</p>
          <p><strong>Default:</strong> true</p>
          <p>Whether to generate source maps for the built files.</p>
        </div>
        
        <div className="config-option">
          <h4>build.minify</h4>
          <p><strong>Type:</strong> Boolean</p>
          <p><strong>Default:</strong> true</p>
          <p>Whether to minify the built files.</p>
        </div>
        
        <h3>Plugins</h3>
        <div className="config-option">
          <h4>plugins</h4>
          <p><strong>Type:</strong> Array</p>
          <p><strong>Default:</strong> []</p>
          <p>An array of plugin names or plugin configuration objects to be loaded by the CLI.</p>
        </div>
        
        <h3>Environment Variables</h3>
        <div className="config-option">
          <h4>env</h4>
          <p><strong>Type:</strong> Object</p>
          <p><strong>Default:</strong> {}</p>
          <p>Environment variables to be made available to your application during development and build.</p>
        </div>
      </section>
      
      <section id="advanced-configuration" className="doc-section">
        <h2>Advanced Configuration</h2>
        
        <h3>Custom Webpack Configuration</h3>
        <p>
          You can customize the Webpack configuration used by JMF Framework by providing a function
          that modifies the default configuration:
        </p>
        
        <CodeBlock language="javascript" title="Custom Webpack Config">
{`// jmf.config.js
module.exports = {
  // ... other options
  webpack: (config, env) => {
    // Modify the webpack config
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components')
    };
    
    return config;
  }
};`}
        </CodeBlock>
        
        <h3>Custom Development Server Middleware</h3>
        <p>
          You can add custom middleware to the development server:
        </p>
        
        <CodeBlock language="javascript" title="Custom Server Middleware">
{`// jmf.config.js
module.exports = {
  // ... other options
  serverMiddleware: [
    {
      path: '/api/mock',
      handler: (req, res) => {
        res.json({ message: 'This is mock data' });
      }
    }
  ]
};`}
        </CodeBlock>
      </section>
      
      <section id="environment-specific" className="doc-section">
        <h2>Environment-Specific Configuration</h2>
        <p>
          You can provide different configurations for different environments by creating environment-specific
          configuration files:
        </p>
        
        <ul>
          <li><code>jmf.config.js</code> - Base configuration</li>
          <li><code>jmf.config.dev.js</code> - Development environment</li>
          <li><code>jmf.config.prod.js</code> - Production environment</li>
          <li><code>jmf.config.test.js</code> - Test environment</li>
        </ul>
        
        <p>
          The environment-specific configurations will be merged with the base configuration,
          with the environment-specific options taking precedence.
        </p>
      </section>
    </div>
  );
};

export default CliConfig; 
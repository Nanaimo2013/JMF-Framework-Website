import React from 'react';
import { TableOfContents, CodeBlock } from '../DocumentationPage';
import { useNotification } from '../../../components/NotificationManager';

const CliCommands = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'global-commands', title: 'Global Commands' },
    { id: 'project-creation', title: 'Project Creation' },
    { id: 'development-commands', title: 'Development Commands' },
    { id: 'generator-commands', title: 'Generator Commands' },
    { id: 'deployment-commands', title: 'Deployment Commands' },
    { id: 'configuration', title: 'Configuration' }
  ];
  
  const showCliNotification = () => {
    addNotification('CLI command copied to clipboard!', 'success', 3000);
  };
  
  return (
    <div className="documentation-section">
      <h1>CLI Commands</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="introduction" className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF Framework CLI (Command Line Interface) provides a set of powerful commands to help
          you create, develop, test, and deploy your applications. This guide covers all available commands and their usage.
        </p>
      </section>
      
      <section id="global-commands" className="doc-section">
        <h2>Global Commands</h2>
        
        <div className="command-card">
          <h3>jmf --help</h3>
          <p>Display help information for JMF CLI and list all available commands.</p>
          <CodeBlock language="bash" title="Help Command">jmf --help</CodeBlock>
        </div>
        
        <div className="command-card">
          <h3>jmf --version</h3>
          <p>Display the current version of JMF Framework.</p>
          <CodeBlock language="bash" title="Version Command">jmf --version</CodeBlock>
        </div>
      </section>
      
      <section id="project-creation" className="doc-section">
        <h2>Project Creation</h2>
        
        <div className="command-card">
          <h3>jmf create</h3>
          <p>Create a new JMF Framework project.</p>
          <h4>Options:</h4>
          <ul>
            <li><code>--template</code>: Specify a project template (default: "standard")</li>
            <li><code>--typescript</code>: Generate TypeScript project (default: true)</li>
            <li><code>--skip-install</code>: Skip installing dependencies</li>
          </ul>
          <CodeBlock language="bash" title="Create Project Command">jmf create my-project --template=api</CodeBlock>
          
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={showCliNotification} 
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
              Copy Create Command
            </button>
          </div>
        </div>
      </section>
      
      <section id="development-commands" className="doc-section">
        <h2>Development Commands</h2>
        
        <div className="command-card">
          <h3>jmf serve</h3>
          <p>Start the development server with hot reload.</p>
          <h4>Options:</h4>
          <ul>
            <li><code>--port</code>: Specify the port (default: 3000)</li>
            <li><code>--host</code>: Specify the host (default: localhost)</li>
            <li><code>--https</code>: Use HTTPS</li>
          </ul>
          <CodeBlock language="bash" title="Development Server Command">jmf serve --port=8080</CodeBlock>
        </div>
        
        <div className="command-card">
          <h3>jmf build</h3>
          <p>Build the application for production.</p>
          <h4>Options:</h4>
          <ul>
            <li><code>--output</code>: Specify the output directory (default: "dist")</li>
            <li><code>--analyze</code>: Analyze bundle size</li>
          </ul>
          <CodeBlock language="bash" title="Build Command">jmf build --analyze</CodeBlock>
        </div>
        
        <div className="command-card">
          <h3>jmf test</h3>
          <p>Run tests.</p>
          <h4>Options:</h4>
          <ul>
            <li><code>--watch</code>: Watch files for changes and rerun tests</li>
            <li><code>--coverage</code>: Generate coverage report</li>
          </ul>
          <CodeBlock language="bash" title="Test Command">jmf test --coverage</CodeBlock>
        </div>
      </section>
      
      <section id="generator-commands" className="doc-section">
        <h2>Generator Commands</h2>
        
        <div className="command-card">
          <h3>jmf generate component</h3>
          <p>Generate a new component.</p>
          <CodeBlock language="bash" title="Generate Component">jmf generate component Button</CodeBlock>
          
          <p style={{ marginTop: '1rem' }}>Example output:</p>
          <CodeBlock language="typescript" title="Generated Component" showLineNumbers={true}>
{`import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;`}
          </CodeBlock>
        </div>
        
        <div className="command-card">
          <h3>jmf generate page</h3>
          <p>Generate a new page.</p>
          <CodeBlock language="bash" title="Generate Page">jmf generate page About</CodeBlock>
        </div>
        
        <div className="command-card">
          <h3>jmf generate api</h3>
          <p>Generate a new API endpoint.</p>
          <CodeBlock language="bash" title="Generate API">jmf generate api users</CodeBlock>
        </div>
      </section>
      
      <section id="deployment-commands" className="doc-section">
        <h2>Deployment Commands</h2>
        
        <div className="command-card">
          <h3>jmf deploy</h3>
          <p>Deploy your application to a configured platform.</p>
          <h4>Options:</h4>
          <ul>
            <li><code>--platform</code>: Specify the platform (default: from config)</li>
            <li><code>--env</code>: Specify the environment (default: "production")</li>
          </ul>
          <CodeBlock language="bash" title="Deploy Command">jmf deploy --platform=vercel --env=staging</CodeBlock>
        </div>
      </section>
      
      <section id="configuration" className="doc-section">
        <h2>Configuration</h2>
        <p>
          JMF CLI uses a configuration file <code>jmf.config.js</code> in the root of your project to customize its behavior.
          For detailed information on configuring the CLI, please see our <a href="/documentation/sections/cli/cli-config">CLI Configuration</a> guide.
        </p>
        
        <CodeBlock language="javascript" title="Example Configuration" showLineNumbers={true}>
{`// jmf.config.js
module.exports = {
  // Project settings
  name: "my-awesome-app",
  version: "1.0.0",
  
  // Build configuration
  build: {
    output: "dist",
    sourceMaps: true,
    minify: true,
    assets: ["public"]
  },
  
  // Development server
  server: {
    port: 3000,
    host: "localhost",
    https: false,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  
  // Deployment configuration
  deploy: {
    platform: "vercel",
    environments: {
      production: {
        branch: "main"
      },
      staging: {
        branch: "develop"
      }
    }
  }
};`}
        </CodeBlock>
      </section>
    </div>
  );
};

export default CliCommands; 
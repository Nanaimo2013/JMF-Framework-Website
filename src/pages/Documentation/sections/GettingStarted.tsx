import React from 'react';
import { TableOfContents, CodeBlock } from '../DocumentationPage';
import { useNotification } from '../../../components/NotificationManager';

const GettingStarted = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'installation', title: 'Installation' },
    { id: 'system-requirements', title: 'System Requirements' },
    { id: 'first-project', title: 'Creating Your First Project' },
    { id: 'project-structure', title: 'Project Structure' },
    { id: 'next-steps', title: 'Next Steps' }
  ];
  
  // Demonstration functions for notifications
  const showErrorNotification = () => {
    addNotification('This is an error message to demonstrate how they appear', 'error', 5000);
  };
  
  const showInfoNotification = () => {
    addNotification('This is an info message with helpful information', 'info', 5000);
  };
  
  const showWarningNotification = () => {
    addNotification('This is a warning message about potential issues', 'warning', 5000);
  };
  
  const showSuccessNotification = () => {
    addNotification('Success! This action was completed successfully', 'success', 5000);
  };

  return (
    <div className="documentation-section">
      <h1>Getting Started with JMF Framework</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="installation" className="doc-section">
        <h2>Installation</h2>
        <p>
          JMF Framework can be installed globally via npm or yarn. This will give you access to the JMF CLI tools.
        </p>
        
        <CodeBlock language="bash" title="NPM Install">npm install -g jmf-framework</CodeBlock>
        <p>or with yarn:</p>
        <CodeBlock language="bash" title="Yarn Install">yarn global add jmf-framework</CodeBlock>
        
        <p>
          Once installed, you can verify it's working by running:
        </p>
        
        <CodeBlock language="bash">jmf --version</CodeBlock>
      </section>
      
      <section id="system-requirements" className="doc-section">
        <h2>System Requirements</h2>
        
        <ul className="requirements-list">
          <li>
            <strong>Node.js:</strong> version 14.0 or higher
          </li>
          <li>
            <strong>NPM:</strong> version 6.0 or higher
          </li>
          <li>
            <strong>Operating System:</strong> Windows 10+, macOS 10.15+, or Linux
          </li>
        </ul>
        
        <p>
          You can test the notification system by clicking these buttons:
        </p>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button 
            onClick={showSuccessNotification} 
            style={{ 
              background: '#10b981',
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 500
            }}
          >
            Success Notification
          </button>
          
          <button 
            onClick={showErrorNotification} 
            style={{ 
              background: '#ef4444',
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 500
            }}
          >
            Error Notification
          </button>
          
          <button 
            onClick={showWarningNotification} 
            style={{ 
              background: '#f59e0b',
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 500
            }}
          >
            Warning Notification
          </button>
          
          <button 
            onClick={showInfoNotification} 
            style={{ 
              background: '#3b82f6',
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 500
            }}
          >
            Info Notification
          </button>
        </div>
      </section>
      
      <section id="first-project" className="doc-section">
        <h2>Creating Your First Project</h2>
        
        <p>
          To create a new project with JMF Framework, use the following command:
        </p>
        
        <CodeBlock language="bash" title="Create Project">jmf create my-project</CodeBlock>
        
        <p>
          This will create a new directory with the project name and set up the basic project structure.
          Once the project is created, you can navigate to it and start the development server:
        </p>
        
        <CodeBlock language="bash" title="Start Development Server">cd my-project
npm install  # Install dependencies
jmf serve</CodeBlock>
        
        <p>
          Your application will now be running at <code>http://localhost:3000</code>.
        </p>
      </section>
      
      <section id="project-structure" className="doc-section">
        <h2>Project Structure</h2>
        
        <p>Here's an example of how your JMF project structure will look:</p>
        
        <CodeBlock language="typescript" title="Project Structure" showLineNumbers={true}>
{`my-project/
├── dist/                # Compiled output
├── node_modules/        # Dependencies
├── public/              # Static assets
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── utils/           # Utilities and helpers
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Entry point
│   └── theme.ts         # Global styles
├── .eslintrc            # ESLint configuration
├── .gitignore           # Git ignore file
├── jmf.config.js        # JMF configuration
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
└── tsconfig.json        # TypeScript configuration`}
        </CodeBlock>
        
        <p>Here's an example of a component you might create in your JMF project:</p>
        
        <CodeBlock language="typescript" title="Example Component" showLineNumbers={true}>
{`import React, { useState } from 'react';
import { Component } from 'jmf-framework';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  icon,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  
  return (
    <button 
      className={\`btn btn-\${variant} \${disabled ? 'disabled' : ''}\`}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{text}</span>
      {isHovered && (
        <span className="btn-highlight" />
      )}
    </button>
  );
}`}
        </CodeBlock>
      </section>
      
      <section id="next-steps" className="doc-section">
        <h2>Next Steps</h2>
        
        <p>
          Now that you have JMF Framework installed and a project created, here are some next steps to explore:
        </p>
        
        <ul>
          <li>Learn about the <a href="/documentation/project-structure">project structure</a></li>
          <li>Explore the <a href="/documentation/cli">CLI commands</a> available</li>
          <li>Check out the <a href="/documentation/examples">examples</a> to see what you can build</li>
        </ul>
        
        <p>Here's a quick example of CSS styling in JMF Framework:</p>
        
        <CodeBlock language="css" title="Button Styles">
{`.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  gap: 0.5rem;
  border: none;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background-color: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
}

.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`}
        </CodeBlock>
      </section>
    </div>
  );
};

export default GettingStarted; 
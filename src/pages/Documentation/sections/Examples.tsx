import React from 'react';
import { TableOfContents, CodeBlock } from '../DocumentationPage';
import { useNotification } from '../../../components/NotificationManager';

const Examples = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'basic-examples', title: 'Basic Examples' },
    { id: 'intermediate-examples', title: 'Intermediate Examples' },
    { id: 'advanced-examples', title: 'Advanced Examples' },
    { id: 'running-examples', title: 'Running Examples Locally' }
  ];
  
  const showExampleNotification = () => {
    addNotification('Example command copied to clipboard!', 'success', 3000);
  };
  
  return (
    <div className="documentation-section">
      <h1>Framework Examples</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="introduction" className="doc-section">
        <h2>Introduction</h2>
        <p>
          This section provides practical examples of using JMF Framework to build various types of applications.
          These examples showcase the framework's capabilities and demonstrate best practices.
        </p>
      </section>
      
      <section id="basic-examples" className="doc-section">
        <h2>Basic Examples</h2>
        
        <div className="example-card">
          <h3>Simple Counter App</h3>
          <p>
            A basic counter application demonstrating state management and event handling.
          </p>
          <CodeBlock language="jsx" title="Counter Component">
{`import React, { useState } from 'react';
import { Component, Button } from 'jmf-framework';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="button-group">
        <Button onClick={decrement} variant="secondary">Decrement</Button>
        <Button onClick={reset} variant="outline">Reset</Button>
        <Button onClick={increment} variant="primary">Increment</Button>
      </div>
    </div>
  );
};

export default Counter;`}
          </CodeBlock>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/counter" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/counter" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>Todo List</h3>
          <p>
            A todo list application showcasing CRUD operations and local storage.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/todo-list" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/todo-list" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>Form Validation</h3>
          <p>
            An example demonstrating form handling and validation techniques.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/form-validation" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/form-validation" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
      </section>
      
      <section id="intermediate-examples" className="doc-section">
        <h2>Intermediate Examples</h2>
        
        <div className="example-card">
          <h3>Blog Application</h3>
          <p>
            A multi-page blog application with routing and API integration.
          </p>
          <CodeBlock language="javascript" title="Router Configuration">
{`import { Router, Route } from 'jmf-router';
import { BlogList, BlogPost, CreatePost, EditPost } from './pages';
import { PrivateRoute } from './components';

const AppRouter = () => (
  <Router>
    <Route path="/" exact component={BlogList} />
    <Route path="/post/:id" component={BlogPost} />
    <PrivateRoute path="/create" component={CreatePost} />
    <PrivateRoute path="/edit/:id" component={EditPost} />
  </Router>
);

export default AppRouter;`}
          </CodeBlock>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/blog" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/blog" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>E-commerce Store</h3>
          <p>
            A simple e-commerce store with product listings, cart, and checkout.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/e-commerce" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/e-commerce" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>Authentication Flow</h3>
          <p>
            Example implementing user authentication with login, registration, and protected routes.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/auth-flow" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/auth-flow" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
      </section>
      
      <section id="advanced-examples" className="doc-section">
        <h2>Advanced Examples</h2>
        
        <div className="example-card">
          <h3>Full-Stack Application</h3>
          <p>
            A complete full-stack application with backend API, database integration, and user authentication.
          </p>
          <CodeBlock language="typescript" title="Server Setup" showLineNumbers={true}>
{`import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
          </CodeBlock>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/full-stack" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>Real-Time Chat</h3>
          <p>
            Real-time chat application using WebSockets integration.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/real-time-chat" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
            <a href="https://jmf-examples.org/real-time-chat" target="_blank" rel="noopener noreferrer" className="example-link">
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="example-card">
          <h3>Serverless Functions</h3>
          <p>
            Example demonstrating integration with serverless functions for API endpoints.
          </p>
          <div className="example-links">
            <a href="https://github.com/jmf-framework/examples/tree/main/serverless" target="_blank" rel="noopener noreferrer" className="example-link">
              View Code
            </a>
          </div>
        </div>
      </section>
      <section id="running-examples" className="doc-section">
        <h2>Running Examples Locally</h2>
        <p>
          To run any of these examples locally, follow these steps:
        </p>
        
        <CodeBlock language="bash" title="Setup Commands" showLineNumbers={true}>
{`# Clone the examples repository
git clone https://github.com/jmf-framework/examples.git

# Navigate to the specific example directory
cd examples/[example-name]

# Install dependencies
npm install

# Start the development server
npm start`}
        </CodeBlock>
        
        <p>
          For examples with a backend, you might need to follow additional setup instructions provided in the example's README file.
        </p>
        
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            onClick={showExampleNotification} 
            style={{ 
              background: 'var(--primary-color)',
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
            Copy Setup Commands
          </button>
        </div>
      </section>
    </div>
  );
};

export default Examples; 
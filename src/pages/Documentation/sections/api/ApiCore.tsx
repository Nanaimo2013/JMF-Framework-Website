import React from 'react';
import { TableOfContents, CodeBlock } from '../../DocumentationPage';
import { useNotification } from '../../../../components/NotificationManager';

const ApiCore = () => {
  const { addNotification } = useNotification();
  
  // Table of contents items
  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'installation', title: 'Installation' },
    { id: 'core-components', title: 'Core Components' },
    { id: 'lifecycle-methods', title: 'Lifecycle Methods' },
    { id: 'hooks', title: 'Hooks' }
  ];
  
  const showCopyNotification = () => {
    addNotification('Code example copied to clipboard!', 'success', 3000);
  };

  return (
    <div className="documentation-section">
      <h1>Core API Reference</h1>
      
      <TableOfContents items={tocItems} />
      
      <section id="introduction" className="doc-section">
        <h2>Introduction</h2>
        <p>
          The Core API provides the foundation for the JMF Framework. It includes essential 
          utilities, base classes, and core functionality that other parts of the framework 
          build upon.
        </p>
        <p>
          This reference covers the most important aspects of the Core API, including component 
          lifecycle, event handling, and utility functions.
        </p>
      </section>
      
      <section id="installation" className="doc-section">
        <h2>Installation</h2>
        <p>
          The Core API is included in the main JMF Framework package, but you can also use it 
          separately:
        </p>
        
        <CodeBlock language="bash" title="Install Core Package">npm install jmf-core</CodeBlock>
        
        <p>Import individual components from the core package:</p>
        
        <CodeBlock language="javascript" title="Import Core Components">
{`import { Component, createContext, useState } from 'jmf-core';`}
        </CodeBlock>
        
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={showCopyNotification} 
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
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            Copy Import Statement
          </button>
        </div>
      </section>
      
      <section id="core-components" className="doc-section">
        <h2>Core Components</h2>
        
        <h3>Component Class</h3>
        <p>
          The <code>Component</code> class is the foundation for creating UI components in JMF Framework.
        </p>
        
        <CodeBlock language="javascript" title="Class Component Example" showLineNumbers={true}>
{`import { Component } from 'jmf-core';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return {
      type: 'div',
      props: {
        className: 'counter',
        children: [
          {
            type: 'p',
            props: {
              children: \`Count: \${this.state.count}\`
            }
          },
          {
            type: 'button',
            props: {
              onClick: () => this.increment(),
              children: 'Increment'
            }
          }
        ]
      }
    };
  }
}`}
        </CodeBlock>
        
        <h3>Functional Components</h3>
        <p>
          You can also create functional components with hooks:
        </p>
        
        <CodeBlock language="javascript" title="Functional Component Example" showLineNumbers={true}>
{`import { useState } from 'jmf-core';

function Counter(props) {
  const [count, setCount] = useState(0);
  
  return {
    type: 'div',
    props: {
      className: 'counter',
      children: [
        {
          type: 'p',
          props: {
            children: \`Count: \${count}\`
          }
        },
        {
          type: 'button',
          props: {
            onClick: () => setCount(count + 1),
            children: 'Increment'
          }
        }
      ]
    }
  };
}`}
        </CodeBlock>
      </section>
      
      <section id="lifecycle-methods" className="doc-section">
        <h2>Lifecycle Methods</h2>
        <p>
          The <code>Component</code> class provides several lifecycle methods:
        </p>
        
        <div className="config-option">
          <h4>constructor(props)</h4>
          <p><strong>Description:</strong> Initializes the component with props and sets up initial state.</p>
        </div>
        
        <div className="config-option">
          <h4>componentDidMount()</h4>
          <p><strong>Description:</strong> Called after the component has been inserted into the DOM.</p>
        </div>
        
        <div className="config-option">
          <h4>componentDidUpdate(prevProps, prevState)</h4>
          <p><strong>Description:</strong> Called after the component has been updated with new props or state.</p>
        </div>
        
        <div className="config-option">
          <h4>componentWillUnmount()</h4>
          <p><strong>Description:</strong> Called just before the component is removed from the DOM.</p>
        </div>
        
        <div className="config-option">
          <h4>shouldComponentUpdate(nextProps, nextState)</h4>
          <p><strong>Description:</strong> Determines if the component should update. Return false to prevent rendering.</p>
        </div>
        
        <div className="config-option">
          <h4>render()</h4>
          <p><strong>Description:</strong> Returns the virtual representation of the component.</p>
        </div>
      </section>
      
      <section id="hooks" className="doc-section">
        <h2>Hooks</h2>
        <p>
          JMF Framework provides several hooks for functional components:
        </p>
        
        <div className="config-option">
          <h4>useState(initialState)</h4>
          <p><strong>Description:</strong> Creates a state variable with a setter function.</p>
          
          <CodeBlock language="javascript" title="useState Example">
{`const [count, setCount] = useState(0);`}
          </CodeBlock>
        </div>
        
        <div className="config-option">
          <h4>useEffect(effect, dependencies)</h4>
          <p><strong>Description:</strong> Runs side effects after rendering, with optional dependency array.</p>
          
          <CodeBlock language="javascript" title="useEffect Example">
{`useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`}
          </CodeBlock>
        </div>
        
        <div className="config-option">
          <h4>useContext(Context)</h4>
          <p><strong>Description:</strong> Accesses a context value created with createContext.</p>
          
          <CodeBlock language="javascript" title="useContext Example">
{`const theme = useContext(ThemeContext);`}
          </CodeBlock>
        </div>
        
        <div className="config-option">
          <h4>useReducer(reducer, initialState)</h4>
          <p><strong>Description:</strong> More complex state management with actions and reducers.</p>
          
          <CodeBlock language="javascript" title="useReducer Example">
{`const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
}`}
          </CodeBlock>
        </div>
      </section>
    </div>
  );
};

export default ApiCore; 
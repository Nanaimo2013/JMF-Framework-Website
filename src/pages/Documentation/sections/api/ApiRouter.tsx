import React from 'react';

const ApiRouter = () => {
  return (
    <div className="documentation-section">
      <h1>Router API Reference</h1>
      
      <section className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF Router API provides tools for managing navigation and routing in your applications.
          It supports both client-side routing for single-page applications and server-side routing
          for universal applications.
        </p>
      </section>
      
      <section className="doc-section">
        <h2>Installation</h2>
        <p>
          The Router API is included in the main JMF Framework package, but you can also use it 
          separately:
        </p>
        
        <div className="code-block">
          <pre><code>npm install jmf-router</code></pre>
        </div>
        
        <p>Import components from the router package:</p>
        
        <div className="code-block">
          <pre><code>{`import { Router, Route, Link, useParams } from 'jmf-router';`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Core Components</h2>
        
        <h3>Router</h3>
        <p>
          The main container for your application's routing configuration.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Router } from 'jmf-router';

function App() {
  return {
    type: Router,
    props: {
      // Use 'history' for browser history mode
      // Use 'hash' for hash-based routing
      mode: 'history',
      children: [
        // Your routes go here
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>Route</h3>
        <p>
          Defines a route with a path pattern and associated component.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Router, Route } from 'jmf-router';
import { Home, About, User } from './pages';

function App() {
  return {
    type: Router,
    props: {
      mode: 'history',
      children: [
        {
          type: Route,
          props: {
            path: '/',
            component: Home,
            exact: true
          }
        },
        {
          type: Route,
          props: {
            path: '/about',
            component: About
          }
        },
        {
          type: Route,
          props: {
            path: '/users/:userId',
            component: User
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>Link</h3>
        <p>
          Navigation component that renders as an anchor tag but handles client-side navigation.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Link } from 'jmf-router';

function Navigation() {
  return {
    type: 'nav',
    props: {
      children: [
        {
          type: Link,
          props: {
            to: '/',
            className: 'nav-link',
            children: 'Home'
          }
        },
        {
          type: Link,
          props: {
            to: '/about',
            className: 'nav-link',
            children: 'About'
          }
        },
        {
          type: Link,
          props: {
            to: '/users/123',
            className: 'nav-link',
            children: 'User Profile'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>NavLink</h3>
        <p>
          Extended version of Link that can apply an active class when the route matches.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { NavLink } from 'jmf-router';

function Navigation() {
  return {
    type: 'nav',
    props: {
      children: [
        {
          type: NavLink,
          props: {
            to: '/',
            activeClassName: 'active',
            exact: true,
            children: 'Home'
          }
        },
        {
          type: NavLink,
          props: {
            to: '/about',
            activeClassName: 'active',
            children: 'About'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Route Configuration</h2>
        
        <div className="config-option">
          <h4>path</h4>
          <p><strong>Type:</strong> String</p>
          <p>The URL pattern to match. Can include parameters like <code>:userId</code>.</p>
        </div>
        
        <div className="config-option">
          <h4>component</h4>
          <p><strong>Type:</strong> Component</p>
          <p>The component to render when the route matches.</p>
        </div>
        
        <div className="config-option">
          <h4>exact</h4>
          <p><strong>Type:</strong> Boolean</p>
          <p><strong>Default:</strong> false</p>
          <p>If true, the route will only match if the path exactly matches the current URL.</p>
        </div>
        
        <div className="config-option">
          <h4>sensitive</h4>
          <p><strong>Type:</strong> Boolean</p>
          <p><strong>Default:</strong> false</p>
          <p>If true, the route matching will be case sensitive.</p>
        </div>
        
        <div className="config-option">
          <h4>strict</h4>
          <p><strong>Type:</strong> Boolean</p>
          <p><strong>Default:</strong> false</p>
          <p>If true, the path must match with a trailing slash if it includes one.</p>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Hooks</h2>
        <p>
          The Router API provides several hooks for accessing and manipulating routing information:
        </p>
        
        <div className="config-option">
          <h4>useParams()</h4>
          <p>Returns an object with the current route parameters.</p>
          
          <div className="code-block">
            <pre><code>{`import { useParams } from 'jmf-router';

function UserProfile() {
  // For a route like '/users/:userId'
  const { userId } = useParams();
  
  return {
    type: 'div',
    props: {
      children: \`User ID: \${userId}\`
    }
  };
}
`}</code></pre>
          </div>
        </div>
        
        <div className="config-option">
          <h4>useLocation()</h4>
          <p>Returns the current location object containing path, search, and hash.</p>
          
          <div className="code-block">
            <pre><code>{`import { useLocation } from 'jmf-router';

function LocationInfo() {
  const location = useLocation();
  
  return {
    type: 'div',
    props: {
      children: [
        \`Path: \${location.pathname}\`,
        \`Query: \${location.search}\`,
        \`Hash: \${location.hash}\`
      ]
    }
  };
}
`}</code></pre>
          </div>
        </div>
        
        <div className="config-option">
          <h4>useHistory()</h4>
          <p>Returns a history object with methods for navigating programmatically.</p>
          
          <div className="code-block">
            <pre><code>{`import { useHistory } from 'jmf-router';

function NavigationButtons() {
  const history = useHistory();
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'button',
          props: {
            onClick: () => history.push('/dashboard'),
            children: 'Go to Dashboard'
          }
        },
        {
          type: 'button',
          props: {
            onClick: () => history.goBack(),
            children: 'Go Back'
          }
        }
      ]
    }
  };
}
`}</code></pre>
          </div>
        </div>
        
        <div className="config-option">
          <h4>useRouteMatch(path)</h4>
          <p>Returns match data for a given path pattern, or the current path if none is provided.</p>
          
          <div className="code-block">
            <pre><code>{`import { useRouteMatch } from 'jmf-router';

function AdminCheck() {
  const match = useRouteMatch('/admin');
  
  return {
    type: 'div',
    props: {
      children: match ? 'You are on an admin page' : 'Not an admin page'
    }
  };
}
`}</code></pre>
          </div>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Nested Routes</h2>
        <p>
          You can create nested routes by rendering Route components inside another Route's component:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Router, Route, Switch, useRouteMatch, Link } from 'jmf-router';

function App() {
  return {
    type: Router,
    props: {
      children: {
        type: Route,
        props: {
          path: '/users',
          component: Users
        }
      }
    }
  };
}

function Users() {
  const match = useRouteMatch();
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'h2',
          props: {
            children: 'Users'
          }
        },
        {
          type: 'nav',
          props: {
            children: [
              {
                type: Link,
                props: {
                  to: \`\${match.url}/profile\`,
                  children: 'Profile'
                }
              },
              {
                type: Link,
                props: {
                  to: \`\${match.url}/settings\`,
                  children: 'Settings'
                }
              }
            ]
          }
        },
        {
          type: Switch,
          props: {
            children: [
              {
                type: Route,
                props: {
                  path: \`\${match.path}/profile\`,
                  component: UserProfile
                }
              },
              {
                type: Route,
                props: {
                  path: \`\${match.path}/settings\`,
                  component: UserSettings
                }
              }
            ]
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Redirect and Switch</h2>
        <p>
          The Router API includes components for redirects and conditional routing:
        </p>
        
        <div className="config-option">
          <h4>Redirect</h4>
          <p>Redirects to another route.</p>
          
          <div className="code-block">
            <pre><code>{`import { Redirect } from 'jmf-router';

// Redirect to /login if not authenticated
const isAuthenticated = checkAuthStatus();

return isAuthenticated ? {
  type: Dashboard,
  props: {}
} : {
  type: Redirect,
  props: {
    to: '/login'
  }
};
`}</code></pre>
          </div>
        </div>
        
        <div className="config-option">
          <h4>Switch</h4>
          <p>Renders the first matching Route from its children.</p>
          
          <div className="code-block">
            <pre><code>{`import { Router, Switch, Route, Redirect } from 'jmf-router';

function App() {
  return {
    type: Router,
    props: {
      children: {
        type: Switch,
        props: {
          children: [
            {
              type: Route,
              props: {
                path: '/',
                exact: true,
                component: Home
              }
            },
            {
              type: Route,
              props: {
                path: '/users',
                component: Users
              }
            },
            {
              type: Redirect,
              props: {
                to: '/'
              }
            }
          ]
        }
      }
    }
  };
}
`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiRouter; 
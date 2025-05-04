import React from 'react';

const ApiUi = () => {
  return (
    <div className="documentation-section">
      <h1>UI Components API Reference</h1>
      
      <section className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF UI API provides a comprehensive set of UI components for building modern web interfaces.
          These components are designed to be accessible, customizable, and composable, making it easy to
          create consistent user experiences.
        </p>
        <p>
          This reference documents the available UI components, their properties, and common usage patterns.
        </p>
      </section>
      
      <section className="doc-section">
        <h2>Installation</h2>
        <p>
          The UI API is included in the main JMF Framework package, but you can also use it 
          separately:
        </p>
        
        <div className="code-block">
          <pre><code>npm install jmf-ui</code></pre>
        </div>
        
        <p>Import components from the UI package:</p>
        
        <div className="code-block">
          <pre><code>{`import { Button, Card, Input } from 'jmf-ui';`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Core Components</h2>
        
        <h3>Button</h3>
        <p>
          A customizable button component with various styles and states.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Button } from 'jmf-ui';

function ExampleButtons() {
  return {
    type: 'div',
    props: {
      children: [
        {
          type: Button,
          props: {
            variant: 'primary',
            children: 'Primary Button'
          }
        },
        {
          type: Button,
          props: {
            variant: 'secondary',
            children: 'Secondary Button'
          }
        },
        {
          type: Button,
          props: {
            variant: 'outline',
            children: 'Outline Button'
          }
        },
        {
          type: Button,
          props: {
            variant: 'danger',
            children: 'Danger Button'
          }
        },
        {
          type: Button,
          props: {
            variant: 'primary',
            disabled: true,
            children: 'Disabled Button'
          }
        },
        {
          type: Button,
          props: {
            variant: 'primary',
            loading: true,
            children: 'Loading Button'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <div className="config-option">
          <h4>Button Props</h4>
          <ul>
            <li><code>variant</code>: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'</li>
            <li><code>size</code>: 'sm' | 'md' | 'lg'</li>
            <li><code>disabled</code>: boolean</li>
            <li><code>loading</code>: boolean</li>
            <li><code>icon</code>: ReactNode</li>
            <li><code>iconPosition</code>: 'left' | 'right'</li>
            <li><code>fullWidth</code>: boolean</li>
            <li><code>onClick</code>: function</li>
            <li><code>type</code>: 'button' | 'submit' | 'reset'</li>
          </ul>
        </div>
        
        <h3>Input</h3>
        <p>
          A text input component with various states and validation support.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Input } from 'jmf-ui';

function ExampleInputs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: Input,
          props: {
            label: 'Name',
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: 'Enter your name'
          }
        },
        {
          type: Input,
          props: {
            label: 'Email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: 'Enter your email',
            type: 'email',
            error: email && !isValidEmail(email) ? 'Please enter a valid email' : null
          }
        },
        {
          type: Input,
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password'
          }
        },
        {
          type: Input,
          props: {
            label: 'Disabled Input',
            value: 'This input is disabled',
            disabled: true
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <div className="config-option">
          <h4>Input Props</h4>
          <ul>
            <li><code>label</code>: string</li>
            <li><code>value</code>: string</li>
            <li><code>onChange</code>: function</li>
            <li><code>placeholder</code>: string</li>
            <li><code>type</code>: 'text' | 'email' | 'password' | 'number' | etc.</li>
            <li><code>error</code>: string</li>
            <li><code>disabled</code>: boolean</li>
            <li><code>required</code>: boolean</li>
            <li><code>helperText</code>: string</li>
            <li><code>prefix</code>: ReactNode</li>
            <li><code>suffix</code>: ReactNode</li>
          </ul>
        </div>
        
        <h3>Card</h3>
        <p>
          A container component for grouping related content.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Card, Button } from 'jmf-ui';

function ExampleCard() {
  return {
    type: Card,
    props: {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      footer: {
        type: 'div',
        props: {
          children: {
            type: Button,
            props: {
              variant: 'primary',
              children: 'Action Button'
            }
          }
        }
      },
      children: {
        type: 'p',
        props: {
          children: 'This is the main content of the card. You can put any content here.'
        }
      }
    }
  };
}
`}</code></pre>
        </div>
        
        <div className="config-option">
          <h4>Card Props</h4>
          <ul>
            <li><code>title</code>: string | ReactNode</li>
            <li><code>subtitle</code>: string | ReactNode</li>
            <li><code>footer</code>: ReactNode</li>
            <li><code>elevation</code>: 0 | 1 | 2 | 3</li>
            <li><code>padding</code>: 'none' | 'sm' | 'md' | 'lg'</li>
            <li><code>border</code>: boolean</li>
            <li><code>onClick</code>: function</li>
          </ul>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Navigation Components</h2>
        
        <h3>Tabs</h3>
        <p>
          A component for organizing content in tabbed interfaces.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Tabs, Tab } from 'jmf-ui';

function ExampleTabs() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return {
    type: Tabs,
    props: {
      activeTab: activeTab,
      onChange: setActiveTab,
      children: [
        {
          type: Tab,
          props: {
            id: 'profile',
            label: 'Profile',
            children: {
              type: 'div',
              props: {
                children: 'Profile content goes here'
              }
            }
          }
        },
        {
          type: Tab,
          props: {
            id: 'settings',
            label: 'Settings',
            children: {
              type: 'div',
              props: {
                children: 'Settings content goes here'
              }
            }
          }
        },
        {
          type: Tab,
          props: {
            id: 'notifications',
            label: 'Notifications',
            children: {
              type: 'div',
              props: {
                children: 'Notifications content goes here'
              }
            }
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>Dropdown</h3>
        <p>
          A dropdown menu component for displaying a list of options.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Dropdown, DropdownItem } from 'jmf-ui';

function ExampleDropdown() {
  return {
    type: Dropdown,
    props: {
      trigger: {
        type: Button,
        props: {
          children: 'Actions'
        }
      },
      children: [
        {
          type: DropdownItem,
          props: {
            children: 'Edit',
            onClick: () => console.log('Edit clicked')
          }
        },
        {
          type: DropdownItem,
          props: {
            children: 'Delete',
            onClick: () => console.log('Delete clicked'),
            variant: 'danger'
          }
        },
        {
          type: DropdownItem,
          props: {
            children: 'View Details',
            onClick: () => console.log('View Details clicked')
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
        <h2>Feedback Components</h2>
        
        <h3>Alert</h3>
        <p>
          A component for displaying feedback messages.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Alert } from 'jmf-ui';

function ExampleAlerts() {
  return {
    type: 'div',
    props: {
      children: [
        {
          type: Alert,
          props: {
            variant: 'info',
            title: 'Information',
            children: 'This is an information message.'
          }
        },
        {
          type: Alert,
          props: {
            variant: 'success',
            title: 'Success',
            children: 'Operation completed successfully.'
          }
        },
        {
          type: Alert,
          props: {
            variant: 'warning',
            title: 'Warning',
            children: 'This action cannot be undone.'
          }
        },
        {
          type: Alert,
          props: {
            variant: 'error',
            title: 'Error',
            children: 'An error occurred. Please try again.'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>Modal</h3>
        <p>
          A dialog component for displaying content that requires user attention.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Modal, Button } from 'jmf-ui';

function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: Button,
          props: {
            children: 'Open Modal',
            onClick: () => setIsOpen(true)
          }
        },
        {
          type: Modal,
          props: {
            isOpen: isOpen,
            onClose: () => setIsOpen(false),
            title: 'Modal Title',
            actions: [
              {
                type: Button,
                props: {
                  children: 'Cancel',
                  variant: 'outline',
                  onClick: () => setIsOpen(false)
                }
              },
              {
                type: Button,
                props: {
                  children: 'Confirm',
                  variant: 'primary',
                  onClick: () => {
                    console.log('Confirmed');
                    setIsOpen(false);
                  }
                }
              }
            ],
            children: {
              type: 'p',
              props: {
                children: 'This is the modal content. You can put any content here.'
              }
            }
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
        <h2>Form Components</h2>
        
        <h3>Form</h3>
        <p>
          A component for building and managing forms with validation.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Form, Input, Button } from 'jmf-ui';

function ExampleForm() {
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };
  
  const validationSchema = {
    name: (value) => !value ? 'Name is required' : null,
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/^\\S+@\\S+\\.\\S+$/.test(value)) return 'Invalid email format';
      return null;
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      return null;
    }
  };
  
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };
  
  return {
    type: Form,
    props: {
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: handleSubmit,
      children: ({ values, errors, touched, handleChange, handleBlur }) => ({
        type: 'div',
        props: {
          children: [
            {
              type: Input,
              props: {
                name: 'name',
                label: 'Name',
                value: values.name,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.name && errors.name
              }
            },
            {
              type: Input,
              props: {
                name: 'email',
                label: 'Email',
                type: 'email',
                value: values.email,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.email && errors.email
              }
            },
            {
              type: Input,
              props: {
                name: 'password',
                label: 'Password',
                type: 'password',
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.password && errors.password
              }
            },
            {
              type: Button,
              props: {
                type: 'submit',
                variant: 'primary',
                children: 'Submit'
              }
            }
          ]
        }
      })
    }
  };
}
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Theming</h2>
        <p>
          JMF UI components support theming and customization:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { ThemeProvider, createTheme } from 'jmf-ui';

// Create a custom theme
const theme = createTheme({
  colors: {
    primary: '#4a6cf7',
    secondary: '#1f2937',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: {
      main: '#ffffff',
      light: '#f9fafb',
      dark: '#111827'
    },
    text: {
      primary: '#333333',
      secondary: '#6b7280',
      light: '#f8f9fa'
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  }
});

// Apply the theme to your application
function App() {
  return {
    type: ThemeProvider,
    props: {
      theme: theme,
      children: {
        type: AppContent,
        props: {}
      }
    }
  };
}
`}</code></pre>
        </div>
      </section>
    </div>
  );
};

export default ApiUi; 
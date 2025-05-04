import React from 'react';

const ApiState = () => {
  return (
    <div className="documentation-section">
      <h1>State Management API Reference</h1>
      
      <section className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF State Management API provides tools for managing application state effectively.
          It offers a flexible approach that scales from simple component state to complex application-wide
          state management patterns.
        </p>
        <p>
          This reference documents the state management patterns, stores, and utilities that help you
          maintain predictable state in your applications.
        </p>
      </section>
      
      <section className="doc-section">
        <h2>Installation</h2>
        <p>
          The State Management API is included in the main JMF Framework package, but you can also use it 
          separately:
        </p>
        
        <div className="code-block">
          <pre><code>npm install jmf-state</code></pre>
        </div>
        
        <p>Import components and utilities from the state package:</p>
        
        <div className="code-block">
          <pre><code>{`import { createStore, connect, useStore } from 'jmf-state';`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Core Concepts</h2>
        
        <h3>Stores</h3>
        <p>
          A store is a container for state that can be accessed throughout your application.
          JMF Framework supports multiple stores for different parts of your application logic.
        </p>
        
        <h3>Actions</h3>
        <p>
          Actions are functions that trigger state changes. They can be synchronous or asynchronous.
        </p>
        
        <h3>Reducers</h3>
        <p>
          Reducers are pure functions that specify how the state changes in response to actions.
        </p>
        
        <h3>Selectors</h3>
        <p>
          Selectors are functions that extract specific parts of the state.
        </p>
      </section>
      
      <section className="doc-section">
        <h2>Creating Stores</h2>
        <p>
          You can create a store using the <code>createStore</code> function:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createStore } from 'jmf-state';

// Define initial state
const initialState = {
  counter: 0,
  user: null,
  isLoading: false
};

// Define reducer
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      };
      
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      };
      
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
      
    default:
      return state;
  }
}

// Create store
const store = createStore(reducer, initialState);

export default store;
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Using Stores with Components</h2>
        
        <h3>Class Components</h3>
        <p>
          You can connect class components to the store using the <code>connect</code> function:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { Component } from 'jmf-core';
import { connect } from 'jmf-state';
import store from './store';

class Counter extends Component {
  increment() {
    this.props.dispatch({ type: 'INCREMENT' });
  }
  
  decrement() {
    this.props.dispatch({ type: 'DECREMENT' });
  }
  
  render() {
    return {
      type: 'div',
      props: {
        children: [
          {
            type: 'p',
            props: {
              children: \`Count: \${this.props.counter}\`
            }
          },
          {
            type: 'button',
            props: {
              onClick: () => this.increment(),
              children: 'Increment'
            }
          },
          {
            type: 'button',
            props: {
              onClick: () => this.decrement(),
              children: 'Decrement'
            }
          }
        ]
      }
    };
  }
}

// Map state to props
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

// Connect component to store
export default connect(store, mapStateToProps)(Counter);
`}</code></pre>
        </div>
        
        <h3>Functional Components</h3>
        <p>
          For functional components, you can use the <code>useStore</code> hook:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useStore } from 'jmf-state';
import store from './store';

function Counter() {
  const { state, dispatch } = useStore(store);
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'p',
          props: {
            children: \`Count: \${state.counter}\`
          }
        },
        {
          type: 'button',
          props: {
            onClick: () => dispatch({ type: 'INCREMENT' }),
            children: 'Increment'
          }
        },
        {
          type: 'button',
          props: {
            onClick: () => dispatch({ type: 'DECREMENT' }),
            children: 'Decrement'
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
        <h2>Selectors</h2>
        <p>
          Selectors help you extract specific parts of the state and can compute derived data:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createSelector } from 'jmf-state';

// Simple selector
const getCounter = state => state.counter;
const getUser = state => state.user;

// Computed selector
const getUserName = createSelector(
  getUser,
  user => user ? user.name : 'Guest'
);

// Using selectors with useStore
function UserGreeting() {
  const { state } = useStore(store);
  const userName = getUserName(state);
  
  return {
    type: 'h1',
    props: {
      children: \`Hello, \${userName}!\`
    }
  };
}
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Async Actions</h2>
        <p>
          JMF State supports asynchronous actions through a middleware pattern:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createStore, applyMiddleware } from 'jmf-state';
import thunk from 'jmf-state/middleware/thunk';

// Create store with middleware
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

// Async action creator
function fetchUser(userId) {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const user = await response.json();
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
}

// Using async actions
function UserProfile({ userId }) {
  const { state, dispatch } = useStore(store);
  
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);
  
  if (state.isLoading) {
    return {
      type: 'div',
      props: {
        children: 'Loading...'
      }
    };
  }
  
  if (!state.user) {
    return {
      type: 'div',
      props: {
        children: 'No user found'
      }
    };
  }
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'h1',
          props: {
            children: state.user.name
          }
        },
        {
          type: 'p',
          props: {
            children: state.user.email
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
        <h2>Multiple Stores</h2>
        <p>
          JMF State allows you to create and use multiple stores for different parts of your application:
        </p>
        
        <div className="code-block">
          <pre><code>{`// userStore.js
import { createStore } from 'jmf-state';

const userStore = createStore(userReducer, initialUserState);
export default userStore;

// cartStore.js
import { createStore } from 'jmf-state';

const cartStore = createStore(cartReducer, initialCartState);
export default cartStore;

// Using multiple stores in a component
function ShoppingCart() {
  const { state: userState } = useStore(userStore);
  const { state: cartState, dispatch: cartDispatch } = useStore(cartStore);
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'h1',
          props: {
            children: \`\${userState.name}'s Cart\`
          }
        },
        {
          type: 'p',
          props: {
            children: \`Items: \${cartState.items.length}\`
          }
        },
        // ...
      ]
    }
  };
}
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Store Persistence</h2>
        <p>
          You can persist store state to various storage backends:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createStore, applyMiddleware } from 'jmf-state';
import { persistMiddleware, loadPersistedState } from 'jmf-state/middleware/persist';

// Load persisted state from localStorage
const persistedState = loadPersistedState('app-state', localStorage);

// Create store with persisted state
const store = createStore(
  reducer,
  { ...initialState, ...persistedState },
  applyMiddleware(
    persistMiddleware({
      key: 'app-state',
      storage: localStorage,
      whitelist: ['user', 'preferences'] // Only persist these keys
    })
  )
);
`}</code></pre>
        </div>
      </section>
    </div>
  );
};

export default ApiState; 
import React from 'react';

const ApiData = () => {
  return (
    <div className="documentation-section">
      <h1>Data Handling API Reference</h1>
      
      <section className="doc-section">
        <h2>Introduction</h2>
        <p>
          The JMF Data API provides utilities and abstractions for fetching, caching, and managing data
          in your applications. It offers a consistent approach to handling data from various sources,
          including REST APIs, GraphQL endpoints, and local storage.
        </p>
        <p>
          This reference documents the data fetching patterns, caching strategies, and persistence
          mechanisms available in the JMF Framework.
        </p>
      </section>
      
      <section className="doc-section">
        <h2>Installation</h2>
        <p>
          The Data API is included in the main JMF Framework package, but you can also use it 
          separately:
        </p>
        
        <div className="code-block">
          <pre><code>npm install jmf-data</code></pre>
        </div>
        
        <p>Import utilities from the data package:</p>
        
        <div className="code-block">
          <pre><code>{`import { useQuery, useMutation, createClient } from 'jmf-data';`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Data Client</h2>
        <p>
          The data client is the central piece of the JMF Data API. It provides a unified interface
          for making requests and managing caches.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createClient } from 'jmf-data';

// Create a data client with configuration
const client = createClient({
  baseUrl: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes in milliseconds
  }
});

// Export the client for use in your application
export default client;
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Data Fetching Hooks</h2>
        
        <h3>useQuery</h3>
        <p>
          A hook for fetching data from an API endpoint. It manages loading and error states,
          caching, and provides refetching capabilities.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useQuery } from 'jmf-data';
import client from './client';

function UserProfile({ userId }) {
  const { data, loading, error, refetch } = useQuery(
    client,
    \`users/\${userId}\`,
    {
      // Optional configuration
      variables: { userId },
      onSuccess: (data) => console.log('Data fetched:', data),
      onError: (error) => console.error('Error fetching data:', error),
      cacheTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3, // Number of retries on failure
      retryDelay: 1000 // Delay between retries in milliseconds
    }
  );
  
  if (loading) {
    return {
      type: 'div',
      props: {
        children: 'Loading user profile...'
      }
    };
  }
  
  if (error) {
    return {
      type: 'div',
      props: {
        className: 'error',
        children: \`Error: \${error.message}\`
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
            children: data.name
          }
        },
        {
          type: 'p',
          props: {
            children: data.email
          }
        },
        {
          type: 'button',
          props: {
            onClick: refetch,
            children: 'Refetch Data'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>useMutation</h3>
        <p>
          A hook for making data mutations (POST, PUT, DELETE, etc.) to an API endpoint.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useMutation } from 'jmf-data';
import client from './client';

function CreateUser() {
  const { mutate, loading, error, data } = useMutation(
    client,
    'users',
    {
      method: 'POST',
      onSuccess: (data) => console.log('User created:', data),
      onError: (error) => console.error('Error creating user:', error),
      invalidateQueries: ['users'] // Invalidate cached queries after mutation
    }
  );
  
  const handleSubmit = (formData) => {
    mutate({
      name: formData.name,
      email: formData.email,
      role: formData.role
    });
  };
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'form',
          props: {
            onSubmit: (e) => {
              e.preventDefault();
              const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                role: e.target.role.value
              };
              handleSubmit(formData);
            },
            children: [
              // Form fields
              {
                type: 'button',
                props: {
                  type: 'submit',
                  disabled: loading,
                  children: loading ? 'Creating User...' : 'Create User'
                }
              }
            ]
          }
        },
        error && {
          type: 'div',
          props: {
            className: 'error',
            children: \`Error: \${error.message}\`
          }
        },
        data && {
          type: 'div',
          props: {
            className: 'success',
            children: 'User created successfully!'
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
        
        <h3>useInfiniteQuery</h3>
        <p>
          A hook for fetching paginated data or implementing infinite scrolling.
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useInfiniteQuery } from 'jmf-data';
import client from './client';

function UserList() {
  const {
    data,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    client,
    'users',
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      variables: { limit: 10 }
    }
  );
  
  if (loading && !data) {
    return {
      type: 'div',
      props: {
        children: 'Loading users...'
      }
    };
  }
  
  if (error) {
    return {
      type: 'div',
      props: {
        className: 'error',
        children: \`Error: \${error.message}\`
      }
    };
  }
  
  return {
    type: 'div',
    props: {
      children: [
        // Render list of users from all pages
        ...data.pages.flatMap(page => page.users.map(user => ({
          type: 'div',
          key: user.id,
          props: {
            children: user.name
          }
        }))),
        // Load more button
        hasNextPage && {
          type: 'button',
          props: {
            onClick: fetchNextPage,
            disabled: isFetchingNextPage,
            children: isFetchingNextPage ? 'Loading more...' : 'Load More'
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
        <h2>Cache Management</h2>
        <p>
          The JMF Data API includes powerful cache management features:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createClient } from 'jmf-data';

const client = createClient({
  // ... other options
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // Default time-to-live for cache entries
    maxSize: 1000, // Maximum number of cache entries
    strategy: 'lru', // Least Recently Used eviction strategy
    storage: 'memory' // 'memory' or 'localStorage'
  }
});

// Manual cache operations
client.cache.get('users/123');
client.cache.set('users/123', { id: '123', name: 'John Doe' });
client.cache.invalidate('users/123');
client.cache.invalidateQueries(['users']);
client.cache.clear();
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Local Storage</h2>
        <p>
          The JMF Data API provides utilities for working with local storage:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { storage } from 'jmf-data';

// Store data
storage.set('user', { id: '123', name: 'John Doe' });

// Retrieve data
const user = storage.get('user');

// Remove data
storage.remove('user');

// Clear all data
storage.clear();

// Namespaced storage
const userStorage = storage.namespace('user');
userStorage.set('preferences', { theme: 'dark' });
`}</code></pre>
        </div>
      </section>
      
      <section className="doc-section">
        <h2>Advanced Use Cases</h2>
        
        <h3>Request Interceptors</h3>
        <p>
          You can add interceptors to modify requests before they are sent:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { createClient } from 'jmf-data';

const client = createClient({
  baseUrl: 'https://api.example.com',
  interceptors: {
    request: [
      // Add authorization header to all requests
      (request) => {
        const token = getAuthToken();
        if (token) {
          request.headers = {
            ...request.headers,
            Authorization: \`Bearer \${token}\`
          };
        }
        return request;
      },
      // Add timestamp to all POST requests
      (request) => {
        if (request.method === 'POST') {
          request.data = {
            ...request.data,
            timestamp: new Date().toISOString()
          };
        }
        return request;
      }
    ],
    response: [
      // Handle specific error codes
      (response) => {
        if (response.status === 401) {
          // Redirect to login page or refresh token
          redirectToLogin();
        }
        return response;
      },
      // Transform response data
      (response) => {
        if (response.status === 200 && response.data) {
          // Convert dates to Date objects
          response.data = transformDates(response.data);
        }
        return response;
      }
    ]
  }
});
`}</code></pre>
        </div>
        
        <h3>Optimistic Updates</h3>
        <p>
          You can implement optimistic updates to provide a more responsive user experience:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useMutation, useQuery } from 'jmf-data';
import client from './client';

function TodoList() {
  const { data: todos, loading, error } = useQuery(client, 'todos');
  
  const { mutate: toggleTodo } = useMutation(
    client,
    'todos/toggle',
    {
      method: 'POST',
      // Optimistically update the UI before the server responds
      optimisticUpdate: (variables, queryClient) => {
        const todoId = variables.id;
        
        // Get the current cache
        const currentTodos = queryClient.getQueryData('todos');
        
        // Update the cache with the optimistic result
        queryClient.setQueryData('todos', currentTodos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }));
        
        // Return a rollback function in case of error
        return () => {
          queryClient.setQueryData('todos', currentTodos);
        };
      }
    }
  );
  
  // Render the todos list
  // ...
}
`}</code></pre>
        </div>
        
        <h3>File Uploads</h3>
        <p>
          The Data API also supports file uploads:
        </p>
        
        <div className="code-block">
          <pre><code>{`import { useMutation } from 'jmf-data';
import client from './client';

function FileUpload() {
  const { mutate: uploadFile, loading, progress } = useMutation(
    client,
    'files/upload',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onProgress: (progressEvent) => {
        // progressEvent contains information about upload progress
        console.log('Upload progress:', progressEvent.loaded / progressEvent.total);
      }
    }
  );
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      uploadFile(formData);
    }
  };
  
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'input',
          props: {
            type: 'file',
            onChange: handleFileChange,
            disabled: loading
          }
        },
        loading && {
          type: 'div',
          props: {
            className: 'progress',
            children: \`Uploading: \${Math.round(progress * 100)}%\`
          }
        }
      ]
    }
  };
}
`}</code></pre>
        </div>
      </section>
    </div>
  );
};

export default ApiData; 
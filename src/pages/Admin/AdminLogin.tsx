import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/AdminLogin.css';
import { APP_CONFIG } from '../../config/env';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      addNotification('Please enter both username and password', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await adminLogin(username, password);
      
      if (success) {
        addNotification('Login successful. Welcome to the admin panel!', 'success');
        navigate('/admin/dashboard');
      } else {
        addNotification('Invalid username or password', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      addNotification('An error occurred during login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>{APP_CONFIG.APP_NAME} Admin</h1>
          <p>Sign in to access the administration panel</p>
        </div>
        
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="admin-login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>
            <a href="/" className="back-link">← Back to Website</a>
          </p>
          <p className="admin-help-text">
            If you've forgotten your admin credentials or need assistance,
            please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 
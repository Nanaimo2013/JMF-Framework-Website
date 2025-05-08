import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_DURATION } from '../config/env';

// Define Auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      // Check for admin auth
      const adminAuthExpiry = localStorage.getItem('adminAuthExpiry');
      if (adminAuthExpiry && Number(adminAuthExpiry) > Date.now()) {
        setIsAdmin(true);
        setIsAuthenticated(true);
      } else if (adminAuthExpiry) {
        // Clear expired admin auth
        localStorage.removeItem('adminAuthExpiry');
      }

      // Check for regular user auth
      const token = localStorage.getItem('auth_token');
      if (token) {
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Regular user login (API-based)
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would call an API here
      // For demo, just simulate successful login
      localStorage.setItem('auth_token', 'demo_token');
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Admin login (local username and password check)
  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Check if username and password match the admin credentials from env vars
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const expiryTime = Date.now() + ADMIN_SESSION_DURATION;
      localStorage.setItem('adminAuthExpiry', expiryTime.toString());
      setIsAdmin(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('adminAuthExpiry');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    adminLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Higher-order component for protecting admin routes
export const withAdmin = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAdmin, isLoading } = useAuth();
    const location = useLocation();
    
    if (isLoading) {
      // You can return a loading indicator here
      return <div>Loading...</div>;
    }

    if (!isAdmin) {
      // Redirect to admin login
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  };
};

export default AuthContext; 
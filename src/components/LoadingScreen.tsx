import React, { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    if (!isLoading) {
      // Delay hiding to allow exit animation to play
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isLoading]);
  
  if (!show) return null;
  
  return (
    <div className={`loading-screen ${!isLoading ? 'loading-screen-exit' : ''}`}>
      <div className="loading-container">
        <div className="loading-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
            <line x1="12" y1="22" x2="12" y2="15.5"></line>
            <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
          </svg>
        </div>
        <div className="loading-text">
          <h2>JMF Framework</h2>
          <p>Loading amazing things...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring spinner-ring-2"></div>
          <div className="spinner-ring spinner-ring-3"></div>
          <div className="spinner-dot"></div>
        </div>
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
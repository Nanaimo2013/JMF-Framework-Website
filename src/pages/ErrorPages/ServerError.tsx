import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ErrorPages.css';

const ServerError = () => {
  useEffect(() => {
    // Create gear animation effect
    const createGears = () => {
      const container = document.querySelector('.error-gears') as HTMLElement;
      if (!container) return;
      
      // Clear existing gears
      container.innerHTML = '';
      
      // Create multiple gears
      for (let i = 0; i < 5; i++) {
        const gear = document.createElement('div');
        gear.classList.add('gear');
        
        // Random position
        gear.style.top = `${Math.random() * 80 + 10}%`;
        gear.style.left = `${Math.random() * 80 + 10}%`;
        
        // Random size
        const size = Math.floor(Math.random() * 60) + 30;
        gear.style.width = `${size}px`;
        gear.style.height = `${size}px`;
        
        // Random animation speed
        const duration = Math.random() * 10 + 10;
        gear.style.animationDuration = `${duration}s`;
        
        // Random direction
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        gear.style.animationDirection = direction;
        
        // Random color
        const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)'];
        const colorIndex = Math.floor(Math.random() * colors.length);
        gear.style.borderColor = colors[colorIndex];
        
        // Create gear teeth
        const teethCount = Math.floor(size / 10);
        for (let j = 0; j < teethCount; j++) {
          const tooth = document.createElement('div');
          tooth.classList.add('gear-tooth');
          gear.appendChild(tooth);
        }
        
        container.appendChild(gear);
      }
    };
    
    createGears();
    
    return () => {
      // Clean up if needed
    };
  }, []);
  
  return (
    <div className="error-page server-error">
      <div className="error-gears"></div>
      <div className="error-content">
        <div className="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h1 className="error-code">500</h1>
        <h2 className="error-title">Server Error</h2>
        <p className="error-message">
          Oops! Something went wrong on our servers. We're working to fix the issue as soon as possible.
        </p>
        <div className="error-actions">
          <Link to="/" className="error-btn primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>
          <button onClick={() => window.location.reload()} className="error-btn secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
              <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
            </svg>
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError; 
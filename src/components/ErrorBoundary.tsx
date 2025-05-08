import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNotification } from './NotificationManager';
import apiService from '../services/api/apiService';
import '../styles/ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorReportProps {
  error: Error;
  errorInfo: ErrorInfo;
  onClose: () => void;
}

// Component to display and report errors
const ErrorReport: React.FC<ErrorReportProps> = ({ error, errorInfo, onClose }) => {
  const { addNotification } = useNotification();
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleReport = async () => {
    try {
      setIsSubmitting(true);
      // Submit error report to backend
      await apiService.reportError({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack || undefined,
        additionalInfo,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
      
      addNotification('Error report submitted successfully. Thank you!', 'success');
      setIsSubmitting(false);
      onClose();
    } catch (reportError) {
      addNotification('Failed to submit error report. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="error-report-container">
      <div className="error-report-content">
        <h2>Something went wrong</h2>
        <div className="error-details">
          <p className="error-message">{error.message}</p>
          <div className="error-stack">
            <h3>Technical Details</h3>
            <pre>{error.stack}</pre>
          </div>
        </div>
        
        <div className="error-report-form">
          <h3>Report this error</h3>
          <p>Help us improve by sending us details about what happened.</p>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="What were you doing when this error occurred? (optional)"
            rows={4}
          />
          
          <div className="error-report-actions">
            <button 
              className="error-report-button secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Dismiss
            </button>
            <button 
              className="error-report-button primary" 
              onClick={handleReport}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    // Log to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleClose = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      return (
        <ErrorReport 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          onClose={this.handleClose}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
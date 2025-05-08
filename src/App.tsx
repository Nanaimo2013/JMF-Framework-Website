import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './components/NotificationManager';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ErrorBoundary>
      <Router>
            <div className="app">
          <Navbar />
          <main className="main-content">
                <AppRoutes />
          </main>
          <Footer />
      </div>
      </Router>
        </ErrorBoundary>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;

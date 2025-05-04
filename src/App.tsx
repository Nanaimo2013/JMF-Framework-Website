import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import HomePage from './pages/Home/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationProvider from './components/NotificationManager';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './pages/ErrorPages/NotFound';
import ServerError from './pages/ErrorPages/ServerError';
import './App.css';
import './styles/GlobalScrollbar.css';

// Lazy load pages to improve performance
const DocumentationPage = lazy(() => import('./pages/Documentation/DocumentationPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const DownloadPage = lazy(() => import('./pages/Download/DownloadPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <LoadingScreen isLoading={isLoading} />
        <div className={`app ${isLoading ? 'app-loading' : ''}`}>
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<LoadingScreen isLoading={true} />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/documentation/*" element={<DocumentationPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/error/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
      </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import pages
import HomePage from './pages/Home/HomePage';
import DownloadPage from './pages/Download/DownloadPage';
import DocumentationPage from './pages/Documentation/DocumentationPage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import TermsOfService from './pages/Legal/TermsOfService';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import StatusPage from './pages/StatusPage';
import NotFound from './pages/ErrorPages/NotFound';

// Admin pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminReleases from './pages/Admin/AdminReleases';
import ReleaseForm from './pages/Admin/ReleaseForm';
import FileManager from './pages/Admin/FileManager';
import DocEditor from './pages/Admin/DocEditor';

// Wrap routes with any required providers/HOCs here
import { withAdmin } from './context/AuthContext';

// Wrap admin routes with HOC
const ProtectedAdminDashboard = withAdmin(AdminDashboard);
const ProtectedAdminReleases = withAdmin(AdminReleases);
const ProtectedReleaseForm = withAdmin(ReleaseForm);
const ProtectedFileManager = withAdmin(FileManager);
const ProtectedDocEditor = withAdmin(DocEditor);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/download" element={<DownloadPage />} />
      
      {/* Documentation routes - new pattern with /docs */}
      <Route path="/docs" element={<DocumentationPage />} />
      <Route path="/docs/:section" element={<DocumentationPage />} />
      <Route path="/docs/api/:apiSection" element={<DocumentationPage />} />
      <Route path="/docs/cli/:cliSection" element={<DocumentationPage />} />
      
      {/* Documentation routes - old pattern with /documentation for backward compatibility */}
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/documentation/:section" element={<DocumentationPage />} />
      <Route path="/documentation/sections/api/:apiSection" element={<DocumentationPage />} />
      <Route path="/documentation/sections/cli/:cliSection" element={<DocumentationPage />} />
      
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/status" element={<StatusPage />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedAdminDashboard />} />
      
      {/* Release management routes */}
      <Route path="/admin/releases" element={<ProtectedAdminReleases />} />
      <Route path="/admin/releases/new" element={<ProtectedReleaseForm />} />
      <Route path="/admin/releases/edit/:id" element={<ProtectedReleaseForm />} />
      
      {/* File management routes */}
      <Route path="/admin/files" element={<ProtectedFileManager />} />
      
      {/* Documentation management routes */}
      <Route path="/admin/docs" element={<ProtectedAdminReleases />} /> {/* Temporarily reusing AdminReleases until we create AdminDocs component */}
      <Route path="/admin/docs/new" element={<ProtectedDocEditor />} />
      <Route path="/admin/docs/edit/:id" element={<ProtectedDocEditor />} />
      
      {/* 404 catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 
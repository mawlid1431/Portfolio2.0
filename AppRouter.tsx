import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import DatabaseDebug from './components/DatabaseDebug';
import SimpleTest from './components/SimpleTest';
import EmailTest from './components/EmailTest';
import { Toaster } from 'sonner';

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Main portfolio route */}
        <Route path="/" element={<App />} />
        
        {/* Admin login route */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin onLogin={handleLogin} />
          } 
        />
        
        {/* Protected admin dashboard route */}
        <Route 
          path="/admin/dashboard" 
          element={
            isAuthenticated ? 
              <AdminDashboard onLogout={handleLogout} /> : 
              <Navigate to="/admin" replace />
          } 
        />
        
        {/* Database debug route - for troubleshooting */}
        <Route path="/debug" element={<DatabaseDebug />} />
        
        {/* Simple test route - for basic testing */}
        <Route path="/test" element={<SimpleTest />} />
        
        {/* Email test route - for testing email functionality */}
        <Route path="/email-test" element={<EmailTest />} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
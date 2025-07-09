import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import LoanApplication from './LoanApplication';
import Dashboard from './Dashboard';
import PaymentManagement from './PaymentManagement';
import Unauthorized from './Unauthorized';
import PaymentHistory from './PaymentHistory';
import LoanHistory from './LoanHistory';
import DocumentUpload from './DocumentUpload';
import GuarantorManagement from './GuarantorManagement';
import ProfileSettings from './ProfileSettings';
import Notifications from './Notifications';
import PasswordReset from './PasswordReset';
import TwoFactorAuth from './TwoFactorAuth';
import { ThemeProvider } from './ThemeContext';
import AdminDashboard from './AdminDashboard';
import AdminUserManagement from './AdminUserManagement';
import AdminLoanTypeManagement from './AdminLoanTypeManagement';
import AdminGuarantorManagement from './AdminGuarantorManagement';
import AdminAnalytics from './AdminAnalytics';

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Get role from localStorage
    const userRole = localStorage.getItem('role');
    if (userRole) setRole(userRole);
  }, []);

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!role) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
    return element;
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register setRole={setRole} />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/2fa" element={<TwoFactorAuth />} />

            {/* Customer Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/loan-application" element={<ProtectedRoute element={<LoanApplication />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/payment-management" element={<ProtectedRoute element={<PaymentManagement />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/payment-history" element={<ProtectedRoute element={<PaymentHistory />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/loan-history" element={<ProtectedRoute element={<LoanHistory />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/document-upload" element={<ProtectedRoute element={<DocumentUpload />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/guarantor-management" element={<ProtectedRoute element={<GuarantorManagement />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/profile-settings" element={<ProtectedRoute element={<ProfileSettings />} allowedRoles={['CUSTOMER']} />} />
            <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} allowedRoles={['CUSTOMER']} />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['ADMIN']} />} />
            <Route path="/admin/users" element={<ProtectedRoute element={<AdminUserManagement />} allowedRoles={['ADMIN']} />} />
            <Route path="/admin/loan-types" element={<ProtectedRoute element={<AdminLoanTypeManagement />} allowedRoles={['ADMIN']} />} />
            <Route path="/admin/guarantors" element={<ProtectedRoute element={<AdminGuarantorManagement />} allowedRoles={['ADMIN']} />} />
            <Route path="/admin/analytics" element={<ProtectedRoute element={<AdminAnalytics />} allowedRoles={['ADMIN']} />} />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
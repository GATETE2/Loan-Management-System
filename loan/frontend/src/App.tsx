import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme/theme';
import { MainLayout } from './components/layout/MainLayout';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { LoanApplicationForm } from './components/loan/LoanApplicationForm';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

// Mock authentication state - replace with actual auth context
const isAuthenticated = true;
const userRole = 'CUSTOMER';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <CustomerDashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/apply-loan"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LoanApplicationForm />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  Grid,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

const Login = ({ setRole }) => {
  const [formData, setFormData] = useState({ email: '', password: '', otp: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: login, 2: OTP, 3: role selection
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: 'Enter the 6-digit OTP sent to your email.' });
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3); // Move to role selection step
    } catch (error) {
      setErrors({ otp: 'Invalid OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    localStorage.setItem('role', selectedRole);
    setRole(selectedRole);
    if (selectedRole === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'blue.50',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 0.5s',
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          background: theme.palette.mode === 'dark'
            ? 'rgba(30,30,40,0.95)'
            : 'rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          animation: 'fadeIn 1s',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight="bold"
            sx={{
              fontFamily: 'Montserrat, Roboto, Arial',
              letterSpacing: 2,
              color: theme.palette.primary.main,
              mt: 1,
              mb: 1,
            }}
          >
            Loan Management System
          </Typography>
        </Box>
        <Typography variant="h6" align="center" sx={{ mb: 1, color: theme.palette.text.primary }}>
          {step === 1 ? 'Sign in to your account' : step === 2 ? 'Enter OTP' : 'Select Your Role'}
        </Typography>
        {location.state?.message && (
          <Alert severity="success" sx={{ mb: 2, textAlign: 'center' }}>
            {location.state.message}
          </Alert>
        )}
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email address"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.submit}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                mb: 2,
                fontWeight: 'bold',
                fontSize: 18,
                py: 1.5,
                boxShadow: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
              endIcon={isLoading ? <CircularProgress size={24} /> : <LoginIcon />}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              Don't have an account?{' '}
              <Button
                variant="text"
                onClick={() => navigate('/register')}
                startIcon={<AccountCircleIcon />}
                sx={{ fontWeight: 'bold' }}
              >
                Register
              </Button>
            </Typography>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleOTP}>
            <TextField
              fullWidth
              id="otp"
              name="otp"
              label="OTP Code"
              type="text"
              inputProps={{ maxLength: 6, style: { letterSpacing: 8, textAlign: 'center', fontSize: 24 } }}
              required
              value={formData.otp}
              onChange={handleChange}
              error={!!errors.otp}
              helperText={errors.otp || 'Enter the 6-digit OTP sent to your email.'}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                mb: 2,
                fontWeight: 'bold',
                fontSize: 18,
                py: 1.5,
                boxShadow: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
              endIcon={isLoading ? <CircularProgress size={24} /> : <VpnKeyIcon />}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setStep(1)}
              sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
            >
              Back to Login
            </Button>
          </form>
        ) : (
          <Box>
            <Typography variant="h6" align="center" sx={{ mb: 3, color: theme.palette.text.primary }}>
              Select Your Role
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => handleRoleSelection('CUSTOMER')}
                  sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">Customer</Typography>
                  <Typography variant="body2">Access customer dashboard</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => handleRoleSelection('ADMIN')}
                  sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.dark} 90%)`,
                  }}
                >
                  <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">Admin</Typography>
                  <Typography variant="body2">Access admin dashboard</Typography>
                </Button>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="text"
              onClick={() => setStep(2)}
              sx={{ mt: 2, fontWeight: 'bold', color: theme.palette.primary.main }}
            >
              Back to OTP
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
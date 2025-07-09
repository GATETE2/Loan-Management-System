import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const otpValidationSchema = yup.object({
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
});

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Implement actual API call
        console.log('Login attempt:', values);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowOtp(true);
      } catch (err) {
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Implement actual OTP verification
        console.log('OTP verification:', values);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/');
      } catch (err) {
        setError('Invalid OTP');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {showOtp ? 'Enter OTP' : 'Login'}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {showOtp ? (
          <form onSubmit={otpFormik.handleSubmit}>
            <TextField
              fullWidth
              id="otp"
              name="otp"
              label="Enter OTP"
              value={otpFormik.values.otp}
              onChange={otpFormik.handleChange}
              error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
              helperText={otpFormik.touched.otp && otpFormik.errors.otp}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setShowOtp(false)}
              disabled={loading}
            >
              Back to Login
            </Button>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/register')}
              disabled={loading}
            >
              Don't have an account? Register
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}; 
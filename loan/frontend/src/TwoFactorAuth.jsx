import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const TwoFactorAuth = ({ onVerify }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const handleVerify = () => {
    if (otp === '123456') {
      onVerify();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'blue.50' }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" mb={2}>Two-Factor Authentication</Typography>
        <Typography variant="body2" mb={2}>Enter the 6-digit OTP sent to your email.</Typography>
        <TextField label="OTP" fullWidth value={otp} onChange={e => setOtp(e.target.value)} sx={{ mb: 2 }} />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button variant="contained" color="primary" fullWidth onClick={handleVerify}>Verify</Button>
      </Paper>
    </Box>
  );
};
export default TwoFactorAuth;
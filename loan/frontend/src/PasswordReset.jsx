import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleReset = () => {
    setMessage('If this email exists, a reset link has been sent.');
  };
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'blue.50' }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <LockResetIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" mb={2}>Password Reset</Typography>
        <Typography variant="body2" mb={2}>Enter your email to receive a password reset link.</Typography>
        <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
        {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
        <Button variant="contained" color="primary" fullWidth onClick={handleReset}>Send Reset Link</Button>
      </Paper>
    </Box>
  );
};
export default PasswordReset;
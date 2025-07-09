import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardActionArea, CardContent, Typography, Avatar } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockResetIcon from '@mui/icons-material/LockReset';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const features = [
  { label: 'Payment History', icon: <PaymentIcon />, path: '/payment-history' },
  { label: 'Loan History', icon: <HistoryIcon />, path: '/loan-history' },
  { label: 'Document Upload', icon: <UploadFileIcon />, path: '/document-upload' },
  { label: 'Guarantor Management', icon: <GroupIcon />, path: '/guarantor-management' },
  { label: 'Profile Settings', icon: <SettingsIcon />, path: '/profile-settings' },
  { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { label: 'Password Reset', icon: <LockResetIcon />, path: '/password-reset' },
  { label: 'Two Factor Auth', icon: <VerifiedUserIcon />, path: '/2fa' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)' }}>
      <Box textAlign="center" mb={4}>
        <Avatar sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: 'primary.main', fontSize: 40 }}>👋</Avatar>
        <Typography variant="h4" fontWeight="bold" mt={2} color="primary">Welcome to Your Dashboard!</Typography>
        <Typography variant="subtitle1" color="text.secondary">Navigate to any section below to manage your account and loans.</Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={feature.label}>
            <Card elevation={4}>
              <CardActionArea onClick={() => navigate(feature.path)}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', margin: '0 auto', mb: 2, width: 56, height: 56 }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="medium">{feature.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Category as CategoryIcon,
  Group as GroupIcon,
  Dashboard as DashboardIcon,
  TrendingUp,
  Payment,
  Warning,
  CheckCircle,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 150,
    activeLoans: 45,
    pendingApplications: 12,
    totalRevenue: 250000,
  };

  const recentActivities = [
    {
      type: 'LOAN',
      message: 'New loan application received',
      date: '2024-03-15',
      status: 'pending',
    },
    {
      type: 'PAYMENT',
      message: 'Payment received for LOAN-001',
      date: '2024-03-14',
      status: 'success',
    },
    {
      type: 'USER',
      message: 'New user registration',
      date: '2024-03-13',
      status: 'info',
    },
  ];

  const adminFeatures = [
    {
      title: 'User Management',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/admin/users',
      description: 'Manage user accounts and permissions',
      color: '#1976d2',
    },
    {
      title: 'Loan Type Management',
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      path: '/admin/loan-types',
      description: 'Configure loan types and terms',
      color: '#2e7d32',
    },
    {
      title: 'Guarantor Management',
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      path: '/admin/guarantors',
      description: 'Manage guarantor profiles and verifications',
      color: '#ed6c02',
    },
    {
      title: 'Analytics & Reports',
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      path: '/admin/analytics',
      description: 'View system analytics and generate reports',
      color: '#9c27b0',
    },
  ];

  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Top Navigation Bar */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'white', color: '#1976d2' }}>A</Avatar>
          <Typography variant="h6">Admin Portal</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Box sx={{ p: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your loan system efficiently
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Total Users</Typography>
                <Typography variant="h4" color="primary" sx={{ my: 1 }}>{stats.totalUsers}</Typography>
                <LinearProgress variant="determinate" value={70} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Active Loans</Typography>
                <Typography variant="h4" color="success.main" sx={{ my: 1 }}>{stats.activeLoans}</Typography>
                <LinearProgress variant="determinate" value={45} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Pending Applications</Typography>
                <Typography variant="h4" color="warning.main" sx={{ my: 1 }}>{stats.pendingApplications}</Typography>
                <LinearProgress variant="determinate" value={30} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Total Revenue</Typography>
                <Typography variant="h4" color="info.main" sx={{ my: 1 }}>
                  ${stats.totalRevenue.toLocaleString()}
                </Typography>
                <LinearProgress variant="determinate" value={85} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {adminFeatures.map((feature) => (
                  <Grid item xs={12} sm={6} key={feature.title}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6,
                        }
                      }}
                      onClick={() => navigate(feature.path)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: 2,
                            backgroundColor: `${feature.color}15`,
                            color: feature.color
                          }}>
                            {feature.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Recent Activity */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {activity.status === 'success' ? (
                          <CheckCircle color="success" />
                        ) : activity.status === 'pending' ? (
                          <Warning color="warning" />
                        ) : (
                          <TrendingUp color="info" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.message}
                        secondary={new Date(activity.date).toLocaleDateString()}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* System Status */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                System Status
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Server Status"
                    secondary="All systems operational"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Database"
                    secondary="Connected and running"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="API Services"
                    secondary="All endpoints responding"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
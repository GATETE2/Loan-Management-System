import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  People,
  Payment,
  Warning,
  CheckCircle,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - replace with actual API calls
  const stats = {
    totalLoans: {
      value: 150,
      change: 12,
      trend: 'up',
    },
    activeLoans: {
      value: 45,
      change: -5,
      trend: 'down',
    },
    totalRevenue: {
      value: 250000,
      change: 8,
      trend: 'up',
    },
    defaultRate: {
      value: 2.5,
      change: -0.5,
      trend: 'down',
    },
  };

  const loanDistribution = [
    { type: 'Personal Loan', amount: 45, percentage: 30 },
    { type: 'Business Loan', amount: 35, percentage: 23 },
    { type: 'Education Loan', amount: 25, percentage: 17 },
    { type: 'Home Loan', amount: 45, percentage: 30 },
  ];

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
      type: 'DEFAULT',
      message: 'Payment overdue for LOAN-002',
      date: '2024-03-13',
      status: 'warning',
    },
  ];

  const StatCard = ({ title, value, change, trend, icon, color }) => (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {typeof value === 'number' && value >= 1000
                ? `$${value.toLocaleString()}`
                : value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {trend === 'up' ? (
                <ArrowUpward color="success" fontSize="small" />
              ) : (
                <ArrowDownward color="error" fontSize="small" />
              )}
              <Typography
                variant="body2"
                color={trend === 'up' ? 'success.main' : 'error.main'}
              >
                {change}% from last {timeRange}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Loans"
            value={stats.totalLoans.value}
            change={stats.totalLoans.change}
            trend={stats.totalLoans.trend}
            icon={<AccountBalance sx={{ color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Loans"
            value={stats.activeLoans.value}
            change={stats.activeLoans.change}
            trend={stats.activeLoans.trend}
            icon={<TrendingUp sx={{ color: 'success.main' }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue.value}
            change={stats.totalRevenue.change}
            trend={stats.totalRevenue.trend}
            icon={<Payment sx={{ color: 'info.main' }} />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Default Rate"
            value={`${stats.defaultRate.value}%`}
            change={stats.defaultRate.change}
            trend={stats.defaultRate.trend}
            icon={<Warning sx={{ color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Loan Distribution */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Loan Distribution
            </Typography>
            <List>
              {loanDistribution.map((loan, index) => (
                <React.Fragment key={loan.type}>
                  <ListItem>
                    <ListItemText
                      primary={loan.type}
                      secondary={`${loan.amount} loans`}
                    />
                    <Box sx={{ width: '60%', mr: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={loan.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {loan.percentage}%
                    </Typography>
                  </ListItem>
                  {index < loanDistribution.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.status === 'success' ? (
                        <CheckCircle color="success" />
                      ) : activity.status === 'warning' ? (
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
      </Grid>
    </Box>
  );
};

export default AdminAnalytics;
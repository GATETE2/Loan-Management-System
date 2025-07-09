import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Payment,
  Notifications,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface LoanSummary {
  id: string;
  amount: number;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  nextPayment: {
    date: string;
    amount: number;
  };
  progress: number;
}

export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const loanSummary: LoanSummary = {
    id: 'LOAN-001',
    amount: 50000,
    status: 'ACTIVE',
    nextPayment: {
      date: '2024-04-15',
      amount: 2500,
    },
    progress: 35,
  };

  const recentActivities = [
    {
      type: 'PAYMENT',
      message: 'Payment of $2,500 received',
      date: '2024-03-15',
      status: 'success',
    },
    {
      type: 'LOAN',
      message: 'Loan application approved',
      date: '2024-02-01',
      status: 'success',
    },
    {
      type: 'DOCUMENT',
      message: 'New document uploaded',
      date: '2024-01-28',
      status: 'info',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Loan Summary Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Loan
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" color="primary">
                  ${loanSummary.amount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Loan ID: {loanSummary.id}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Repayment Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={loanSummary.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {loanSummary.progress}% Complete
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Next Payment
                </Typography>
                <Typography variant="h6">
                  ${loanSummary.nextPayment.amount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due: {new Date(loanSummary.nextPayment.date).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Payment />}
                    onClick={() => navigate('/payments')}
                  >
                    Make Payment
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AccountBalance />}
                    onClick={() => navigate('/apply-loan')}
                  >
                    Apply for Loan
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<TrendingUp />}
                    onClick={() => navigate('/my-loans')}
                  >
                    View Statement
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Notifications />}
                    onClick={() => navigate('/notifications')}
                  >
                    Notifications
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
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
                        ) : (
                          <Warning color="info" />
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 
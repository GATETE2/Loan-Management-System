import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const mockNotifications = [
  { type: 'success', message: 'Loan approved!', date: '2024-04-01' },
  { type: 'warning', message: 'Upcoming payment due.', date: '2024-04-10' },
  { type: 'info', message: 'Document uploaded successfully.', date: '2024-03-28' },
];

const Notifications = () => (
  <Box sx={{ p: 4 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <NotificationsActiveIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h5" fontWeight="bold">Notifications</Typography>
      </Box>
      <List>
        {mockNotifications.map((n, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <ListItemIcon>
                {n.type === 'success' ? <CheckCircleIcon color="success" /> : n.type === 'warning' ? <WarningAmberIcon color="warning" /> : <NotificationsActiveIcon color="info" />}
              </ListItemIcon>
              <ListItemText primary={n.message} secondary={n.date} />
            </ListItem>
            {i < mockNotifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  </Box>
);
export default Notifications;
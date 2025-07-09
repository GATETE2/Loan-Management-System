import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import {
  Dashboard,
  AccountBalance,
  Description,
  Payment,
  People,
  Settings,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavigationMenuProps {
  role: 'CUSTOMER' | 'ADMIN';
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ role }) => {
  const navigate = useNavigate();

  const customerMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Apply for Loan', icon: <AccountBalance />, path: '/apply-loan' },
    { text: 'My Loans', icon: <Description />, path: '/my-loans' },
    { text: 'Payments', icon: <Payment />, path: '/payments' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const adminMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Loan Applications', icon: <Description />, path: '/admin/applications' },
    { text: 'Users', icon: <People />, path: '/admin/users' },
    { text: 'Payments', icon: <Payment />, path: '/admin/payments' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  const menuItems = role === 'ADMIN' ? adminMenuItems : customerMenuItems;

  return (
    <Box sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      {role === 'ADMIN' && (
        <>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => navigate('/admin/system')}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
}; 
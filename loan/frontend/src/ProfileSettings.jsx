import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@email.com', phone: '1234567890' });
  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 3, maxWidth: 500, mx: 'auto' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}><AccountCircleIcon /></Avatar>
          <Typography variant="h5" fontWeight="bold">Profile Settings</Typography>
        </Box>
        <TextField label="Name" name="name" fullWidth sx={{ mb: 2 }} value={profile.name} onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth sx={{ mb: 2 }} value={profile.email} onChange={handleChange} />
        <TextField label="Phone" name="phone" fullWidth sx={{ mb: 2 }} value={profile.phone} onChange={handleChange} />
        <Button variant="contained" color="primary" fullWidth>Update Profile</Button>
      </Paper>
    </Box>
  );
};
export default ProfileSettings;
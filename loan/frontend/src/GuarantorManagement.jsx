import React, { useState } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, Chip } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const mockGuarantors = [
  { name: 'Jane Doe', status: 'Accepted' },
  { name: 'Mark Smith', status: 'Pending' },
];

const GuarantorManagement = () => {
  const [guarantors, setGuarantors] = useState(mockGuarantors);
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <GroupAddIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Guarantor Management</Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>Add Guarantor</Button>
        <List>
          {guarantors.map((g, i) => (
            <ListItem key={i}>
              <ListItemText primary={g.name} />
              <Chip label={g.status} color={g.status === 'Accepted' ? 'success' : 'warning'} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
export default GuarantorManagement;
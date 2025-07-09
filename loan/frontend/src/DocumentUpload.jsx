import React, { useState } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const handleUpload = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <CloudUploadIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Document Upload</Typography>
        </Box>
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
          Upload Files
          <input type="file" hidden multiple onChange={handleUpload} />
        </Button>
        <List>
          {files.map((file, i) => (
            <ListItem key={i}>
              <ListItemText primary={file.name} />
              <LinearProgress variant="determinate" value={100} sx={{ width: 100 }} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
export default DocumentUpload;
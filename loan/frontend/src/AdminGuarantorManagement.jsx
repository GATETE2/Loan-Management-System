import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const AdminGuarantorManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGuarantor, setSelectedGuarantor] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('PENDING');

  // Mock data - replace with actual API calls
  const guarantors = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234-567-8901',
      address: '123 Main St, City, Country',
      occupation: 'Software Engineer',
      income: 75000,
      status: 'VERIFIED',
      verificationDate: '2024-03-10',
      documents: ['ID', 'Income Proof', 'Address Proof'],
      associatedLoans: 2,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 234-567-8902',
      address: '456 Oak Ave, Town, Country',
      occupation: 'Doctor',
      income: 120000,
      status: 'PENDING',
      verificationDate: null,
      documents: ['ID', 'Income Proof'],
      associatedLoans: 1,
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 234-567-8903',
      address: '789 Pine Rd, Village, Country',
      occupation: 'Business Owner',
      income: 150000,
      status: 'REJECTED',
      verificationDate: '2024-03-12',
      documents: ['ID', 'Business License'],
      associatedLoans: 0,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (guarantor = null) => {
    setSelectedGuarantor(guarantor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedGuarantor(null);
    setOpenDialog(false);
  };

  const handleSaveGuarantor = () => {
    // Implement save logic here
    handleCloseDialog();
  };

  const handleDeleteGuarantor = (guarantorId) => {
    // Implement delete logic here
  };

  const handleVerifyGuarantor = (guarantorId) => {
    // Implement verification logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredGuarantors = guarantors.filter(guarantor =>
    guarantor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guarantor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guarantor.phone.includes(searchQuery)
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h1" gutterBottom>
              Guarantor Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and verify guarantors for loan applications
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search guarantors..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Add Guarantor
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <VerifiedUserIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Verified</Typography>
                    <Typography variant="h4">
                      {guarantors.filter(g => g.status === 'VERIFIED').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <WarningIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Pending</Typography>
                    <Typography variant="h4">
                      {guarantors.filter(g => g.status === 'PENDING').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'error.main' }}>
                    <DeleteIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Rejected</Typography>
                    <Typography variant="h4">
                      {guarantors.filter(g => g.status === 'REJECTED').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <MoneyIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Total Loans</Typography>
                    <Typography variant="h4">
                      {guarantors.reduce((sum, g) => sum + g.associatedLoans, 0)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Guarantors Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Documents</TableCell>
                <TableCell>Associated Loans</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGuarantors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((guarantor) => (
                  <TableRow key={guarantor.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body1">{guarantor.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {guarantor.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PhoneIcon fontSize="small" /> {guarantor.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon fontSize="small" /> {guarantor.address}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <WorkIcon fontSize="small" />
                        <Typography variant="body2">{guarantor.occupation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        ${guarantor.income.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={guarantor.status}
                        color={getStatusColor(guarantor.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {guarantor.documents.map((doc, index) => (
                          <Chip
                            key={index}
                            label={doc}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {guarantor.associatedLoans}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(guarantor)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {guarantor.status === 'PENDING' && (
                        <Tooltip title="Verify">
                          <IconButton
                            size="small"
                            onClick={() => handleVerifyGuarantor(guarantor.id)}
                            color="success"
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteGuarantor(guarantor.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGuarantors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Guarantor Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedGuarantor ? 'Edit Guarantor' : 'Add New Guarantor'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={selectedGuarantor?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue={selectedGuarantor?.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={selectedGuarantor?.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  defaultValue={selectedGuarantor?.occupation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  defaultValue={selectedGuarantor?.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Income"
                  type="number"
                  defaultValue={selectedGuarantor?.income}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Verification Status</InputLabel>
                  <Select
                    label="Verification Status"
                    value={verificationStatus}
                    onChange={(e) => setVerificationStatus(e.target.value)}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="VERIFIED">Verified</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveGuarantor} variant="contained">
            {selectedGuarantor ? 'Save Changes' : 'Add Guarantor'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminGuarantorManagement;
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const AdminLoanTypeManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  // Mock data - replace with actual API calls
  const loanTypes = [
    {
      id: 1,
      name: 'Personal Loan',
      description: 'Short-term personal loan for various purposes',
      interestRate: 12.5,
      minAmount: 1000,
      maxAmount: 50000,
      termMonths: 24,
      isActive: true,
    },
    {
      id: 2,
      name: 'Business Loan',
      description: 'Loan for business expansion and operations',
      interestRate: 10.5,
      minAmount: 5000,
      maxAmount: 200000,
      termMonths: 60,
      isActive: true,
    },
    // Add more mock loan types as needed
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

  const handleOpenDialog = (loanType = null) => {
    setSelectedLoanType(loanType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedLoanType(null);
    setOpenDialog(false);
  };

  const handleSaveLoanType = () => {
    // Implement save logic here
    handleCloseDialog();
  };

  const handleDeleteLoanType = (loanTypeId) => {
    // Implement delete logic here
  };

  const handleToggleStatus = (loanTypeId, currentStatus) => {
    // Implement status toggle logic here
  };

  const filteredLoanTypes = loanTypes.filter(loanType =>
    loanType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loanType.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h1" gutterBottom>
              Loan Type Management
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search loan types..."
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
                Add Loan Type
              </Button>
            </Box>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Interest Rate</TableCell>
                <TableCell>Amount Range</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoanTypes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((loanType) => (
                  <TableRow key={loanType.id}>
                    <TableCell>{loanType.name}</TableCell>
                    <TableCell>{loanType.description}</TableCell>
                    <TableCell>{loanType.interestRate}%</TableCell>
                    <TableCell>
                      ${loanType.minAmount.toLocaleString()} - ${loanType.maxAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{loanType.termMonths} months</TableCell>
                    <TableCell>
                      <Chip
                        label={loanType.isActive ? 'Active' : 'Inactive'}
                        color={loanType.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(loanType)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteLoanType(loanType.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLoanTypes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Loan Type Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedLoanType ? 'Edit Loan Type' : 'Add New Loan Type'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={selectedLoanType?.name}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              defaultValue={selectedLoanType?.description}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Interest Rate (%)"
                  type="number"
                  defaultValue={selectedLoanType?.interestRate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Term (months)"
                  type="number"
                  defaultValue={selectedLoanType?.termMonths}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Amount"
                  type="number"
                  defaultValue={selectedLoanType?.minAmount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Amount"
                  type="number"
                  defaultValue={selectedLoanType?.maxAmount}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={selectedLoanType?.isActive ?? true}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveLoanType} variant="contained">
            {selectedLoanType ? 'Save Changes' : 'Add Loan Type'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLoanTypeManagement;
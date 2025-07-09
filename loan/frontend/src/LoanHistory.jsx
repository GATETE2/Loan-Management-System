import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

const mockLoans = [
  { id: 'LN-001', amount: 50000, status: 'Active', date: '2024-01-10' },
  { id: 'LN-002', amount: 20000, status: 'Paid', date: '2023-06-15' },
  { id: 'LN-003', amount: 15000, status: 'Rejected', date: '2023-03-20' },
];

const LoanHistory = () => (
  <Box sx={{ p: 4 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <HistoryIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h5" fontWeight="bold">Loan Statement / History</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loan ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockLoans.map(loan => (
            <TableRow key={loan.id}>
              <TableCell>{loan.id}</TableCell>
              <TableCell>${loan.amount.toLocaleString()}</TableCell>
              <TableCell><Chip label={loan.status} color={loan.status === 'Active' ? 'primary' : loan.status === 'Paid' ? 'success' : 'error'} /></TableCell>
              <TableCell>{loan.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);
export default LoanHistory;
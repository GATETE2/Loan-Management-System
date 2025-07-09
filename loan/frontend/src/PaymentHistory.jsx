import React from 'react';
import { Box, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const mockPayments = [
  { id: 'PMT-001', amount: 2500, date: '2024-03-15', status: 'Paid' },
  { id: 'PMT-002', amount: 2500, date: '2024-02-15', status: 'Paid' },
  { id: 'PMT-003', amount: 2500, date: '2024-01-15', status: 'Pending' },
];

const PaymentHistory = () => (
  <Box sx={{ p: 4 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <ReceiptLongIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h5" fontWeight="bold">Payment History & Receipts</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Receipt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockPayments.map(payment => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>${payment.amount.toLocaleString()}</TableCell>
              <TableCell><Chip label={payment.status} color={payment.status === 'Paid' ? 'success' : 'warning'} /></TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell><Button variant="outlined" size="small">Download</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);
export default PaymentHistory;
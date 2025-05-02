import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
// Remove the date picker imports
import { transactionService } from '../services/api';

function PaymentTracker() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    category: 'shopping',
    type: 'expense'
  });
  
  // Mock user ID (in a real app, this would come from authentication)
  const userId = "user123";
  
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getTransactions(userId);
      console.log('Fetched transactions:', response);
      
      // Handle different response formats
      let transactionsData = [];
      if (Array.isArray(response)) {
        transactionsData = response;
      } else if (response && response.data) {
        transactionsData = Array.isArray(response.data) ? response.data : [];
      }
      
      console.log('Transactions data to display:', transactionsData);
      setTransactions(transactionsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please try again later.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, [userId]);
  
  const handleAddTransaction = async () => {
    try {
      const transactionToAdd = {
        ...newTransaction,
        userId,
        date: new Date(newTransaction.date).toISOString(),
        amount: newTransaction.type === 'expense' 
          ? -Math.abs(parseFloat(newTransaction.amount)) 
          : Math.abs(parseFloat(newTransaction.amount))
      };
      
      console.log('Adding transaction:', transactionToAdd);
      await transactionService.addTransaction(transactionToAdd);
      
      // Close dialog and reset form
      setOpenDialog(false);
      setNewTransaction({
        name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'shopping',
        type: 'expense'
      });
      
      // Force a refresh of the transactions
      setTimeout(() => {
        fetchTransactions();
      }, 500);
    } catch (err) {
      console.error("Error adding transaction:", err);
      alert(`Failed to add transaction: ${err.message}`);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value
    });
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => fetchTransactions()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Payment Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your income and expenses
          </Typography>
        </div>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
        >
          Add Transaction
        </Button>
      </Box>
      
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Recent Transactions
          </Typography>
          {transactions.length === 0 ? (
            <Typography variant="body1">No transactions found.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id || transaction.id || Math.random()}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell 
                        align="right"
                        sx={{ 
                          color: parseFloat(transaction.amount) < 0 ? 'error.main' : 'success.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {parseFloat(transaction.amount) < 0 ? '-' : '+'}${Math.abs(parseFloat(transaction.amount)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
      
      {/* Add Transaction Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Description"
                fullWidth
                value={newTransaction.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                value={newTransaction.amount}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="date"
                label="Date"
                type="date"
                fullWidth
                value={newTransaction.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={newTransaction.type}
                  label="Type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newTransaction.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  <MenuItem value="shopping">Shopping</MenuItem>
                  <MenuItem value="food">Food & Dining</MenuItem>
                  <MenuItem value="transportation">Transportation</MenuItem>
                  <MenuItem value="utilities">Utilities</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant="contained">Add Transaction</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PaymentTracker;
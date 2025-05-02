import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
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
import { billsService } from '../services/api';

function BillTracker() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    category: 'utilities',
    recurring: false
  });
  
  // Mock user ID (in a real app, this would come from authentication)
  const userId = "user123";
  
  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await billsService.getBills(userId);
      console.log('Fetched bills:', response);
      
      // Handle different response formats
      let billsData = [];
      if (Array.isArray(response)) {
        billsData = response;
      } else if (response && response.data) {
        billsData = Array.isArray(response.data) ? response.data : [];
      }
      
      console.log('Bills data to display:', billsData);
      setBills(billsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bills:", err);
      setError("Failed to load bills. Please try again later.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBills();
  }, [userId]);
  
  const handlePayBill = async (billId) => {
    try {
      await billsService.payBill(billId);
      // Update the bills list
      setBills(bills.map(bill => 
        bill._id === billId ? { ...bill, paid: true } : bill
      ));
    } catch (err) {
      console.error("Error paying bill:", err);
    }
  };
  
  const handleAddBill = async () => {
    try {
      const billToAdd = {
        ...newBill,
        userId,
        dueDate: new Date(newBill.dueDate).toISOString(),
        amount: parseFloat(newBill.amount)
      };
      
      console.log('Adding bill:', billToAdd);
      await billsService.addBill(billToAdd);
      
      // Close dialog and reset form
      setOpenDialog(false);
      setNewBill({
        name: '',
        amount: '',
        dueDate: new Date().toISOString().split('T')[0],
        category: 'utilities',
        recurring: false
      });
      
      // Force a refresh of the bills
      setTimeout(() => {
        fetchBills();
      }, 500);
    } catch (err) {
      console.error("Error adding bill:", err);
      alert(`Failed to add bill: ${err.message}`);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill({
      ...newBill,
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
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => fetchBills()}>
          Retry
        </Button>
      </Box>
    );
  }

  // The issue is likely around line 261, let's fix the structure
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Bill Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track your upcoming bills
          </Typography>
        </div>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
        >
          Add New Bill
        </Button>
      </Box>
      
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Upcoming Bills
          </Typography>
          {bills.length === 0 ? (
            <Typography variant="body1">No upcoming bills found.</Typography>
          ) : (
            <List>
              {bills.map((bill) => (
                <ListItem key={bill._id || bill.id || Math.random()} divider>
                  <ListItemText
                    primary={bill.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Due: {new Date(bill.dueDate).toLocaleDateString()}
                        </Typography>
                        {bill.category && (
                          <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                            Category: {bill.category}
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                      ${parseFloat(bill.amount).toLocaleString()}
                    </Typography>
                    {!bill.paid && (
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => handlePayBill(bill._id || bill.id)}
                      >
                        Pay Now
                      </Button>
                    )}
                    {bill.paid && (
                      <Typography variant="body2" color="success.main">
                        Paid
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      
      {/* Add Bill Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Bill Name"
                fullWidth
                value={newBill.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                value={newBill.amount}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                fullWidth
                value={newBill.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newBill.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  <MenuItem value="utilities">Utilities</MenuItem>
                  <MenuItem value="rent">Rent/Mortgage</MenuItem>
                  <MenuItem value="insurance">Insurance</MenuItem>
                  <MenuItem value="subscription">Subscription</MenuItem>
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBill} variant="contained">Add Bill</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BillTracker;
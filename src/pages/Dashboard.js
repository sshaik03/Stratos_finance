import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
  AttachMoney,
  CreditCard,
  School,
  Forum,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  transactionService, 
  budgetService, 
  billsService, 
  investmentService,
  accountService 
} from '../services/api';

// Sample data for charts (will be replaced with real data)
const spendingData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 900 },
  { name: 'Mar', amount: 1500 },
  { name: 'Apr', amount: 1000 },
  { name: 'May', amount: 800 },
  { name: 'Jun', amount: 1300 },
];

function Dashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for data from backend
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [bills, setBills] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  // Mock user ID (in a real app, this would come from authentication)
  const userId = "user123";
  
  useEffect(() => {
    // Function to fetch all data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from all services in parallel
        const [transactionsRes, budgetsRes, billsRes, investmentsRes, accountsRes] = await Promise.all([
          transactionService.getTransactions(userId),
          budgetService.getBudgets(userId),
          billsService.getBills(userId),
          investmentService.getInvestments(userId),
          accountService.getAccounts(userId)
        ]);
        
        // Update state with fetched data
        setTransactions(transactionsRes.data);
        setBudgets(budgetsRes.data);
        setBills(billsRes.data);
        setInvestments(investmentsRes.data);
        setAccounts(accountsRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);
  
  // Calculate total balance from accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Calculate monthly spending from transactions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlySpending = transactions
    .filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear && 
             t.amount < 0;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  // Format budget data for pie chart
  const budgetData = budgets.map(budget => ({
    name: budget.name,
    value: budget.amount,
    color: budget.color || '#4DA1A9'
  }));
  
  // Get upcoming bills
  const upcomingBills = bills
    .filter(bill => !bill.paid)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);
  
  // Get recent transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  
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
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome back, John!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your finances
        </Typography>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Balance
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                ${totalBalance.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +2.5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Monthly Spending
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                ${monthlySpending.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownward sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="error.main">
                  -4.3% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* ... rest of your dashboard UI ... */}
        
      </Grid>
      
      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Spending Overview */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Spending Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Budget Allocation */}
          {budgetData.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Budget Allocation
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <Box sx={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {budgetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <List>
                      {budgetData.map((category) => (
                        <ListItem key={category.name} disablePadding sx={{ mb: 2 }}>
                          <ListItemText
                            primary={category.name}
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2">${category.value}</Typography>
                                  <Typography variant="body2">
                                    {Math.round((category.value / budgetData.reduce((sum, cat) => sum + cat.value, 0)) * 100)}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={(category.value / budgetData.reduce((sum, cat) => sum + cat.value, 0)) * 100}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: `${category.color}30`,
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: category.color,
                                    },
                                  }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Adjust Budget
                </Button>
              </CardActions>
            </Card>
          )}

          {/* Recent Transactions */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Transactions
              </Typography>
              <List>
                {recentTransactions.map((transaction) => (
                  <ListItem key={transaction.id} divider>
                    <ListItemText
                      primary={transaction.name}
                      secondary={new Date(transaction.date).toLocaleDateString()}
                    />
                    <Typography
                      variant="body2"
                      color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                      fontWeight="bold"
                    >
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View All Transactions
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Upcoming Bills */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Upcoming Bills
              </Typography>
              <List>
                {upcomingBills.map((bill) => (
                  <ListItem key={bill.id} divider>
                    <ListItemText
                      primary={bill.name}
                      secondary={`Due: ${new Date(bill.dueDate).toLocaleDateString()}`}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      ${bill.amount.toLocaleString()}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View All Bills
              </Button>
            </CardActions>
          </Card>

          {/* ... other right column components ... */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
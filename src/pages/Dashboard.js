import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Avatar,
  useTheme,
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

// Sample data for charts
const spendingData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 900 },
  { name: 'Mar', amount: 1500 },
  { name: 'Apr', amount: 1000 },
  { name: 'May', amount: 800 },
  { name: 'Jun', amount: 1300 },
];

const budgetData = [
  { name: 'Housing', value: 1200, color: '#2E5077' },
  { name: 'Food', value: 500, color: '#4DA1A9' },
  { name: 'Transportation', value: 300, color: '#D8A47F' },
  { name: 'Entertainment', value: 200, color: '#EF6F6C' },
  { name: 'Other', value: 400, color: '#8D6A9F' },
];

// Sample upcoming bills
const upcomingBills = [
  { id: 1, name: 'Rent', amount: 1200, dueDate: '2023-06-01', paid: false },
  { id: 2, name: 'Electricity', amount: 85, dueDate: '2023-06-05', paid: false },
  { id: 3, name: 'Internet', amount: 65, dueDate: '2023-06-10', paid: false },
];

// Sample recent transactions
const recentTransactions = [
  { id: 1, name: 'Grocery Store', amount: -120, date: '2023-05-28' },
  { id: 2, name: 'Salary Deposit', amount: 3500, date: '2023-05-25' },
  { id: 3, name: 'Restaurant', amount: -45, date: '2023-05-24' },
  { id: 4, name: 'Gas Station', amount: -35, date: '2023-05-22' },
];

// Sample education articles
const educationArticles = [
  { id: 1, title: 'Understanding Credit Scores', category: 'Credit' },
  { id: 2, title: 'Investing Basics for Beginners', category: 'Investing' },
  { id: 3, title: 'How to Create a Budget', category: 'Budgeting' },
];

// Sample community posts
const communityPosts = [
  { id: 1, title: 'Tips for saving on groceries', author: 'SavingPro', replies: 12 },
  { id: 2, title: 'Best credit cards for travel', author: 'TravelBuff', replies: 8 },
  { id: 3, title: 'How I paid off my student loans', author: 'DebtFree', replies: 24 },
];

function Dashboard() {
  const theme = useTheme();

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
                $12,580
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
                $2,340
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Credit Score
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                745
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +12 points since last check
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Investments
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                $4,850
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +5.2% overall return
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
                                  {Math.round((category.value / 2600) * 100)}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={(category.value / 2600) * 100}
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

          {/* Recent Transactions */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Transactions
              </Typography>
              <List>
                {recentTransactions.map((transaction) => (
                  <ListItem key={transaction.id} disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: transaction.amount > 0 ? 'success.light' : 'error.light',
                          color: '#fff',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {transaction.amount > 0 ? <ArrowUpward /> : <ArrowDownward />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={transaction.name}
                      secondary={transaction.date}
                      sx={{ mr: 2 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: transaction.amount > 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
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
                  <ListItem key={bill.id} disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          color: '#fff',
                          width: 40,
                          height: 40,
                        }}
                      >
                        <CalendarToday />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={bill.name}
                      secondary={`Due: ${new Date(bill.dueDate).toLocaleDateString()}`}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      ${bill.amount}
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

          {/* Spare Change Investing */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Spare Change Investing
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  $247.35
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Invested from Spare Change
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +$12.40 (5.3%) return
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">This month's roundups:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  $34.25
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Manage Investments
              </Button>
            </CardActions>
          </Card>

          {/* Education & Community */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Learn & Connect
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <School sx={{ mr: 1, fontSize: 20 }} /> Latest Articles
              </Typography>
              <List dense>
                {educationArticles.map((article) => (
                  <ListItem key={article.id} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={article.title}
                      secondary={article.category}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Forum sx={{ mr: 1, fontSize: 20 }} /> Community Discussions
              </Typography>
              <List dense>
                {communityPosts.map((post) => (
                  <ListItem key={post.id} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={post.title}
                      secondary={`By ${post.author} • ${post.replies} replies`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Explore Education
              </Button>
              <Button size="small" color="primary">
                Join Community
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
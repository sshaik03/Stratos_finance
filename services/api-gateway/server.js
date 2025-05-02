const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Service routes
app.use('/api/users', createProxyMiddleware({ 
  target: 'http://user-service:8001',
  changeOrigin: true,
  pathRewrite: {'^/api/users': '/api/users'}
}));

app.use('/api/accounts', createProxyMiddleware({ 
  target: 'http://account-service:8002',
  changeOrigin: true,
  pathRewrite: {'^/api/accounts': '/api/accounts'}
}));

app.use('/api/transactions', createProxyMiddleware({ 
  target: 'http://transaction-service:8003',
  changeOrigin: true,
  pathRewrite: {'^/api/transactions': '/api/transactions'}
}));

app.use('/api/budgets', createProxyMiddleware({ 
  target: 'http://budget-service:8004',
  changeOrigin: true,
  pathRewrite: {'^/api/budgets': '/api/budgets'}
}));

app.use('/api/bills', createProxyMiddleware({ 
  target: 'http://bills-service:8005',
  changeOrigin: true,
  pathRewrite: {'^/api/bills': '/api/bills'}
}));

app.use('/api/investments', createProxyMiddleware({ 
  target: 'http://investment-service:8006',
  changeOrigin: true,
  pathRewrite: {'^/api/investments': '/api/investments'}
}));

app.use('/api/education', createProxyMiddleware({ 
  target: 'http://education-service:8007',
  changeOrigin: true,
  pathRewrite: {'^/api/education': '/api/education'}
}));

// Add new endpoints for specific features
app.use('/api/credit', createProxyMiddleware({ 
  target: 'http://user-service:8001',
  changeOrigin: true,
  pathRewrite: {'^/api/credit': '/api/credit'}
}));

app.use('/api/community', createProxyMiddleware({ 
  target: 'http://education-service:8007',
  changeOrigin: true,
  pathRewrite: {'^/api/community': '/api/community'}
}));

// Update the health check route to respond to root path as well

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

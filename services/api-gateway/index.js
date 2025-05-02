const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Configuration
const PORT = process.env.PORT || 8000;
const {
  USER_SERVICE_URL,
  FINANCIAL_SERVICE_URL,
  BILL_SERVICE_URL,
  CREDIT_SERVICE_URL,
  INVESTMENT_SERVICE_URL,
  COMMUNITY_SERVICE_URL,
  EDUCATION_SERVICE_URL
} = process.env;

// Logging
app.use(morgan('dev'));

// CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/users', createProxyMiddleware({
  target: USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api',
  },
}));

app.use('/api/finances', createProxyMiddleware({
  target: FINANCIAL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/finances': '/api',
  },
}));

app.use('/api/bills', createProxyMiddleware({
  target: BILL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/bills': '/api',
  },
}));

app.use('/api/credit', createProxyMiddleware({
  target: CREDIT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/credit': '/api',
  },
}));

app.use('/api/investments', createProxyMiddleware({
  target: INVESTMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/investments': '/api',
  },
}));

app.use('/api/community', createProxyMiddleware({
  target: COMMUNITY_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/community': '/api',
  },
}));

app.use('/api/education', createProxyMiddleware({
  target: EDUCATION_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/education': '/api',
  },
}));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
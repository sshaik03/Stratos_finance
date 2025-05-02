import axios from 'axios';
import { 
  mockBillsService, 
  mockTransactionService, 
  mockInvestmentService,
  mockBudgetService
} from './mockData';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use mock services for development
const USE_MOCK = true; // Set to false when your backend is ready

// User service
export const userService = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, userData) => api.put(`/users/${userId}`, userData),
};

// Account service
export const accountService = {
  getAccounts: (userId) => api.get('/accounts', { params: { userId } }),
  addAccount: (account) => api.post('/accounts', account),
  updateAccount: (accountId, data) => api.put(`/accounts/${accountId}`, data),
};

// Transaction service
export const transactionService = USE_MOCK 
  ? mockTransactionService 
  : {
      getTransactions: (userId) => api.get('/transactions', { params: { userId } }),
      addTransaction: (transaction) => api.post('/transactions', transaction),
    };

// Budget service
export const budgetService = USE_MOCK
  ? mockBudgetService
  : {
      getBudgets: (userId) => api.get('/budgets', { params: { userId } }),
      addBudget: (budget) => api.post('/budgets', budget),
      updateBudget: (budgetId, data) => api.put(`/budgets/${budgetId}`, data),
    };

// Bills service
export const billsService = USE_MOCK
  ? mockBillsService
  : {
      getBills: (userId) => api.get('/bills', { params: { userId } }),
      payBill: (billId) => api.post(`/bills/${billId}/pay`),
      addBill: (bill) => api.post('/bills', bill),
    };

// Investment service
export const investmentService = USE_MOCK
  ? mockInvestmentService
  : {
      getInvestments: (userId) => api.get('/investments', { params: { userId } }),
      addInvestment: (investment) => api.post('/investments', investment),
      updateInvestment: (investmentId, data) => api.put(`/investments/${investmentId}`, data),
    };

// Education service
export const educationService = {
  getArticles: () => api.get('/education/articles'),
  getArticle: (articleId) => api.get(`/education/articles/${articleId}`),
};

export default api;
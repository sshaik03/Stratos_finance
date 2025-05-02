import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import BillTracker from './pages/BillTracker';
import PaymentTracker from './pages/PaymentTracker';
import CreditScore from './pages/CreditScore';
import Investing from './pages/Investing';
import Community from './pages/Community';
import Education from './pages/Education';
import Settings from './pages/Settings';

// Components
import Layout from './components/Layout';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E5077', // Deep blue
    },
    secondary: {
      main: '#4DA1A9', // Teal
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bills" element={<BillTracker />} />
              <Route path="/payments" element={<PaymentTracker />} />
              <Route path="/credit" element={<CreditScore />} />
              <Route path="/investing" element={<Investing />} />
              <Route path="/community" element={<Community />} />
              <Route path="/education" element={<Education />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

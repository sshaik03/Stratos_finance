import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BillTracker from './pages/BillTracker';
import PaymentTracker from './pages/PaymentTracker';
import CreditScore from './pages/CreditScore';
import Investing from './pages/Investing';
import Community from './pages/Community';
import Education from './pages/Education';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  return (
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
  );
}

export default App;

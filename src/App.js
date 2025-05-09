import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BillTracker from './pages/BillTracker';
import PaymentTracker from './pages/PaymentTracker';
import Community from './pages/Community';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bills" element={<BillTracker />} />
          <Route path="/payments" element={<PaymentTracker />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

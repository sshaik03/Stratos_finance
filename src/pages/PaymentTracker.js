import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { Payments } from '@mui/icons-material';

function PaymentTracker() {
  return (
    <PagePlaceholder
      title="Payment Tracker"
      description="Monitor your payments and spending patterns to better manage your finances."
      icon={<Payments />}
    />
  );
}

export default PaymentTracker;
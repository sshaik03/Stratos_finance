import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { Receipt } from '@mui/icons-material';

function BillTracker() {
  return (
    <PagePlaceholder
      title="Bill Tracker"
      description="Track and manage all your bills in one place. Never miss a payment again."
      icon={<Receipt />}
    />
  );
}

export default BillTracker;
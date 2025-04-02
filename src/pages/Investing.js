import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { TrendingUp } from '@mui/icons-material';

function Investing() {
  return (
    <PagePlaceholder
      title="Spare Change Investing"
      description="Invest your spare change automatically and watch your investments grow over time."
      icon={<TrendingUp />}
    />
  );
}

export default Investing;
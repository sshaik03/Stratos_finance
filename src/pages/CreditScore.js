import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { CreditScore } from '@mui/icons-material';

function CreditScorePage() {
  return (
    <PagePlaceholder
      title="Credit Score"
      description="Monitor your credit score and get personalized tips to improve it."
      icon={<CreditScore />}
    />
  );
}

export default CreditScorePage;
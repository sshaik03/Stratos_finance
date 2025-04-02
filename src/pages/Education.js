import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { School } from '@mui/icons-material';

function Education() {
  return (
    <PagePlaceholder
      title="Financial Education"
      description="Learn about personal finance through articles, courses, and interactive tools."
      icon={<School />}
    />
  );
}

export default Education;
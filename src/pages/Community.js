import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { Forum } from '@mui/icons-material';

function Community() {
  return (
    <PagePlaceholder
      title="Community Forum"
      description="Connect with others, share tips, and learn from the community's financial wisdom."
      icon={<Forum />}
    />
  );
}

export default Community;
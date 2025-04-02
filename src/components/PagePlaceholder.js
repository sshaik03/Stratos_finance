import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

function PagePlaceholder({ title, description, icon }) {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {description}
      </Typography>
      
      <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
        <Box sx={{ fontSize: 80, color: 'primary.main', mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h5" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We're working on this feature and it will be available soon.
        </Typography>
        <Button variant="contained" color="primary">
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}

export default PagePlaceholder;
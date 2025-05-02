import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as BillIcon,
  Payment as PaymentIcon,
  CreditScore as CreditIcon,
  TrendingUp as InvestingIcon,
  Forum as CommunityIcon,
  School as EducationIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Bill Tracker', icon: <BillIcon />, path: '/bills' },
    { text: 'Payment Tracker', icon: <PaymentIcon />, path: '/payments' },
    { text: 'Credit Score', icon: <CreditIcon />, path: '/credit' },
    { text: 'Investing', icon: <InvestingIcon />, path: '/investing' },
    { text: 'Community', icon: <CommunityIcon />, path: '/community' },
    { text: 'Education', icon: <EducationIcon />, path: '/education' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  return (
    <Box sx={{ width: 240, flexShrink: 0 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
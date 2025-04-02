import React from 'react';
import PagePlaceholder from '../components/PagePlaceholder';
import { Settings as SettingsIcon } from '@mui/icons-material';

function Settings() {
  return (
    <PagePlaceholder
      title="Account Settings"
      description="Manage your account preferences, notifications, and security settings."
      icon={<SettingsIcon />}
    />
  );
}

export default Settings;
import React from 'react';
import { Switch, Typography } from '@mui/material';

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant="h6">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </Typography>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
    </div>
  );
}

export default DarkModeToggle;

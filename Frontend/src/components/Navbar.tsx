import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Switch, FormControlLabel } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DarkMode, LightMode } from '@mui/icons-material';


interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme }) => {


  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          AI Recommender
        </Typography>

        {/* Links + Theme Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit">Home</Button>
          <Button component={RouterLink} to="/polls" color="inherit">Polls</Button>
          <Button component={RouterLink} to="/questionnaire" color="inherit">Preferences</Button>
          <Button component={RouterLink} to="/recommendations" color="inherit">Recommendations</Button>
          <Button component={RouterLink} to="/admin" color="inherit">Admin</Button>

          {/* Dark Mode Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={onToggleTheme}
                color="default"
              />
            }
            label={darkMode ? <DarkMode /> : <LightMode />}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


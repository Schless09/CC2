'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

// Create a theme instance and set the primary color to green
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fcb001',
    },
  },
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;

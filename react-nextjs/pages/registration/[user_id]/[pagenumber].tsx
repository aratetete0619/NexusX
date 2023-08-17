import React, { useState } from 'react';
import Map from '../../../src/components/Map';
import MainLayout from '../../../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const RegistrationPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <Map />
      </MainLayout>
    </ThemeProvider>
  );
};

export default RegistrationPage;

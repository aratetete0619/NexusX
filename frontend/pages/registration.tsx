import React, { useState } from 'react';
import '../src/styles/App.css';
import Map from '../src/components/Map';
import MainLayout from '../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from '../src/components/Sidebar'


const RegistrationPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <Sidebar toggleSidebar={toggleSidebar} />
        <Map />
      </MainLayout>
    </ThemeProvider>
  );
};

export default RegistrationPage;

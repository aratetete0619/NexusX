import React, { useState } from 'react';
import LoginHeader from '../LoginHeader';
import Sidebar from '../Sidebar';
import ClosedSidebar from '../ClosedSidebar';


const MainLayout: React.FC = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <LoginHeader />
      {isSidebarOpen ? <Sidebar toggleSidebar={toggleSidebar} /> : <ClosedSidebar toggleSidebar={toggleSidebar} />}
      {children}
    </div>
  );
};

export default MainLayout;

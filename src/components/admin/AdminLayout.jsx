import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

const AdminLayout = () => {
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
  };

  const contentStyle = {
    marginLeft: '250px', // Matches the width of the sidebar
    padding: '20px',
    width: '100%',
    backgroundColor: '#ecf0f1',
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <Sidebar />
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

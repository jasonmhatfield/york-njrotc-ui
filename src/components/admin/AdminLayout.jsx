import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

const AdminLayout = () => {
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  };

  const contentStyle = {
    marginLeft: '250px',
    flexGrow: 1,
    padding: '80px 30px 30px',
    overflowY: 'auto',
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <Sidebar />
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
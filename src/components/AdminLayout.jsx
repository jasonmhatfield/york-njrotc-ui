import React from 'react';
import { Outlet } from 'react-router-dom';
// import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Outlet />
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import './AdminHeader.component.css'; // Import CSS for styling

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage or any relevant authentication details
    sessionStorage.clear();

    // Redirect to the home page
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-header-title">NJROTC Admin Dashboard</h1>
      </div>
      <div className="admin-header-right">
        <button className="admin-header-logout-button" onClick={handleLogout}>
          <Logout />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

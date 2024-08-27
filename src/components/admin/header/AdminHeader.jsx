import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed
import './AdminHeader.component.css'; // Import CSS for styling

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Use the context logout to handle token removal and state update
    navigate('/'); // Redirect to the home page after logout
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

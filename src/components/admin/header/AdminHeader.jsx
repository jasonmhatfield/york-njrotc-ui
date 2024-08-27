import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './AdminHeader.component.css';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
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

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#2c5282',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const navLinkStyle = {
    marginLeft: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: 0.8,
    },
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const profilePicStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    objectFit: 'cover',
  };

  return (
    <header style={headerStyle}>
      <Link to="/admin" style={logoStyle}>
        NJROTC Admin
      </Link>
      <nav style={navStyle}>
        <Link to="/admin" style={navLinkStyle}>Dashboard</Link>
        <Link to="/" style={navLinkStyle}>Public Site</Link>
        <div style={profileStyle}>
          {/*<img src="/path-to-profile-pic.jpg" alt="Profile" style={profilePicStyle} />*/}
          <span>Admin User</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#3f51b5',
    color: '#fff',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  };

  const navLinkStyle = {
    marginLeft: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  const profileMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
  };

  const profilePicStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/admin" style={logoStyle}>
          NJROTC Admin
        </Link>
      </div>
      <div>
        <Link to="/admin" style={navLinkStyle}>Dashboard</Link>
        <Link to="/" style={navLinkStyle}>Public Site</Link>
        <div style={profileMenuStyle}>
          <img src="/path-to-profile-pic.jpg" alt="Profile" style={profilePicStyle} />
          {/* Dropdown menu items could be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;

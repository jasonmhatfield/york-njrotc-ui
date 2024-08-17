import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#1a202c',
    color: '#fff',
    height: '100vh',
    padding: '20px 10px',
    position: 'fixed',
    left: 0,
    top: 0,
    overflowY: 'auto',
  };

  const navStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const navItemStyle = {
    marginBottom: '10px',
  };

  const navLinkStyle = (isActive) => ({
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: isActive ? '#2d3748' : 'transparent',
    '&:hover': {
      backgroundColor: '#2d3748',
    },
  });

  const iconStyle = {
    marginRight: '10px',
    fontSize: '1.2rem',
  };

  const navItems = [
    { path: '/admin', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin/cadets', icon: 'fas fa-user-graduate', label: 'Manage Cadets' },
    { path: '/admin/awards', icon: 'fas fa-medal', label: 'Manage Awards' },
    { path: '/admin/events', icon: 'fas fa-calendar-alt', label: 'Manage Events' },
    { path: '/admin/units', icon: 'fas fa-building', label: 'Manage Units' },
    { path: '/admin/family', icon: 'fas fa-users', label: 'Manage Family Members' },
    { path: '/admin/ranks', icon: 'fas fa-chevron-up', label: 'Manage Ranks' },
  ];

  return (
    <aside style={sidebarStyle}>
      <nav>
        <ul style={navStyle}>
          {navItems.map((item) => (
            <li key={item.path} style={navItemStyle}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                <i className={item.icon} style={iconStyle}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    height: '100vh',
    padding: '20px 10px',
    position: 'fixed',
  };

  const navStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const navItemStyle = {
    marginBottom: '15px',
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    display: 'block',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const activeLinkStyle = {
    backgroundColor: '#34495e',
  };

  return (
    <aside style={sidebarStyle}>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>
            <NavLink to="/admin" end style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/cadets" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-user-graduate"></i> Manage Cadets
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/awards" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-medal"></i> Manage Awards
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/events" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-calendar-alt"></i> Manage Events
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/units" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-building"></i> Manage Units
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/family" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-users"></i> Manage Family Members
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/admin/ranks" style={navLinkStyle} activeStyle={activeLinkStyle}>
              <i className="fas fa-chevron-up"></i> Manage Ranks
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

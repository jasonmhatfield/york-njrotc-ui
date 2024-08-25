import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import anchorLogo from '../assets/images/anchor-logo.png';
import '../styles/Header.component.css'; // Import the CSS file

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-container">
          <img src={anchorLogo} alt="Anchor Logo" className="logo" />
        </div>
        <div className="title-nav-container">
          <h1 className="title">York Comprehensive High School NJROTC</h1>
          <nav>
            <ul className={`header-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                  onClick={handlePageChange}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                  onClick={handlePageChange}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                  onClick={handlePageChange}
                >
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cadet-staff"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                  onClick={handlePageChange}
                >
                  Cadet Staff
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quarterdeck"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                  onClick={handlePageChange}
                >
                  Quarterdeck
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

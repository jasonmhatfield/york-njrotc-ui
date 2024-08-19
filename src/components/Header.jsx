import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import anchorLogo from '../assets/images/anchor-logo.png';

const styles = {
  headerContainer: {
    color: '#fff',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#00264d',
    padding: '10px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    width: '100%',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '100px',
    padding: '0 20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '80%',
    maxHeight: '60px',
  },
  titleNavContainer: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    margin: '0.5rem 0',
    color: 'gold',
    textAlign: 'center',
  },
  headerMenu: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    padding: '8px 20px',
    transition: 'color 0.3s, background-color 0.3s, transform 0.3s ease',
    borderRadius: '5px',
    backgroundColor: '#1e3c72',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  },
  navLinkActive: {
    backgroundColor: '#ffd700',
    color: '#1e3c72',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  mobileMenuButton: {
    display: 'none',
    backgroundColor: '#1e3c72',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    margin: '10px 0',
    width: '100%',
  },
  mobileMenuOpen: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#00264d',
    position: 'absolute',
    top: '100%',
    left: 0,
    padding: '10px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
  },
  '@media (max-width: 575px)': {
    headerContent: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    },
    title: {
      marginBottom: '20px',
    },
    headerMenu: {
      display: 'none',
    },
    dropdown: {
      display: 'block',
    },
    mobileMenuButton: {
      display: 'block',
    },
    logo: {
      display: 'hidden',
    },
  }
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setIsMobileMenuOpen(false);
    navigate(page);
  };

  return (
    <header style={styles.headerContainer}>
      <div style={styles.headerContent}>
        <div style={styles.logoContainer}>
          <img src={anchorLogo} alt="Anchor Logo" style={styles.logo} />
        </div>
        <div style={styles.titleNavContainer}>
          <h1 style={styles.title}>York Comprehensive High School NJROTC</h1>
          <nav>
            <ul style={{ ...styles.headerMenu, display: isMobileMenuOpen ? 'none' : 'flex' }}>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cadet-staff"
                  style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                  Cadet Staff
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quarterdeck"
                  style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                  Quarterdeck
                </NavLink>
              </li>
            </ul>
          </nav>
          <button
            style={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {isMobileMenuOpen && (
            <div style={styles.mobileNav}>
              <NavLink
                to="/"
                style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                onClick={() => handlePageChange('/')}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                onClick={() => handlePageChange('/about')}
              >
                About
              </NavLink>
              <NavLink
                to="/calendar"
                style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                onClick={() => handlePageChange('/calendar')}
              >
                Calendar
              </NavLink>
              <NavLink
                to="/cadet-staff"
                style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                onClick={() => handlePageChange('/cadet-staff')}
              >
                Cadet Staff
              </NavLink>
              <NavLink
                to="/quarterdeck"
                style={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                onClick={() => handlePageChange('/quarterdeck')}
              >
                Quarterdeck
              </NavLink>
            </div>
          )}
        </div>
        <div style={styles.logoContainer}>
          <img src={anchorLogo} alt="Anchor Logo" style={styles.logo} />
        </div>
      </div>
    </header>
  );
};

export default Header;

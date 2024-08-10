import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isCadetResourcesOpen, setIsCadetResourcesOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(window.location.pathname);

  const toggleCadetResources = () => {
    setIsCadetResourcesOpen(!isCadetResourcesOpen);
  };

  const closeCadetResources = () => {
    setIsCadetResourcesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cadet-resources') && isCadetResourcesOpen) {
        closeCadetResources();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCadetResourcesOpen]);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    window.location.href = page;
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-container left">
          <img src='/images/anchor-logo.png' alt="Anchor Logo" className="logo" />
        </div>
        <div className="title-nav-container">
          <h1 className="title">York Comprehensive High School NJROTC</h1>
          <nav>
            <ul className="header-menu">
              <li>
                <NavLink to="/" exact activeClassName="active" onClick={() => handlePageChange('/')}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active" onClick={() => handlePageChange('/about')}>About</NavLink>
              </li>
              <li>
                <NavLink to="/calendar" activeClassName="active" onClick={() => handlePageChange('/calendar')}>Calendar</NavLink>
              </li>
              <li>
                <NavLink to="/cadet-staff" activeClassName="active" onClick={() => handlePageChange('/cadet-staff')}>Cadet Staff</NavLink>
              </li>
              <li>
                <NavLink to="/quarterdeck" activeClassName="active" onClick={() => handlePageChange('/quarterdeck')}>Quarterdeck</NavLink>
              </li>
              {/* Hiding the entire Cadet Resources button and dropdown */}
              {/* <li className="cadet-resources">
                <button onClick={toggleCadetResources}>Cadet Resources</button>
                {isCadetResourcesOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-menu-item">
                      <NavLink to="/pqs" activeClassName="active" onClick={() => handlePageChange('/pqs')}>PQS</NavLink>
                      <NavLink to="/ribbon-checker" activeClassName="active" onClick={() => handlePageChange('/ribbon-checker')}>Ribbon Checker</NavLink>
                    </li>
                  </ul>
                )}
              </li> */}
            </ul>
          </nav>
          <div className="dropdown">
            <select value={selectedPage} onChange={(event) => handlePageChange(event.target.value)}>
              <option value="/">Home</option>
              <option value="/about">About</option>
              <option value="/calendar">Calendar</option>
              <option value="/cadet-staff">Cadet Staff</option>
              <option value="/quarterdeck">Quarterdeck</option>
              {/* Hiding the Cadet Resources options */}
              {/* <option value="/pqs">PQS</option> */}
            </select>
          </div>
        </div>
        <div className="logo-container right">
          <img src='/images/anchor-logo.png' alt="Anchor Logo" className="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isCadetResourcesOpen, setIsCadetResourcesOpen] = useState(false);

  const toggleCadetResources = () => {
    setIsCadetResourcesOpen(!isCadetResourcesOpen);
  };

  const closeCadetResources = () => {
    setIsCadetResourcesOpen(false);
  };

  const handleDropdownChange = (event) => {
    setCurrentPage(event.target.value);
    closeCadetResources();
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
                <button className={currentPage === 'home' ? 'active' : ''} onClick={() => { setCurrentPage('home'); closeCadetResources(); }}>Home</button>
              </li>
              <li>
                <button className={currentPage === 'about' ? 'active' : ''} onClick={() => { setCurrentPage('about'); closeCadetResources(); }}>About</button>
              </li>
              <li>
                <button className={currentPage === 'calendar' ? 'active' : ''} onClick={() => { setCurrentPage('calendar'); closeCadetResources(); }}>Calendar</button>
              </li>
              <li>
                <button className={currentPage === 'cadet-staff' ? 'active' : ''} onClick={() => { setCurrentPage('cadet-staff'); closeCadetResources(); }}>Cadet Staff</button>
              </li>
              <li className="cadet-resources">
                <button onClick={toggleCadetResources}>Cadet Resources</button>
                {isCadetResourcesOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-menu-item">
                      <button className={currentPage === 'pqs' ? 'active' : ''} onClick={() => { setCurrentPage('pqs'); closeCadetResources(); }}>PQS</button>
                      <button className={currentPage === 'ribbon-checker' ? 'active' : ''} onClick={() => { setCurrentPage('ribbon-checker'); closeCadetResources(); }}>Ribbon Checker</button>
                    </li>
                    {/* Add more items here if needed */}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          <div className="dropdown">
            <select onChange={handleDropdownChange} value={currentPage}>
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="calendar">Calendar</option>
              <option value="cadet-staff">Cadet Staff</option>
              <option value="ribbon-checker">Ribbon Checker</option>
              <option value={"pqs"}>PQS</option>
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

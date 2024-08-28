import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaCalendarAlt, FaUserFriends, FaBook } from 'react-icons/fa';
import './Header.component.css';
import anchorLogo from '../../assets/images/anchor-logo.png';

const Header = ({ onMonthSelect }) => {
  const navigate = useNavigate();
  const months = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() + i);
    return month.toLocaleString('en-US', { month: 'long' });
  });

  const handleMonthClick = (month) => {
    navigate('/calendar');
    onMonthSelect(month);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-container">
          <img src={anchorLogo} alt="York NJROTC logo" className="logo" />
        </div>
        <div className="title-and-nav-container">
          <div className="title-container">
            <span className="title">York Comprehensive High School NJROTC</span>
          </div>
          <nav className="nav-container">
            <ul className="header-menu">
              <li>
                <NavLink to="/" className="nav-link" activeClassName="nav-link-active">
                  <FaHome className="icon" /> <span className="link-text">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav-link" activeClassName="nav-link-active">
                  <FaInfoCircle className="icon" /> <span className="link-text">About</span>
                </NavLink>
              </li>
              <li className="nav-link-dropdown">
                <div className="nav-link">
                  <FaCalendarAlt className="icon" /> <span className="link-text">Calendar</span>
                </div>
                <ul className="dropdown-content">
                  {months.map((month, index) => (
                    <li key={index}>
                      <button className="dropdown-item" onClick={() => handleMonthClick(month)}>
                        {month}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <NavLink to="/cadet-staff" className="nav-link" activeClassName="nav-link-active">
                  <FaUserFriends className="icon" /> <span className="link-text">Cadet Staff</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/quarterdeck" className="nav-link" activeClassName="nav-link-active">
                  <FaBook className="icon" /> <span className="link-text">Quarterdeck</span>
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
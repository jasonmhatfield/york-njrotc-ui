import React, { useState, useEffect, useRef } from 'react';
import { People, Logout } from '@mui/icons-material';
import ManageCadets from './ManageCadets/ManageCadets';
import './styles/AdminDashboard.component.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Cadets');
  const [cadetData, setCadetData] = useState([]);
  const dashboardRef = useRef(null);

  useEffect(() => {
    // Function to fetch cadet data from the API
    const fetchCadetData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cadets');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCadetData(data); // Store fetched cadet data in state
      } catch (error) {
        console.error('Error fetching cadet data:', error);
      }
    };

    fetchCadetData(); // Call the function to fetch data on component mount

    const adjustHeight = () => {
      if (dashboardRef.current) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        dashboardRef.current.style.height = `${windowHeight - headerHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const menuItems = [
    { name: 'Cadets', icon: <People /> },
    // { name: 'Events', icon: <Event /> },
    // { name: 'Unit Info', icon: <Info /> },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Cadets':
        return <ManageCadets cadetData={cadetData} />; // Pass cadet data as props
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard" ref={dashboardRef}>
      <div className="admin-dashboard-sidebar">
        <div className="admin-dashboard-logo">NJROTC Admin</div>
        <nav className="admin-dashboard-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`admin-dashboard-menu-item ${activeSection === item.name ? 'active' : ''}`}
              onClick={() => setActiveSection(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <button className="admin-dashboard-logout-button">
          <Logout /> Logout
        </button>
      </div>
      <main className="admin-dashboard-content">
        <div className="admin-dashboard-content-body">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

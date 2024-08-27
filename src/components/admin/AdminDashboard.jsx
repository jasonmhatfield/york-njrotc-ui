import React, { useState, useEffect, useRef } from 'react';
import { People } from '@mui/icons-material';
import ManageCadets from './ManageCadets';
import './styles/AdminDashboard.component.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Cadets');
  const [cadetData, setCadetData] = useState([]);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchCadetData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cadets');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCadetData(data);
      } catch (error) {
        console.error('Error fetching cadet data:', error);
        // Optionally, set an error state or display a notification to the user
      }
    };

    const adjustHeight = () => {
      if (dashboardRef.current) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        dashboardRef.current.style.height = `${window.innerHeight - headerHeight}px`;
      }
    };

    fetchCadetData();
    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const menuItems = [
    { name: 'Cadets', icon: <People /> }
    // Add more menu items here as needed
  ];

  return (
    <div className="admin-dashboard" ref={dashboardRef}>
      <div className="admin-dashboard-sidebar">
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
      </div>
      <main className="admin-dashboard-content">
        <div className="admin-dashboard-content-body">
          {activeSection === 'Cadets' && <ManageCadets cadetData={cadetData} />}
          {/* Add more sections here as needed */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

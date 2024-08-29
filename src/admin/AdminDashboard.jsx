import React, { useState, useEffect, useRef } from 'react';
import { People } from '@mui/icons-material';
import ManageCadets from './ManageCadets';
import './styles/AdminDashboard.component.css';
import { useAuth } from './context/AuthContext';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Cadets');
  const [cadetData, setCadetData] = useState([]);
  const dashboardRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCadetData = async () => {
      if (!isAuthenticated) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/cadets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCadetData(data);
      } catch (error) {
        console.error('Error fetching cadet data:', error);
      }
    };
    fetchCadetData();
  }, [isAuthenticated, API_BASE_URL]);

  useEffect(() => {
    const adjustHeight = () => {
      if (dashboardRef.current) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        dashboardRef.current.style.height = `${window.innerHeight - headerHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const menuItems = [
    { name: 'Cadets', icon: <People /> }
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardStyle = {
    padding: '20px',
  };

  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#2d3748',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2d3748',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  };

  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '10px',
  };

  const cards = [
    { title: 'Manage Cadets', path: '/admin/cadets', icon: 'fas fa-user-graduate' },
    { title: 'Manage Awards', path: '/admin/awards', icon: 'fas fa-medal' },
    { title: 'Manage Events', path: '/admin/events', icon: 'fas fa-calendar-alt' },
    { title: 'Manage Units', path: '/admin/units', icon: 'fas fa-building' },
    { title: 'Manage Family Members', path: '/admin/family', icon: 'fas fa-users' },
    { title: 'Manage Ranks', path: '/admin/ranks', icon: 'fas fa-chevron-up' },
  ];

  return (
    <div style={dashboardStyle}>
      <h1 style={headerStyle}>Admin Dashboard</h1>
      <p>Welcome to the NJROTC Admin Dashboard. Click on a card to manage the respective entity.</p>
      <div style={cardContainerStyle}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={cardStyle}
            onClick={() => navigate(card.path)}
          >
            <i className={card.icon} style={iconStyle}></i>
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';

const Dashboard = () => {
  const dashboardStyle = {
    padding: '20px',
  };

  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#2c3e50',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#34495e',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={headerStyle}>Admin Dashboard</h1>
      <p>Welcome to the NJROTC Admin Dashboard! Use the sidebar to manage cadets, awards, events, and more.</p>
      <div style={cardContainerStyle}>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Cadets
        </div>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Awards
        </div>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Events
        </div>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Units
        </div>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Family Members
        </div>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Manage Ranks
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

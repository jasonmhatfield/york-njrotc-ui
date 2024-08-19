import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ title, imageUrl, link }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        ...styles.eventCard,
        backgroundImage: `url(${imageUrl})`,
      }}
      onClick={() => navigate(link)}
    >
      <div style={styles.eventCardOverlay}>
        <h3 style={styles.title}>{title}</h3>
      </div>
    </div>
  );
};

export default EventCard;

const styles = {
  eventCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '900px',
    marginBottom: '10px',
  },
  eventCardOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '8px',
    width: '200px',
    maxHeight: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    color: '#ffd700',
    textShadow: '1px 1px 2px #000',
  },
};

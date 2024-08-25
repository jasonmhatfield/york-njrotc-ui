import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCard.component.css'; // Import the CSS file

const EventCard = ({ title, imageUrl, link }) => {
  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => navigate(link)}
    >
      <div className="event-card-overlay">
        <h3 className="event-title">{title}</h3>
      </div>
    </div>
  );
};

export default EventCard;

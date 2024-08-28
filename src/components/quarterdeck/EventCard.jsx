import React from 'react';

const EventCard = ({ title, imageUrl, link }) => (
  <div className="event-card" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div className="event-card-overlay">
      <h3 className="event-title">{title}</h3>
    </div>
  </div>
);

export default EventCard;

import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({title, imageUrl, link}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className = "event-card"
        style = {{backgroundImage: `url(${imageUrl})`}}
        onClick = {() => navigate(link)}
      >
        <div className = "event-card-overlay">
          <h3>{title}</h3>
        </div>
      </div>
    </>
  );
};

export default EventCard;

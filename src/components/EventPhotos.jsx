import React, { useState } from 'react';
import '../../styles/EventPage.css';
import {useNavigate} from "react-router-dom"; // Ensure the correct path for your CSS

const EventPhotos = ({ eventTitle, eventDays }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (imageSrc) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);
  const handleBackToDaysClick = () => setSelectedDay(null);
  const handleBackToDeckLogClick = () => navigate('/quarterdeck');

  const sortedEventDays = Object.keys(eventDays).sort((a, b) => a - b);

  return (
    <div className="event-page-container">
      <div className="navigation-buttons">
        <button onClick={handleBackToDeckLogClick}>Back to Deck Log</button>
      </div>
      <h2>{eventTitle}</h2>
      <div className="navigation-buttons">
        {selectedDay ? (
          <button onClick={handleBackToDaysClick}>Back to Event Days</button>
        ) : (
          sortedEventDays.map((day) => (
            <button key={day} onClick={() => setSelectedDay(day)}>
              {`${eventTitle} ${day} - ${eventDays[day].title}`}
            </button>
          ))
        )}
      </div>

      {selectedDay && (
        <div className="event-images-container">
          {eventDays[selectedDay].images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="event-image"
              onClick={() => handleImageClick(image.src)}
            />
          ))}
        </div>
      )}

      {modalImage && (
        <div className="modal show" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Modal View" />
            <button className="close-modal" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPhotos;

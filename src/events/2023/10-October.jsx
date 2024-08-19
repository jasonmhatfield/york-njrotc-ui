import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/events.css';

const October2023 = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const events = {
    "06": {
      title: "YCHS Homecoming Football Game",
      images: [
        { src: "/images/events/2023/10-October/06/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/10-October/06/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/10-October/06/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/10-October/06/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/10-October/06/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/10-October/06/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/10-October/06/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/10-October/06/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/10-October/06/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/10-October/06/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/10-October/06/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/10-October/06/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/10-October/06/13.jpg", alt: "Event Title - Image 13" },
      ]
    },
    "13": {
      title: "Winthrop University Soccer Game",
      images: [
        { src: "/images/events/2023/10-October/13/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/10-October/13/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/10-October/13/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/10-October/13/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/10-October/13/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/10-October/13/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/10-October/13/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/10-October/13/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/10-October/13/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/10-October/13/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/10-October/13/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/10-October/13/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/10-October/13/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/10-October/13/14.jpg", alt: "Event Title - Image 14" },
      ]
    },
    "21": {
      title: "Charlotte FC Soccer Game at Bank of America Stadium",
      images: [
        { src: "/images/events/2023/10-October/21/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/10-October/21/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/10-October/21/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/10-October/21/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/10-October/21/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/10-October/21/06.png", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/10-October/21/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/10-October/21/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/10-October/21/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/10-October/21/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/10-October/21/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/10-October/21/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/10-October/21/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/10-October/21/14.jpg", alt: "Event Title - Image 14" },
      ]
    },
  };

  useEffect(() => {
    const totalImages = Object.values(events)
      .flatMap(event => event.images)
      .filter(image => !image.src.endsWith('.mp4')).length;

    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        setImagesLoaded(true);
      }
    };

    Object.values(events).forEach(event => {
      event.images.forEach(image => {
        if (!image.src.endsWith('.mp4')) {
          const img = new Image();
          img.src = image.src;
          img.onload = handleImageLoad;
        }
      });
    });
  });

  const sortedEventDays = Object.keys(events).sort((a, b) => a - b);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleBackToDaysClick = () => {
    setSelectedDay(null);
  };

  const handleBackToDeckLogClick = () => {
    navigate('/quarterdeck');
  };

  return (
    <div className="event-page-container">
      {!imagesLoaded && <div className="loading">Loading...</div>}
      {imagesLoaded && (
        <>
          <div className="navigation-buttons">
            <button onClick={handleBackToDeckLogClick}>
              Back to Deck Log
            </button>
          </div>
          <h2>October 2023 Events</h2>
          <div className="navigation-buttons">
            {selectedDay ? (
              <button onClick={handleBackToDaysClick}>
                Back to October Events
              </button>
            ) : (
              sortedEventDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                >
                  {`October ${day} - ${events[day].title}`}
                </button>
              ))
            )}
          </div>

          {selectedDay && (
            <div className="event-images-container">
              {events[selectedDay].images.map((image, index) => (
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
        </>
      )}
    </div>
  );
};

export default October2023;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/events.css';

const August2023 = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const events = {
    "01": {
      title: "York School District 1 Convocation",
      images: [
        { src: "/images/events/2023/08-August/01/01.jpg", alt: "York School District 1 Convocation - Image 1" },
        { src: "/images/events/2023/08-August/01/02.jpg", alt: "York School District 1 Convocation - Image 2" },
        { src: "/images/events/2023/08-August/01/03.jpg", alt: "York School District 1 Convocation - Image 3" },
        { src: "/images/events/2023/08-August/01/04.jpg", alt: "York School District 1 Convocation - Image 4" },
      ]
    },
    "02": {
      title: "Greenville Drive Baseball Game",
      images: [
        { src: "/images/events/2023/08-August/02/01.jpg", alt: "Greenville Drive Baseball Game - Image 1" },
        { src: "/images/events/2023/08-August/02/02.jpg", alt: "Greenville Drive Baseball Game - Image 2" },
        { src: "/images/events/2023/08-August/02/03.jpg", alt: "Greenville Drive Baseball Game - Image 3" },
        { src: "/images/events/2023/08-August/02/04.jpg", alt: "Greenville Drive Baseball Game - Image 4" },
        { src: "/images/events/2023/08-August/02/05.jpg", alt: "Greenville Drive Baseball Game - Image 5" },
      ]
    },
    "12": {
      title: "Charlotte Independence Soccer Game",
      images: [
        { src: "/images/events/2023/08-August/12/01.jpg", alt: "Charlotte Independence Soccer Game - Image 1" },
        { src: "/images/events/2023/08-August/12/02.jpg", alt: "Charlotte Independence Soccer Game - Image 2" },
        { src: "/images/events/2023/08-August/12/03.jpg", alt: "Charlotte Independence Soccer Game - Image 3" },
      ]
    },
    "19": {
      title: "Charlotte Monster Truck Bash",
      images: [
        { src: "/images/events/2023/08-August/19/01.jpg", alt: "Charlotte Monster Truck Bash - Image 1" },
        { src: "/images/events/2023/08-August/19/02.jpg", alt: "Charlotte Monster Truck Bash - Image 2" },
      ]
    },
    "26": {
      title: "York Summerfest",
      images: [
        { src: "/images/events/2023/08-August/26/01.jpg", alt: "York Summerfest - Image 1" },
        { src: "/images/events/2023/08-August/26/02.jpg", alt: "York Summerfest - Image 2" },
        { src: "/images/events/2023/08-August/26/03.jpg", alt: "York Summerfest - Image 3" },
        { src: "/images/events/2023/08-August/26/04.jpg", alt: "York Summerfest - Image 4" },
        { src: "/images/events/2023/08-August/26/05.jpg", alt: "York Summerfest - Image 5" },
        { src: "/images/events/2023/08-August/26/06.jpg", alt: "York Summerfest - Image 6" },
        { src: "/images/events/2023/08-August/26/07.jpg", alt: "York Summerfest - Image 7" },
        { src: "/images/events/2023/08-August/26/08.jpg", alt: "York Summerfest - Image 8" },
        { src: "/images/events/2023/08-August/26/09.jpg", alt: "York Summerfest - Image 9" },
        // { src: "/images/events/2023/08-August/26/10.mp4", alt: "York Summerfest - Video 10" },
        // { src: "/images/events/2023/08-August/26/11.mp4", alt: "York Summerfest - Video 11" },
        { src: "/images/events/2023/08-August/26/12.jpg", alt: "York Summerfest - Image 12" },
        { src: "/images/events/2023/08-August/26/13.jpg", alt: "York Summerfest - Image 13" },
        { src: "/images/events/2023/08-August/26/14.jpg", alt: "York Summerfest - Image 14" },
        { src: "/images/events/2023/08-August/26/15.jpg", alt: "York Summerfest - Image 15" },
        { src: "/images/events/2023/08-August/26/16.jpg", alt: "York Summerfest - Image 16" },
        { src: "/images/events/2023/08-August/26/17.jpg", alt: "York Summerfest - Image 17" },
        { src: "/images/events/2023/08-August/26/18.jpg", alt: "York Summerfest - Image 18" },
        { src: "/images/events/2023/08-August/26/19.jpg", alt: "York Summerfest - Image 19" },
        // { src: "/images/events/2023/08-August/26/20.mp4", alt: "York Summerfest - Video 20" },
        // { src: "/images/events/2023/08-August/26/21.mp4", alt: "York Summerfest - Video 21" },
        { src: "/images/events/2023/08-August/26/22.jpg", alt: "York Summerfest - Image 22" },
        { src: "/images/events/2023/08-August/26/23.jpg", alt: "York Summerfest - Image 23" },
        { src: "/images/events/2023/08-August/26/24.jpg", alt: "York Summerfest - Image 24" },
        { src: "/images/events/2023/08-August/26/25.jpg", alt: "York Summerfest - Image 25" },
        { src: "/images/events/2023/08-August/26/26.jpg", alt: "York Summerfest - Image 26" },
        { src: "/images/events/2023/08-August/26/27.jpg", alt: "York Summerfest - Image 27" },
        { src: "/images/events/2023/08-August/26/28.jpg", alt: "York Summerfest - Image 28" },
        { src: "/images/events/2023/08-August/26/29.jpg", alt: "York Summerfest - Image 29" },
        { src: "/images/events/2023/08-August/26/30.jpg", alt: "York Summerfest - Image 30" },
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
          <h2>August 2023 Events</h2>
          <div className="navigation-buttons">
            {selectedDay ? (
              <button onClick={handleBackToDaysClick}>
                Back to August Events
              </button>
            ) : (
              sortedEventDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                >
                  {`August ${day} - ${events[day].title}`}
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

export default August2023;

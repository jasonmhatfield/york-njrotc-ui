import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/events.css';

const September2023 = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const events = {
    "02": {
      title: "Duke's Mayo Classic Football Game at BoA Stadium",
      images: [
        { src: "/images/events/2023/09-September/02/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/09-September/02/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/09-September/02/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/09-September/02/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/09-September/02/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/09-September/02/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/09-September/02/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/09-September/02/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/09-September/02/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/09-September/02/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/09-September/02/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/09-September/02/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/09-September/02/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/09-September/02/14.jpg", alt: "Event Title - Image 14" },
      ]
    },
    "15": {
      title: "Geedunk Bar",
      images: [
        { src: "/images/events/2023/09-September/15/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/09-September/15/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/09-September/15/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/09-September/15/04.jpg", alt: "Event Title - Image 4" },
      ]
    },
    "23-1": {
      title: "York National Night Out",
      images: [
        { src: "/images/events/2023/09-September/23-1/05.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/09-September/23-1/06.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/09-September/23-1/07.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/09-September/23-1/08.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/09-September/23-1/09.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/09-September/23-1/10.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/09-September/23-1/11.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/09-September/23-1/12.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/09-September/23-1/13.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/09-September/23-1/14.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/09-September/23-1/15.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/09-September/23-1/16.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/09-September/23-1/17.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/09-September/23-1/18.jpg", alt: "Event Title - Image 14" },
        { src: "/images/events/2023/09-September/23-1/19.jpg", alt: "Event Title - Image 15" },
        { src: "/images/events/2023/09-September/23-1/20.jpg", alt: "Event Title - Image 16" },
        { src: "/images/events/2023/09-September/23-1/21.jpg", alt: "Event Title - Image 17" },
        { src: "/images/events/2023/09-September/23-1/22.jpg", alt: "Event Title - Image 18" },
        { src: "/images/events/2023/09-September/23-1/23.jpg", alt: "Event Title - Image 19" },
        { src: "/images/events/2023/09-September/23-1/24.jpg", alt: "Event Title - Image 20" },
        { src: "/images/events/2023/09-September/23-1/25.jpg", alt: "Event Title - Image 21" },
        { src: "/images/events/2023/09-September/23-1/26.jpg", alt: "Event Title - Image 22" },
        { src: "/images/events/2023/09-September/23-1/27.jpg", alt: "Event Title - Image 23" },
        { src: "/images/events/2023/09-September/23-1/28.jpg", alt: "Event Title - Image 24" },
        { src: "/images/events/2023/09-September/23-1/29.jpg", alt: "Event Title - Image 25" },
        { src: "/images/events/2023/09-September/23-1/30.jpg", alt: "Event Title - Image 26" },
        { src: "/images/events/2023/09-September/23-1/31.jpg", alt: "Event Title - Image 27" },
        { src: "/images/events/2023/09-September/23-1/32.jpg", alt: "Event Title - Image 28" },
        { src: "/images/events/2023/09-September/23-1/33.jpg", alt: "Event Title - Image 29" },
        { src: "/images/events/2023/09-September/23-1/34.jpg", alt: "Event Title - Image 30" },
        { src: "/images/events/2023/09-September/23-1/35.jpg", alt: "Event Title - Image 31" },
        { src: "/images/events/2023/09-September/23-1/36.jpg", alt: "Event Title - Image 32" },
        { src: "/images/events/2023/09-September/23-1/37.jpg", alt: "Event Title - Image 33" },
        { src: "/images/events/2023/09-September/23-1/38.jpg", alt: "Event Title - Image 34" },
        { src: "/images/events/2023/09-September/23-1/39.jpg", alt: "Event Title - Image 35" },
        { src: "/images/events/2023/09-September/23-1/40.jpg", alt: "Event Title - Image 36" },
        { src: "/images/events/2023/09-September/23-1/41.jpg", alt: "Event Title - Image 37" },
        { src: "/images/events/2023/09-September/23-1/42.jpg", alt: "Event Title - Image 38" },
        { src: "/images/events/2023/09-September/23-1/43.jpg", alt: "Event Title - Image 39" },
        { src: "/images/events/2023/09-September/23-1/44.jpg", alt: "Event Title - Image 40" },
        { src: "/images/events/2023/09-September/23-1/45.jpg", alt: "Event Title - Image 41" },
        { src: "/images/events/2023/09-September/23-1/46.jpg", alt: "Event Title - Image 42" },
        { src: "/images/events/2023/09-September/23-1/47.jpg", alt: "Event Title - Image 43" },
        { src: "/images/events/2023/09-September/23-1/48.jpg", alt: "Event Title - Image 44" },
        { src: "/images/events/2023/09-September/23-1/49.jpg", alt: "Event Title - Image 45" },
        { src: "/images/events/2023/09-September/23-1/50.jpg", alt: "Event Title - Image 46" },
        { src: "/images/events/2023/09-September/23-1/51.jpg", alt: "Event Title - Image 47" },
        { src: "/images/events/2023/09-September/23-1/52.jpg", alt: "Event Title - Image 48" },
        { src: "/images/events/2023/09-September/23-1/53.jpg", alt: "Event Title - Image 49" },
        { src: "/images/events/2023/09-September/23-1/54.jpg", alt: "Event Title - Image 50" },
      ]
    },
    "23-2": {
      title: "Charlotte FC Independence Game",
      images: [
        { src: "/images/events/2023/09-September/23-2/04.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/09-September/23-2/05.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/09-September/23-2/06.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/09-September/23-2/07.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/09-September/23-2/08.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/09-September/23-2/09.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/09-September/23-2/10.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/09-September/23-2/11.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/09-September/23-2/12.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/09-September/23-2/13.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/09-September/23-2/14.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/09-September/23-2/15.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/09-September/23-2/16.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/09-September/23-2/17.jpg", alt: "Event Title - Image 14" },
        { src: "/images/events/2023/09-September/23-2/18.jpg", alt: "Event Title - Image 15" },
        { src: "/images/events/2023/09-September/23-2/19.jpg", alt: "Event Title - Image 16" },
        { src: "/images/events/2023/09-September/23-2/20.jpg", alt: "Event Title - Image 17" },
        { src: "/images/events/2023/09-September/23-2/21.jpg", alt: "Event Title - Image 18" },
        { src: "/images/events/2023/09-September/23-2/22.jpg", alt: "Event Title - Image 19" },
        { src: "/images/events/2023/09-September/23-2/23.jpg", alt: "Event Title - Image 20" },
        { src: "/images/events/2023/09-September/23-2/24.jpg", alt: "Event Title - Image 21" },
        { src: "/images/events/2023/09-September/23-2/25.jpg", alt: "Event Title - Image 22" },
        { src: "/images/events/2023/09-September/23-2/26.jpg", alt: "Event Title - Image 23" },
        { src: "/images/events/2023/09-September/23-2/27.jpg", alt: "Event Title - Image 24" },
        { src: "/images/events/2023/09-September/23-2/28.jpg", alt: "Event Title - Image 25" },
        { src: "/images/events/2023/09-September/23-2/29.jpg", alt: "Event Title - Image 26" },
        { src: "/images/events/2023/09-September/23-2/30.jpg", alt: "Event Title - Image 27" },
        { src: "/images/events/2023/09-September/23-2/31.jpg", alt: "Event Title - Image 28" },
        { src: "/images/events/2023/09-September/23-2/32.jpg", alt: "Event Title - Image 29" },
        { src: "/images/events/2023/09-September/23-2/33.jpg", alt: "Event Title - Image 30" },
        { src: "/images/events/2023/09-September/23-2/34.jpg", alt: "Event Title - Image 31" },
        { src: "/images/events/2023/09-September/23-2/35.jpg", alt: "Event Title - Image 32" },
        { src: "/images/events/2023/09-September/23-2/36.jpg", alt: "Event Title - Image 33" },
        { src: "/images/events/2023/09-September/23-2/37.jpg", alt: "Event Title - Image 34" },
        { src: "/images/events/2023/09-September/23-2/38.jpg", alt: "Event Title - Image 35" },
        { src: "/images/events/2023/09-September/23-2/39.jpg", alt: "Event Title - Image 36" },
        { src: "/images/events/2023/09-September/23-2/40.jpg", alt: "Event Title - Image 37" },
        { src: "/images/events/2023/09-September/23-2/41.jpg", alt: "Event Title - Image 38" },
        { src: "/images/events/2023/09-September/23-2/42.jpg", alt: "Event Title - Image 39" },
        { src: "/images/events/2023/09-September/23-2/43.jpg", alt: "Event Title - Image 40" },
        { src: "/images/events/2023/09-September/23-2/44.jpg", alt: "Event Title - Image 41" },
      ]
    },
    "30": {
      title: "Pee Dee Drill Meet at South Florence High",
      images: [
        { src: "/images/events/2023/09-September/30/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/09-September/30/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/09-September/30/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/09-September/30/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/09-September/30/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/09-September/30/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/09-September/30/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/09-September/30/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/09-September/30/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/09-September/30/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/09-September/30/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/09-September/30/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/09-September/30/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/09-September/30/14.jpg", alt: "Event Title - Image 14" },
        { src: "/images/events/2023/09-September/30/15.jpg", alt: "Event Title - Image 15" },
        { src: "/images/events/2023/09-September/30/16.jpg", alt: "Event Title - Image 16" },
        { src: "/images/events/2023/09-September/30/17.jpg", alt: "Event Title - Image 17" },
        { src: "/images/events/2023/09-September/30/18.jpg", alt: "Event Title - Image 18" },
        { src: "/images/events/2023/09-September/30/19.jpg", alt: "Event Title - Image 19" },
        { src: "/images/events/2023/09-September/30/20.jpg", alt: "Event Title - Image 20" },
        { src: "/images/events/2023/09-September/30/21.jpg", alt: "Event Title - Image 21" },
        { src: "/images/events/2023/09-September/30/22.jpg", alt: "Event Title - Image 22" },
        { src: "/images/events/2023/09-September/30/23.jpg", alt: "Event Title - Image 23" },
        { src: "/images/events/2023/09-September/30/24.jpg", alt: "Event Title - Image 24" },
        { src: "/images/events/2023/09-September/30/25.jpg", alt: "Event Title - Image 25" },
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
          <h2>September 2023 Events</h2>
          <div className="navigation-buttons">
            {selectedDay ? (
              <button onClick={handleBackToDaysClick}>
                Back to September Events
              </button>
            ) : (
              sortedEventDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                >
                  {`September ${day} - ${events[day].title}`}
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

export default September2023;

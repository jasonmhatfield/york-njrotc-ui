import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Events.component.css';

const November2023 = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const events = {
    "04": {
      title: "Drill Meet at Conway High School",
      images: [
        { src: "/images/events/2023/11-November/04/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/11-November/04/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/11-November/04/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/11-November/04/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/11-November/04/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/11-November/04/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/11-November/04/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/11-November/04/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/11-November/04/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/11-November/04/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/11-November/04/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/11-November/04/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/11-November/04/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/11-November/04/14.jpg", alt: "Event Title - Image 14" },
      ]
    },
    "11": {
      title: "York Veterans Day Parade & Ceremony",
      images: [
        { src: "/images/events/2023/11-November/11/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/11-November/11/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/11-November/11/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/11-November/11/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/11-November/11/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/11-November/11/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/11-November/11/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/11-November/11/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/11-November/11/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/11-November/11/10.jpg", alt: "Event Title - Image 10" },
        { src: "/images/events/2023/11-November/11/11.jpg", alt: "Event Title - Image 11" },
        { src: "/images/events/2023/11-November/11/12.jpg", alt: "Event Title - Image 12" },
        { src: "/images/events/2023/11-November/11/13.jpg", alt: "Event Title - Image 13" },
        { src: "/images/events/2023/11-November/11/14.jpg", alt: "Event Title - Image 14" },
        { src: "/images/events/2023/11-November/11/15.jpg", alt: "Event Title - Image 15" },
        { src: "/images/events/2023/11-November/11/16.jpg", alt: "Event Title - Image 16" },
        { src: "/images/events/2023/11-November/11/17.jpg", alt: "Event Title - Image 17" },
        { src: "/images/events/2023/11-November/11/18.jpg", alt: "Event Title - Image 18" },
        { src: "/images/events/2023/11-November/11/19.jpg", alt: "Event Title - Image 19" },
        { src: "/images/events/2023/11-November/11/20.jpg", alt: "Event Title - Image 20" },
        { src: "/images/events/2023/11-November/11/21.jpg", alt: "Event Title - Image 21" },
        { src: "/images/events/2023/11-November/11/22.jpg", alt: "Event Title - Image 22" },
        { src: "/images/events/2023/11-November/11/23.jpg", alt: "Event Title - Image 23" },
        { src: "/images/events/2023/11-November/11/24.jpg", alt: "Event Title - Image 24" },
        { src: "/images/events/2023/11-November/11/25.jpg", alt: "Event Title - Image 25" },
        { src: "/images/events/2023/11-November/11/26.jpg", alt: "Event Title - Image 26" },
        { src: "/images/events/2023/11-November/11/27.jpg", alt: "Event Title - Image 27" },
        { src: "/images/events/2023/11-November/11/28.jpg", alt: "Event Title - Image 28" },
        { src: "/images/events/2023/11-November/11/29.jpg", alt: "Event Title - Image 29" },
        { src: "/images/events/2023/11-November/11/30.jpg", alt: "Event Title - Image 30" },
        { src: "/images/events/2023/11-November/11/31.jpg", alt: "Event Title - Image 31" },
        { src: "/images/events/2023/11-November/11/32.jpg", alt: "Event Title - Image 32" },
        { src: "/images/events/2023/11-November/11/33.jpg", alt: "Event Title - Image 33" },
        { src: "/images/events/2023/11-November/11/34.jpg", alt: "Event Title - Image 34" },
        { src: "/images/events/2023/11-November/11/35.jpg", alt: "Event Title - Image 35" },
        { src: "/images/events/2023/11-November/11/36.jpg", alt: "Event Title - Image 36" },
        { src: "/images/events/2023/11-November/11/37.jpg", alt: "Event Title - Image 37" },
        { src: "/images/events/2023/11-November/11/38.jpg", alt: "Event Title - Image 38" },
        { src: "/images/events/2023/11-November/11/39.jpg", alt: "Event Title - Image 39" },
        { src: "/images/events/2023/11-November/11/40.jpg", alt: "Event Title - Image 40" },
        { src: "/images/events/2023/11-November/11/41.jpg", alt: "Event Title - Image 41" },
        { src: "/images/events/2023/11-November/11/42.jpg", alt: "Event Title - Image 42" },
        { src: "/images/events/2023/11-November/11/43.jpg", alt: "Event Title - Image 43" },
        { src: "/images/events/2023/11-November/11/44.jpg", alt: "Event Title - Image 44" },
        { src: "/images/events/2023/11-November/11/45.jpg", alt: "Event Title - Image 45" },
        { src: "/images/events/2023/11-November/11/46.jpg", alt: "Event Title - Image 46" },
        { src: "/images/events/2023/11-November/11/47.jpg", alt: "Event Title - Image 47" },
        { src: "/images/events/2023/11-November/11/48.jpg", alt: "Event Title - Image 48" },
        { src: "/images/events/2023/11-November/11/49.jpg", alt: "Event Title - Image 49" },
        { src: "/images/events/2023/11-November/11/50.jpg", alt: "Event Title - Image 50" },
        { src: "/images/events/2023/11-November/11/51.jpg", alt: "Event Title - Image 51" },
        { src: "/images/events/2023/11-November/11/52.jpg", alt: "Event Title - Image 52" },
        { src: "/images/events/2023/11-November/11/53.jpg", alt: "Event Title - Image 53" },
        { src: "/images/events/2023/11-November/11/54.jpg", alt: "Event Title - Image 54" },
        { src: "/images/events/2023/11-November/11/55.jpg", alt: "Event Title - Image 55" },
        { src: "/images/events/2023/11-November/11/56.jpg", alt: "Event Title - Image 56" },
        { src: "/images/events/2023/11-November/11/57.jpg", alt: "Event Title - Image 57" },
        { src: "/images/events/2023/11-November/11/58.jpg", alt: "Event Title - Image 58" },
        { src: "/images/events/2023/11-November/11/59.jpg", alt: "Event Title - Image 59" },
        { src: "/images/events/2023/11-November/11/60.jpg", alt: "Event Title - Image 60" },
        { src: "/images/events/2023/11-November/11/61.jpg", alt: "Event Title - Image 61" },
        { src: "/images/events/2023/11-November/11/62.jpg", alt: "Event Title - Image 62" },
        { src: "/images/events/2023/11-November/11/63.jpg", alt: "Event Title - Image 63" },
        { src: "/images/events/2023/11-November/11/64.jpg", alt: "Event Title - Image 64" },
        { src: "/images/events/2023/11-November/11/65.jpg", alt: "Event Title - Image 65" },
        { src: "/images/events/2023/11-November/11/66.jpg", alt: "Event Title - Image 66" },
        { src: "/images/events/2023/11-November/11/67.jpg", alt: "Event Title - Image 67" },
        { src: "/images/events/2023/11-November/11/68.jpg", alt: "Event Title - Image 68" },
        { src: "/images/events/2023/11-November/11/69.jpg", alt: "Event Title - Image 69" },
        { src: "/images/events/2023/11-November/11/70.jpg", alt: "Event Title - Image 70" },
        { src: "/images/events/2023/11-November/11/71.jpg", alt: "Event Title - Image 71" },
        { src: "/images/events/2023/11-November/11/72.jpg", alt: "Event Title - Image 72" },
        { src: "/images/events/2023/11-November/11/73.jpg", alt: "Event Title - Image 73" },
        { src: "/images/events/2023/11-November/11/74.jpg", alt: "Event Title - Image 74" },
        { src: "/images/events/2023/11-November/11/75.jpg", alt: "Event Title - Image 75" },
        { src: "/images/events/2023/11-November/11/76.jpg", alt: "Event Title - Image 76" },
      ]
    },
    "16": {
      title: "York Boys & Girls Club at York Intermediate",
      images: [
        { src: "/images/events/2023/11-November/16/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/11-November/16/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/11-November/16/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/11-November/16/04.jpg", alt: "Event Title - Image 4" },
        { src: "/images/events/2023/11-November/16/05.jpg", alt: "Event Title - Image 5" },
        { src: "/images/events/2023/11-November/16/06.jpg", alt: "Event Title - Image 6" },
        { src: "/images/events/2023/11-November/16/07.jpg", alt: "Event Title - Image 7" },
        { src: "/images/events/2023/11-November/16/08.jpg", alt: "Event Title - Image 8" },
        { src: "/images/events/2023/11-November/16/09.jpg", alt: "Event Title - Image 9" },
        { src: "/images/events/2023/11-November/16/10.jpg", alt: "Event Title - Image 10" },
      ]
    },
    "20": {
      title: "Charlotte Checkers Hockey game",
      images: [
        { src: "/images/events/2023/11-November/20/01.jpg", alt: "Event Title - Image 1" },
        { src: "/images/events/2023/11-November/20/02.jpg", alt: "Event Title - Image 2" },
        { src: "/images/events/2023/11-November/20/03.jpg", alt: "Event Title - Image 3" },
        { src: "/images/events/2023/11-November/20/04.jpg", alt: "Event Title - Image 4" },
      ]
    },
    "23": {
      title: "York Thanksgiving Day Turkey Trot 5K Race Assist",
      images: [
        { src: "/images/events/2023/11-November/23/01.jpg", alt: "Event Title - Image 1" },
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
          <h2>November 2023 Events</h2>
          <div className="navigation-buttons">
            {selectedDay ? (
              <button onClick={handleBackToDaysClick}>
                Back to November Events
              </button>
            ) : (
              sortedEventDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                >
                  {`November ${day} - ${events[day].title}`}
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

export default November2023;

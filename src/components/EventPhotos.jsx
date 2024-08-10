import React from 'react';

const EventPhotos = () => {
  const eventPhotos = [
    { id: 1, title: 'Fall 2023 York NJROTC', imageUrl: 'public/images/unit-photos/york-njrotc-fall-2023.jpg', date: '2023-11-05' },
    // Add more photos as needed
  ];

  return (
    <div className="photo-gallery">
      {eventPhotos.map(photo => (
        <div key={photo.id} className="photo-card">
          <img src={photo.imageUrl} alt={photo.title} />
          <p>{photo.title}</p>
          <p><small>{photo.date}</small></p>
        </div>
      ))}
    </div>
  );
};

export default EventPhotos;

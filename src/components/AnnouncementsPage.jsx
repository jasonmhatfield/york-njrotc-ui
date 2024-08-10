import React from 'react';
import '../styles/AnnouncementsPage.css';
import Announcements from './Announcements';
import EventPhotos from './EventPhotos';

const AnnouncementsPage = () => {
  return (
    <div>
      <h1>Announcements and Event Photos</h1>
      <section>
        <h2>Announcements</h2>
        <Announcements />
      </section>
      <section>
        <h2>Event Photos</h2>
        <EventPhotos />
      </section>
    </div>
  );
};

export default AnnouncementsPage;

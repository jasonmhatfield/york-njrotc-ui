import React from 'react';

const Announcements = () => {
  const announcements = [
    { id: 1, title: 'Upcoming Drill Meet', date: '2024-08-15', content: 'Details about the upcoming drill meet...' },
    { id: 2, title: 'Parent-Teacher Conference', date: '2024-08-20', content: 'Information on the parent-teacher conference...' }
  ];

  return (
    <div>
      {announcements.map(announcement => (
        <div key={announcement.id} className="announcement-card">
          <h3>{announcement.title}</h3>
          <p><small>{announcement.date}</small></p>
          <p>{announcement.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;

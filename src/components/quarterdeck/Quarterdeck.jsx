import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import './Quarterdeck.component.css';

const Quarterdeck = () => {
  const [currentSection, setCurrentSection] = useState('chief-chat');
  const [selectedYear] = useState('2023');

  useEffect(() => {
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
      setCurrentSection(savedSection);
    }
  }, []);

  const renderChiefChat = () => (
    <div className="section chief-chat-section">
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/CKfhw2SPY_U?si=BxzoLcIYAl7_83QC"
          title="Chief Chat"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="iframe"
          allowFullScreen
        />
      </div>
    </div>
  );

  const renderDeckLog = () => {
    const yearData = [
      { month: 'November', imageUrl: '/images/events/2023/11-November/11-November.jpg', link: '/events/2023/11-November' },
      { month: 'October', imageUrl: '/images/events/2023/10-October/10-October.jpg', link: '/events/2023/10-October' },
      { month: 'September', imageUrl: '/images/events/2023/09-September/09-September.jpg', link: '/events/2023/09-September' },
      { month: 'August', imageUrl: '/images/events/2023/08-August/08-August.jpg', link: '/events/2023/08-August' },
    ];

    return (
      <div className="section deck-log-section">
        {yearData.map(({ month, imageUrl, link }) => (
          <EventCard key={month} title={`${month} ${selectedYear}`} imageUrl={imageUrl} link={link} />
        ))}
      </div>
    );
  };

  return (
    <div className="quarterdeck-page-container">
      <nav className="navigation">
        <button
          className={`button ${currentSection === 'chief-chat' ? 'active' : ''}`}
          onClick={() => setCurrentSection('chief-chat')}
        >
          Chief Chat
        </button>
        <button
          className={`button ${currentSection === 'deck-log' ? 'active' : ''}`}
          onClick={() => setCurrentSection('deck-log')}
        >
          Deck Log
        </button>
      </nav>
      {currentSection === 'chief-chat' ? renderChiefChat() : renderDeckLog()}
    </div>
  );
};

export default Quarterdeck;

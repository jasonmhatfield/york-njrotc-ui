import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { eventsData } from '../data/eventsData';
import '../styles/Quarterdeck.css';

const Quarterdeck = () => {
  const [currentSection, setCurrentSection] = useState('chief-chat');
  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    setCurrentSection('chief-chat'); // Highlight Chief Chat button on page load
  }, []);

  const renderChiefChat = () => (
    <div className="chief-chat-section">
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/CKfhw2SPY_U?si=BxzoLcIYAl7_83QC"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );

  const renderDeckLog = () => {
    const yearData = eventsData[selectedYear];

    return (
      <div className="deck-log-section">
        <div className="event-card-container">
          {yearData.map((monthData) => (
            <EventCard
              key={monthData.month}
              title={`${monthData.month} ${selectedYear}`}
              imageUrl={monthData.imageUrl}
              link={`/deck-log/${selectedYear}/${monthData.month.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (currentSection === 'chief-chat') {
      return renderChiefChat();
    } else if (currentSection === 'deck-log') {
      return renderDeckLog();
    }
  };

  return (
    <div className="quarterdeck-page-container">
      <nav className="navigation">
        <button
          className={currentSection === 'chief-chat' ? 'active' : ''}
          onClick={() => setCurrentSection('chief-chat')}
        >
          Chief Chat
        </button>
        <button
          className={currentSection === 'deck-log' ? 'active' : ''}
          onClick={() => setCurrentSection('deck-log')}
        >
          Deck Log
        </button>
      </nav>
      {renderSection()}
    </div>
  );
};

export default Quarterdeck;

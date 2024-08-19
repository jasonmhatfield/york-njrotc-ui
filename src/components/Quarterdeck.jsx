import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

const styles = {
  quarterdeckPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#ecf0f1',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxHeight: '50px',
    paddingBottom: '20px',
    width: '100%',
  },
  button: {
    background: '#1e3c72',
    border: 'none',
    borderRadius: '5px',
    color: '#ecf0f1',
    margin: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease, boxShadow 0.3s ease, transform 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    maxHeight: '40px',
    padding: '8px 20px',
    outline: 'none',  // Remove focus outline
  },
  buttonHover: {
    background: '#2a5298',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonActive: {
    background: '#ffd700',
    color: '#1e3c72',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
  },
  section: {
    textAlign: 'center',
    margin: '10px 0 20px 0',
    backgroundColor: '#1a2a3a',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    padding: '10px',
  },
  chiefChatSection: {
    maxWidth: '800px',
    height: 'auto',
  },
  deckLogSection: {
    maxWidth: '600px',
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    width: '100%',
    height: '0',
    maxWidth: '100%',
    backgroundColor: '#000',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '8px',
  },
};

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
    <div style={{ ...styles.section, ...styles.chiefChatSection }}>
      <div style={styles.videoContainer}>
        <iframe
          src="https://www.youtube.com/embed/CKfhw2SPY_U?si=BxzoLcIYAl7_83QC"
          title="Chief Chat"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={styles.iframe}
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
      <div style={{ ...styles.section, ...styles.deckLogSection }}>
        {yearData.map(({ month, imageUrl, link }) => (
          <EventCard key={month} title={`${month} ${selectedYear}`} imageUrl={imageUrl} link={link} />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.quarterdeckPageContainer}>
      <nav style={styles.navigation}>
        <button
          style={{ ...styles.button, ...(currentSection === 'chief-chat' ? styles.buttonActive : {}) }}
          onClick={() => setCurrentSection('chief-chat')}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.buttonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = currentSection === 'chief-chat' ? styles.buttonActive.background : styles.button.background}
        >
          Chief Chat
        </button>
        <button
          style={{ ...styles.button, ...(currentSection === 'deck-log' ? styles.buttonActive : {}) }}
          onClick={() => setCurrentSection('deck-log')}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.buttonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = currentSection === 'deck-log' ? styles.buttonActive.background : styles.button.background}
        >
          Deck Log
        </button>
      </nav>
      {currentSection === 'chief-chat' ? renderChiefChat() : renderDeckLog()}
    </div>
  );
};

export default Quarterdeck;

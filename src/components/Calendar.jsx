import React, { useCallback, useEffect, useState, useRef } from 'react';

const CALENDAR_ID = 2;

const Calendar = ({ config }) => {
  const { apiKey, calendarId } = config.calendars.find(key => key.id === CALENDAR_ID);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(new Date().getMonth());
  const containerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}%40gmail.com/events?singleEvents=true&key=${apiKey}`);
        const data = await response.json();
        const validEvents = data.items
          .filter(event => event.start)
          .sort((a, b) => new Date(a.start.dateTime || `${a.start.date}T00:00:00Z`).getTime() - new Date(b.start.dateTime || `${b.start.date}T00:00:00Z`).getTime());
        setEvents(validEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents().catch(console.error);
  }, [apiKey, calendarId]);

  const handleMapLoad = useCallback(() => {
    // Do something when the map is loaded if needed
  }, []);

  const formatAddress = (address) => {
    const [locationName, ...restAddress] = address.split(', ');
    const fullAddress = restAddress.join(', ').replace(', USA', '');
    return (
      <>
        <span>{locationName}</span><br />
        <span>{fullAddress}</span>
      </>
    );
  };

  const createEventCard = (event, eventDate) => {
    const eventStartDate = new Date(eventDate);
    const isAllDay = event.start.date && !event.start.dateTime;

    return (
      <div
        key={`${event.id}-${eventStartDate.toISOString()}`}
        style={styles.calendarCard}
      >
        <div style={styles.calendarCardContent}>
          <div style={styles.calendarCardTop}>
            <h2 style={styles.dateHeader}>
              {eventStartDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <h3 style={styles.eventTitle}>{event.summary}</h3>
            <p style={styles.eventTime}>
              {isAllDay ? 'Time: All Day' : `Time: ${eventStartDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })} - ${new Date(event.end.dateTime || event.end.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}`}
            </p>
            <p style={styles.eventDescription}>{event.description}</p>
          </div>
          {event.location && (
            <div style={styles.calendarCardBottom}>
              <p style={styles.eventLocation}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                   target="_blank" rel="noopener noreferrer">
                  {formatAddress(event.location)}
                </a>
              </p>
              <iframe
                className="event-map"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(event.location)}`}
                allowFullScreen
                title="Event Location"
                onLoad={handleMapLoad}
                style={styles.eventMap}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    );
  };

  const splitMultiDayEvent = (event) => {
    let eventStartDate = new Date(event.start.dateTime || event.start.date);
    let eventEndDate = new Date(event.end.dateTime || event.end.date);

    if (event.start.date && !event.start.dateTime) {
      eventStartDate = new Date(eventStartDate.getTime() + eventStartDate.getTimezoneOffset() * 60000);
    }

    const dates = [];
    let currentDate = new Date(eventStartDate);

    while (currentDate <= eventEndDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates.map(date => createEventCard(event, date));
  };

  const filterEventsByMonth = (events, month) => {
    const today = new Date();
    return events.filter(event => {
      let eventStartDate = new Date(event.start.dateTime || event.start.date);
      let eventEndDate = new Date(event.end.dateTime || event.end.date);

      if (event.start.date && !event.start.dateTime) {
        eventStartDate = new Date(eventStartDate.getTime() + eventStartDate.getTimezoneOffset() * 60000);
      }

      return (eventStartDate.getMonth() === month || eventEndDate.getMonth() === month) && eventEndDate >= today;
    });
  };

  const isToday = (event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let eventStartDate = new Date(event.start.dateTime || event.start.date);
    let eventEndDate = new Date(event.end.dateTime || event.end.date);

    if (event.start.date && !event.start.dateTime) {
      eventStartDate = new Date(eventStartDate.getTime() + eventStartDate.getTimezoneOffset() * 60000);
    }

    return eventStartDate <= today && eventEndDate >= today;
  };

  const todayEvents = events.filter(isToday);

  const renderEventsForMonth = (month) => {
    const eventsForMonth = filterEventsByMonth(events, month);
    const isCurrentMonth = month === new Date().getMonth();
    const monthName = new Date(0, month).toLocaleString('en-US', { month: 'long' });

    return (
      <div key={month} style={{ ...styles.calendarCardsContainer, display: activeTab === month ? 'block' : 'none' }} ref={containerRef}>
        {isCurrentMonth && todayEvents.length > 0 && (
          <>
            <h2>Today's Events</h2>
            <div style={styles.calendarCards}>
              {todayEvents.map(event => splitMultiDayEvent(event))}
            </div>
          </>
        )}
        {eventsForMonth.length === 0 ? (
          <h2 style={styles.dateText}>{isCurrentMonth ? `No more events for ${monthName}` : `No events for ${monthName} have been scheduled yet.`}</h2>
        ) : (
          <div style={styles.calendarCards}>
            {eventsForMonth.flatMap(event => splitMultiDayEvent(event))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = containerRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight);
      }
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error loading events.</div>;
  }

  const currentMonth = new Date().getMonth();
  const months = Array.from({ length: 6 }, (_, i) => (currentMonth + i) % 12);

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.tabs}>
        {months.map((month) => (
          <div key={month} style={activeTab === month ? { ...styles.tab, ...styles.activeTab } : styles.tab} onClick={() => setActiveTab(month)}>
            {new Date(0, month).toLocaleString('en-US', { month: 'long' })}
          </div>
        ))}
      </div>
      <div style={styles.monthDropdown}>
        <select style={styles.monthSelector} onChange={(e) => setActiveTab(Number(e.target.value))} value={activeTab}>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      {months.map(renderEventsForMonth)}
      {showScrollIndicator && <div style={styles.scrollIndicator}>↓</div>}
    </div>
  );
};

export default Calendar;

const styles = {
  calendarContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    overflowX: 'hidden',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    borderBottom: '2px solid #ffd700',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: '#ffd700',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottom: '3px solid #ffd700',
  },
  calendarCardsContainer: {
    padding: '20px 0',
  },
  calendarCards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px 0',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  monthDropdown: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  monthSelector: {
    padding: '10px',
    fontSize: '1.1rem',
    color: '#ffd700',
    backgroundColor: '#1a5f7a',
    borderRadius: '5px',
    border: 'none',
  },
  calendarCard: {
    background: 'linear-gradient(145deg, #1a5f7a, #003165)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    minHeight: '425px',
    maxWidth: '340px',
    display: 'flex',
    flexDirection: 'column',
    color: '#ecf0f1',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  calendarCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  calendarCardTop: {
    flexGrow: 1,
  },
  calendarCardBottom: {
    marginTop: 'auto',
  },
  dateHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    fontSize: '1.5em',
    margin: '-20px -20px 20px -20px',
    padding: '15px',
    textAlign: 'center',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    fontWeight: 'bold',
    color: '#ffd700',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  },
  eventTitle: {
    fontSize: '1.3em',
    marginBottom: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eventTime: {
    marginBottom: '12px',
    textAlign: 'center',
  },
  eventDescription: {
    marginBottom: '12px',
    textAlign: 'center',
  },
  eventLocation: {
    marginBottom: '12px',
    textAlign: 'center',
  },
  eventMap: {
    border: 'none',
    marginTop: '12px',
    borderRadius: '8px',
    width: '100%',
    height: '180px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.6rem',
    color: '#ffd700',
    margin: '20px 0',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.6rem',
    color: '#ffd700',
    margin: '20px 0',
  },
  dateText: {
    textAlign: 'center',
    fontSize: '1.6rem',
    color: '#ffd700',
    margin: '20px 0',
  },
  scrollIndicator: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#ffd700',
    marginTop: '20px',
  },
};

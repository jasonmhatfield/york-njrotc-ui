import React, { useCallback, useEffect, useState, useRef } from 'react';
import '../styles/Calendar.css';

const CALENDAR_ID = 3;

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
        const validEvents = data.items.filter(event => event.start).sort((a, b) => new Date(a.start.dateTime || `${a.start.date}T00:00:00Z`).getTime() - new Date(b.start.dateTime || `${b.start.date}T00:00:00Z`).getTime());
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
      <div key={`${event.id}-${eventStartDate.toISOString()}`} className="calendar-card">
        <div className="calendar-card-content">
          <div className="calendar-card-top">
            <h2 className="date-header">
              {eventStartDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <h3 className="event-title">{event.summary}</h3>
            <p className="event-time">
              {isAllDay ? 'Time: All Day' : `Time: ${eventStartDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })} - ${new Date(event.end.dateTime || event.end.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}`}
            </p>
            <p className="event-description">{event.description}</p>
          </div>
          {event.location && (
            <div className="calendar-card-bottom">
              <p className="event-location">
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
      <div key={month} className={`calendar-cards-container ${activeTab === month ? 'active' : 'hidden'}`} ref={containerRef}>
        {isCurrentMonth && todayEvents.length > 0 && (
          <>
            <h2>Today's Events</h2>
            <div className="calendar-cards">
              {todayEvents.map(event => splitMultiDayEvent(event))}
            </div>
          </>
        )}
        {eventsForMonth.length === 0 ? (
          <h2 className="date-text">{isCurrentMonth ? `No more events for ${monthName}` : `No events for ${monthName} have been scheduled yet.`}</h2>
        ) : (
          <div className="calendar-cards">
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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error loading events.</div>;
  }

  const currentMonth = new Date().getMonth();
  const months = Array.from({ length: 6 }, (_, i) => (currentMonth + i) % 12);

  return (
    <div className="calendar-container">
      <div className="tabs">
        {months.map((month) => (
          <div key={month} className={`tab ${activeTab === month ? 'active' : ''}`} onClick={() => setActiveTab(month)}>
            {new Date(0, month).toLocaleString('en-US', { month: 'long' })}
          </div>
        ))}
      </div>
      <div className="month dropdown">
        <select className="month-selector" onChange={(e) => setActiveTab(Number(e.target.value))} value={activeTab}>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      {months.map(renderEventsForMonth)}
      {showScrollIndicator && <div className="scroll-indicator">↓</div>}
    </div>
  );
};

export default Calendar;

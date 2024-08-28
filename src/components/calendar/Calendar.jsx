import React, { useCallback, useEffect, useState, useRef } from 'react';
import './Calendar.component.css';

const CALENDAR_ID = 2;

const Calendar = ({ config, selectedMonth }) => {
  const [events, setEvents] = useState([]);
  const [setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);
  const containerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const apiKey = config?.calendars?.find(key => key.id === CALENDAR_ID)?.apiKey || '';
  const calendarId = config?.calendars?.find(key => key.id === CALENDAR_ID)?.calendarId || '';

  const monthIndex = new Date(`${selectedMonth} 1, 2023`).getMonth();

  useEffect(() => {
    if (!apiKey || !calendarId) {
      console.error("API key or Calendar ID is missing.");
      setError(new Error("API key or Calendar ID is missing."));
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}%40gmail.com/events?singleEvents=true&key=${apiKey}`);
        const data = await response.json();
        const validEvents = data.items
          .filter(event => event.start)
          .map(event => {
            const isAllDay = Boolean(event.start.date && !event.start.dateTime);
            let start, end;
            if (isAllDay) {
              start = new Date(event.start.date + 'T00:00:00');
              end = new Date(event.end.date + 'T23:59:59');
            } else {
              start = new Date(event.start.dateTime || event.start.date);
              end = new Date(event.end.dateTime || event.end.date);
            }
            return {
              ...event,
              start,
              end,
              isAllDay
            };
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());
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

  const handleMapLoad = useCallback(() => {}, []);

  const formatAddress = (address) => {
    const [locationName, ...restAddress] = address.split(', ');
    const fullAddress = restAddress.join(', ').replace(', USA', '');
    return (
      <>
        <span>{fullAddress}</span>
      </>
    );
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateTime, isAllDay) => {
    if (isAllDay) return 'All Day';
    return dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const createEventCard = (event) => {
    return (
      <div
        key={`${event.id}-${event.start.toISOString()}`}
        className="calendar-card"
        onClick={() => setModalEvent(event)}
      >
        <div className="calendar-card-content">
          <h2 className="date-header">
            {formatDate(event.start)}
          </h2>
          <h3 className="event-title">{event.summary}</h3>
          <p className="event-time">
            Time: {formatTime(event.start, event.isAllDay)}
            {!event.isAllDay && ` - ${formatTime(event.end, event.isAllDay)}`}
          </p>
        </div>
      </div>
    );
  };

  const filterEventsByMonth = (events, month) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter(event => {
      const eventStartMonth = event.start.getMonth();
      const eventEndMonth = event.end.getMonth();
      return (eventStartMonth === month || eventEndMonth === month) && event.end >= today;
    });
  };

  const renderEventsForMonth = (month) => {
    const eventsForMonth = filterEventsByMonth(events, month);
    const monthName = new Date(2023, month, 1).toLocaleString('en-US', { month: 'long' });

    return (
      <div key={month} className="calendar-cards-container" ref={containerRef}>
        <h2 className="month-title">{monthName}</h2>
        {eventsForMonth.length === 0 ? (
          <h3 className="date-text">{`No events for ${monthName} have been scheduled yet.`}</h3>
        ) : (
          <div className="calendar-cards">
            {eventsForMonth.map(event => createEventCard(event))}
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
  }, []);

  if (error) {
    return <div className="error">Error loading events.</div>;
  }

  return (
    <div className="calendar-container">
      {renderEventsForMonth(monthIndex)}
      {showScrollIndicator && <div className="scroll-indicator">↓</div>}

      {modalEvent && (
        <div className="calendar-modal show" onClick={() => setModalEvent(null)}>
          <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
            <h3>{modalEvent.summary}</h3>
            <p>{formatDate(modalEvent.start)}</p>
            <p>{formatTime(modalEvent.start, modalEvent.isAllDay)}
              {!modalEvent.isAllDay && ` - ${formatTime(modalEvent.end, modalEvent.isAllDay)}`}</p>
            {modalEvent.location && (
              <>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(modalEvent.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-location">
                  {formatAddress(modalEvent.location)}
                </a>
                <iframe
                  className="event-map"
                  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(modalEvent.location)}`}
                  allowFullScreen
                  title="Event Location"
                  onLoad={handleMapLoad}
                ></iframe>
              </>
            )}
            <button className="calendar-modal-close" onClick={() => setModalEvent(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
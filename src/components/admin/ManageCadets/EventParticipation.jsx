import React from 'react';
import { Add, Delete } from '@mui/icons-material';
import { Button, Input } from '../common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { calculateTotalHours } from '../../../utils/dateUtils';

const EventItem = styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
`;

const TotalHours = styled.div`
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.sm};
    margin-top: ${theme.spacing.md};
`;

const EventParticipation = ({ events, onChange }) => {
  const handleEventParticipationChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index] = {...updatedEvents[index], [field]: value};
    onChange(updatedEvents);
  };

  const addEventParticipation = () => {
    onChange([...events, { id: Date.now(), eventName: '', date: '', hours: 0 }]);
  };

  const removeEventParticipation = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    onChange(updatedEvents);
  };

  return (
    <div>
      <h4>Event Participation</h4>
      {events.map((event, index) => (
        <EventItem key={event.id}>
          <Input
            value={event.eventName}
            onChange={(e) => handleEventParticipationChange(index, 'eventName', e.target.value)}
            placeholder="Event Name"
          />
          <Input
            type="date"
            value={event.date}
            onChange={(e) => handleEventParticipationChange(index, 'date', e.target.value)}
          />
          <Input
            type="number"
            value={event.hours}
            onChange={(e) => handleEventParticipationChange(index, 'hours', parseInt(e.target.value))}
            placeholder="Hours"
          />
          <Button variant="secondary" onClick={() => removeEventParticipation(index)}>
            <Delete /> Remove
          </Button>
        </EventItem>
      ))}
      <Button onClick={addEventParticipation}>
        <Add /> Add Event Participation
      </Button>

      <TotalHours>
        <h4>Total Hours</h4>
        <p>This Week: {calculateTotalHours(events, 'week')}</p>
        <p>This Month: {calculateTotalHours(events, 'month')}</p>
        <p>This Quarter: {calculateTotalHours(events, 'quarter')}</p>
        <p>This Semester: {calculateTotalHours(events, 'semester')}</p>
        <p>This School Year: {calculateTotalHours(events, 'schoolYear')}</p>
      </TotalHours>
    </div>
  );
};

export default EventParticipation;
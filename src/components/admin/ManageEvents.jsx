import React, { useState, useMemo } from 'react';
import { Add, Edit, Delete, Search, Save, Cancel, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Button, Input, Select, Table, Th, Td, Tr, Modal, FormGrid, FormGroup, Label } from './common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import mockEvents from '../../mock/events.json';

const SearchBar = styled.div`
    display: flex;
    margin-bottom: ${theme.spacing.md};
`;

const EventItem = styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
`;

const ManageEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedEvents = useMemo(() => {
    let sortableEvents = [...events];
    if (sortConfig.key !== null) {
      sortableEvents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEvents;
  }, [events, sortConfig]);

  const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event ? {...event} : { participants: [] });
  };

  const handleSaveEvent = () => {
    if (editingEvent.id) {
      setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
    } else {
      setEvents([...events, {...editingEvent, id: Date.now()}]);
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setEditingEvent(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingEvent({...editingEvent, [name]: value});
  };

  return (
    <div>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button><Search /></Button>
      </SearchBar>
      <Button onClick={() => handleEditEvent(null)}><Add /> Add Event</Button>
      <Table>
        <thead>
        <tr>
          {['Title', 'Date', 'Location'].map((header) => (
            <Th key={header} onClick={() => handleSort(header.toLowerCase())}>
              {header}
              {sortConfig.key === header.toLowerCase() && (
                sortConfig.direction === 'ascending' ? <KeyboardArrowUp /> : <KeyboardArrowDown />
              )}
            </Th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredEvents.map(event => (
          <Tr key={event.id} onClick={() => handleEditEvent(event)}>
            <Td>{event.title}</Td>
            <Td>{event.date}</Td>
            <Td>{event.location}</Td>
          </Tr>
        ))}
        </tbody>
      </Table>

      {editingEvent && (
        <Modal>
          <h3>{editingEvent.id ? 'Edit Event' : 'Add Event'}</h3>
          <form>
            <FormGrid>
              {['title', 'date', 'startTime', 'endTime', 'location'].map((field) => (
                <FormGroup key={field}>
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                  <Input
                    name={field}
                    value={editingEvent[field] || ''}
                    onChange={handleInputChange}
                    type={field === 'date' ? 'date' : field.includes('Time') ? 'time' : 'text'}
                  />
                </FormGroup>
              ))}
            </FormGrid>
            <FormGroup>
              <Label>Description</Label>
              <Input
                as="textarea"
                name="description"
                value={editingEvent.description || ''}
                onChange={handleInputChange}
                rows="4"
              />
            </FormGroup>

            <div>
              {editingEvent.id && (
                <Button variant="secondary" onClick={() => handleDeleteEvent(editingEvent.id)}>
                  <Delete /> Delete Event
                </Button>
              )}
              <Button onClick={handleSaveEvent}>
                <Save /> Save
              </Button>
              <Button variant="secondary" onClick={() => setEditingEvent(null)}>
                <Cancel /> Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageEvents;
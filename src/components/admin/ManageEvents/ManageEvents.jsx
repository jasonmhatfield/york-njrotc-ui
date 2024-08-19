import React, { useState, useMemo } from 'react';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { Button, Input, Table, Th, Td, Tr, Modal, FormGrid, FormGroup, Label } from '../common/StyledComponents';
import '../styles/ManageCadets.css';
import '../styles/Modal.css';
import mockEvents from '../../../mock/events.json';  // Importing mock data

const ManageEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const openModal = (event = null) => {
    setEditingEvent(event || { participants: [] });
  };

  const closeModal = () => {
    setEditingEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingEvent.id) {
      setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
    } else {
      setEvents([...events, { ...editingEvent, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = () => {
    setEvents(events.filter(event => event.id !== editingEvent.id));
    closeModal();
  };

  return (
    <div className="manage-cadets">
      <div className="filters">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="add-button" onClick={() => openModal()}><Add /> Add Event</Button>
      </div>
      <table>
        <thead>
        <tr>
          <Th>Title</Th>
          <Th>Date</Th>
          <Th>Location</Th>
        </tr>
        </thead>
        <tbody>
        {filteredEvents.map(event => (
          <Tr key={event.id} onClick={() => openModal(event)} className="clickable-row">
            <Td>{event.title}</Td>
            <Td>{event.date}</Td>
            <Td>{event.location}</Td>
          </Tr>
        ))}
        </tbody>
      </table>

      {editingEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingEvent.id ? 'Edit Event' : 'Add Event'}</h3>
            <form>
              <FormGrid>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={editingEvent.title || ''}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={editingEvent.date || ''}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    value={editingEvent.location || ''}
                    onChange={handleInputChange}
                  />
                </FormGroup>
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
              </FormGrid>
            </form>
            <div className="modal-actions">
              <Button className="cadet-save-button" onClick={handleSave}>
                <Save /> Save
              </Button>
              {editingEvent.id && (
                <Button className="cadet-delete-button" onClick={handleDelete}>
                  <Delete /> Delete
                </Button>
              )}
              <Button className="cadet-close-button" onClick={closeModal}>
                <Cancel /> Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;

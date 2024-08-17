import React from 'react';
import EntityManager from '../EntityManager';

const EventManager = () => {
  const fields = [
    { name: 'eventName', label: 'Event Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    // Add other relevant fields as needed
  ];

  return (
    <EntityManager
      entityName="events"
      apiEndpoint="/api/events"
      fields={fields}
    />
  );
};

export default EventManager;

// src/components/admin/cadets/CadetManager.jsx

import React from 'react';
import EntityManager from '../EntityManager';

const CadetManager = () => {
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'grade', label: 'Grade', type: 'number' },
    // Add other relevant fields as needed
  ];

  return (
    <EntityManager
      entityName="cadets"
      apiEndpoint="/api/cadets"
      fields={fields}
    />
  );
};

export default CadetManager;

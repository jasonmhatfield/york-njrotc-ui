import React from 'react';
import EntityManager from '../EntityManager';

const FamilyManager = () => {
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    // Add other relevant fields as needed
  ];

  return (
    <EntityManager
      entityName="family"
      apiEndpoint="/api/family"
      fields={fields}
    />
  );
};

export default FamilyManager;

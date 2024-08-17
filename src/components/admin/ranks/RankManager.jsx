import React from 'react';
import EntityManager from '../EntityManager';

const RankManager = () => {
  const fields = [
    { name: 'rankName', label: 'Rank Name', type: 'text' },
    { name: 'rankAbbreviation', label: 'Abbreviation', type: 'text' },
    { name: 'rankOrder', label: 'Order', type: 'number' },
    // Add other relevant fields as needed
  ];

  return (
    <EntityManager
      entityName="ranks"
      apiEndpoint="/api/ranks"
      fields={fields}
    />
  );
};

export default RankManager;

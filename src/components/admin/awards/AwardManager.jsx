import React from 'react';
import EntityManager from '../EntityManager';

const AwardManager = () => {
  const fields = [
    { name: 'awardName', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];

  return (
    <EntityManager
      entityName="awards"
      apiEndpoint="/api/awards"
      fields={fields}
    />
  );
};

export default AwardManager;

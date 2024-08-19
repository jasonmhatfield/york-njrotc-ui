const config = {
  // API Base URL
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',

  // Route configurations
  routes: {
    awards: '/awards',
    cadets: '/cadets',
    events: '/events',
    family: '/family',
    ranks: '/cadet-ranks',
    units: '/units',
  },

  // Entity fields configuration
  entityFields: {
    awards: [
      { name: 'awardName', label: 'Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' }
    ],
    cadets: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'grade', label: 'Grade', type: 'number' }
    ],
    events: [
      { name: 'eventName', label: 'Event Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' }
    ],
    family: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' }
    ],
    ranks: [
      { name: 'rankName', label: 'Rank Name', type: 'text' },
      { name: 'rankAbbreviation', label: 'Abbreviation', type: 'text' },
      { name: 'rankOrder', label: 'Order', type: 'number' }
    ],
    units: [
      { name: 'unitName', label: 'Unit Name', type: 'text' },
      { name: 'schoolName', label: 'School Name', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'zipCode', label: 'Zip Code', type: 'text' }
    ]
  }
};

export default config;

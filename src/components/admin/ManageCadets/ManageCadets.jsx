import React, { useState, useMemo, useCallback } from 'react';
import { Add, Edit, Delete, Search, Save, Cancel, KeyboardArrowUp, KeyboardArrowDown, PhotoCamera } from '@mui/icons-material';
import styles from './ManageCadets.module.css';

const initialCadets = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    rank: 'Cadet',
    dateOfBirth: '2005-05-15',
    grade: '11',
    nsLevel: 'NS2',
    leadershipPosition: 'Squad Leader',
    platoon: 1,
    familyMembers: [
      { relation: 'Mother', name: 'Jane Doe', contact: '555-1234' },
      { relation: 'Father', name: 'Jack Doe', contact: '555-5678' }
    ],
    photos: [
      { id: 1, url: '/path/to/photo1.jpg', isActive: true, date: '2023-09-01' },
      { id: 2, url: '/path/to/photo2.jpg', isActive: false, date: '2022-09-01' }
    ],
    eventParticipation: [
      { id: 1, eventName: 'Annual Military Ball', date: '2023-05-15', hours: 4 },
      { id: 2, eventName: 'Community Service Project', date: '2023-06-01', hours: 6 }
    ]
  },
    {
      "id": 2,
      "firstName": "Emily",
      "lastName": "Rodriguez",
      "email": "emily.rodriguez@example.com",
      "rank": "Cadet Lieutenant Commander",
      "dateOfBirth": "2006-03-22",
      "grade": "11",
      "nsLevel": "NS3",
      "leadershipPosition": "Company Executive Officer",
      "platoon": 1,
      "familyMembers": [
        { "relation": "Mother", "name": "Maria Rodriguez", "contact": "555-2468" },
        { "relation": "Father", "name": "Carlos Rodriguez", "contact": "555-1357" }
      ],
      "photos": [
        { "id": 3, "url": "/path/to/emily1.jpg", "isActive": true, "date": "2023-08-15" },
        { "id": 4, "url": "/path/to/emily2.jpg", "isActive": false, "date": "2022-09-01" }
      ],
      "eventParticipation": [
        { "id": 3, "eventName": "Leadership Academy", "date": "2023-07-10", "hours": 40 },
        { "id": 4, "eventName": "Veterans Day Parade", "date": "2022-11-11", "hours": 5 }
      ]
    },
    {
      "id": 3,
      "firstName": "Michael",
      "lastName": "Chen",
      "email": "michael.chen@example.com",
      "rank": "Cadet Chief Petty Officer",
      "dateOfBirth": "2007-11-05",
      "grade": "10",
      "nsLevel": "NS2",
      "leadershipPosition": "Platoon Chief",
      "platoon": 2,
      "familyMembers": [
        { "relation": "Mother", "name": "Lisa Chen", "contact": "555-9876" },
        { "relation": "Father", "name": "David Chen", "contact": "555-5432" }
      ],
      "photos": [
        { "id": 5, "url": "/path/to/michael1.jpg", "isActive": true, "date": "2023-09-01" }
      ],
      "eventParticipation": [
        { "id": 5, "eventName": "Drill Competition", "date": "2023-04-15", "hours": 8 },
        { "id": 6, "eventName": "Community Clean-up", "date": "2023-05-20", "hours": 4 }
      ]
    },
    {
      "id": 4,
      "firstName": "Sophia",
      "lastName": "Patel",
      "email": "sophia.patel@example.com",
      "rank": "Cadet Ensign",
      "dateOfBirth": "2006-07-18",
      "grade": "11",
      "nsLevel": "NS3",
      "leadershipPosition": "Public Affairs Officer",
      "platoon": 1,
      "familyMembers": [
        { "relation": "Mother", "name": "Priya Patel", "contact": "555-7890" },
        { "relation": "Father", "name": "Raj Patel", "contact": "555-4321" }
      ],
      "photos": [
        { "id": 6, "url": "/path/to/sophia1.jpg", "isActive": true, "date": "2023-08-20" },
        { "id": 7, "url": "/path/to/sophia2.jpg", "isActive": false, "date": "2022-08-25" }
      ],
      "eventParticipation": [
        { "id": 7, "eventName": "STEM Workshop", "date": "2023-06-05", "hours": 6 },
        { "id": 8, "eventName": "Color Guard", "date": "2023-09-11", "hours": 3 }
      ]
    },
    {
      "id": 5,
      "firstName": "Jamal",
      "lastName": "Washington",
      "email": "jamal.washington@example.com",
      "rank": "Cadet Seaman",
      "dateOfBirth": "2008-02-14",
      "grade": "9",
      "nsLevel": "NS1",
      "leadershipPosition": "Squad Member",
      "platoon": 3,
      "familyMembers": [
        { "relation": "Mother", "name": "Tanya Washington", "contact": "555-2222" },
        { "relation": "Grandmother", "name": "Eleanor Washington", "contact": "555-3333" }
      ],
      "photos": [
        { "id": 8, "url": "/path/to/jamal1.jpg", "isActive": true, "date": "2023-09-05" }
      ],
      "eventParticipation": [
        { "id": 9, "eventName": "Orientation Camp", "date": "2023-08-25", "hours": 16 }
      ]
    },
    {
      "id": 6,
      "firstName": "Olivia",
      "lastName": "Nguyen",
      "email": "olivia.nguyen@example.com",
      "rank": "Cadet Petty Officer Second Class",
      "dateOfBirth": "2007-05-30",
      "grade": "10",
      "nsLevel": "NS2",
      "leadershipPosition": "Academic Team Captain",
      "platoon": 2,
      "familyMembers": [
        { "relation": "Father", "name": "Thomas Nguyen", "contact": "555-7777" },
        { "relation": "Mother", "name": "Hannah Nguyen", "contact": "555-8888" }
      ],
      "photos": [
        { "id": 9, "url": "/path/to/olivia1.jpg", "isActive": true, "date": "2023-08-10" },
        { "id": 10, "url": "/path/to/olivia2.jpg", "isActive": false, "date": "2022-08-15" }
      ],
      "eventParticipation": [
        { "id": 10, "eventName": "Academic Competition", "date": "2023-05-12", "hours": 5 },
        { "id": 11, "eventName": "Leadership Symposium", "date": "2023-07-20", "hours": 8 }
      ]
    },
    {
      "id": 7,
      "firstName": "Ethan",
      "lastName": "Kowalski",
      "email": "ethan.kowalski@example.com",
      "rank": "Cadet Lieutenant Junior Grade",
      "dateOfBirth": "2006-09-08",
      "grade": "11",
      "nsLevel": "NS3",
      "leadershipPosition": "Operations Officer",
      "platoon": 1,
      "familyMembers": [
        { "relation": "Father", "name": "Mark Kowalski", "contact": "555-4444" },
        { "relation": "Mother", "name": "Sophie Kowalski", "contact": "555-5555" }
      ],
      "photos": [
        { "id": 11, "url": "/path/to/ethan1.jpg", "isActive": true, "date": "2023-09-01" }
      ],
      "eventParticipation": [
        { "id": 12, "eventName": "Physical Fitness Competition", "date": "2023-04-22", "hours": 6 },
        { "id": 13, "eventName": "Memorial Day Ceremony", "date": "2023-05-29", "hours": 4 }
      ]
    },
    {
      "id": 8,
      "firstName": "Isabella",
      "lastName": "Garcia",
      "email": "isabella.garcia@example.com",
      "rank": "Cadet Seaman Apprentice",
      "dateOfBirth": "2008-12-03",
      "grade": "9",
      "nsLevel": "NS1",
      "leadershipPosition": "Drill Team Member",
      "platoon": 3,
      "familyMembers": [
        { "relation": "Mother", "name": "Elena Garcia", "contact": "555-9999" },
        { "relation": "Father", "name": "Miguel Garcia", "contact": "555-0000" }
      ],
      "photos": [
        { "id": 12, "url": "/path/to/isabella1.jpg", "isActive": true, "date": "2023-09-10" }
      ],
      "eventParticipation": [
        { "id": 14, "eventName": "Drill Practice", "date": "2023-09-05", "hours": 2 },
        { "id": 15, "eventName": "School Open House", "date": "2023-08-28", "hours": 3 }
      ]
    },
    {
      "id": 9,
      "firstName": "Alexander",
      "lastName": "Kim",
      "email": "alexander.kim@example.com",
      "rank": "Cadet Petty Officer First Class",
      "dateOfBirth": "2007-01-25",
      "grade": "10",
      "nsLevel": "NS2",
      "leadershipPosition": "Supply Officer",
      "platoon": 2,
      "familyMembers": [
        { "relation": "Father", "name": "James Kim", "contact": "555-1111" },
        { "relation": "Mother", "name": "Yoon Kim", "contact": "555-2222" }
      ],
      "photos": [
        { "id": 13, "url": "/path/to/alexander1.jpg", "isActive": true, "date": "2023-08-05" },
        { "id": 14, "url": "/path/to/alexander2.jpg", "isActive": false, "date": "2022-08-10" }
      ],
      "eventParticipation": [
        { "id": 16, "eventName": "Uniform Inspection", "date": "2023-09-15", "hours": 1 },
        { "id": 17, "eventName": "Community Food Drive", "date": "2023-06-10", "hours": 5 }
      ]
    },
    {
      "id": 10,
      "firstName": "Zoe",
      "lastName": "Thompson",
      "email": "zoe.thompson@example.com",
      "rank": "Cadet Seaman",
      "dateOfBirth": "2008-08-17",
      "grade": "9",
      "nsLevel": "NS1",
      "leadershipPosition": "Color Guard Member",
      "platoon": 3,
      "familyMembers": [
        { "relation": "Mother", "name": "Samantha Thompson", "contact": "555-3333" },
        { "relation": "Father", "name": "Robert Thompson", "contact": "555-4444" }
      ],
      "photos": [
        { "id": 15, "url": "/path/to/zoe1.jpg", "isActive": true, "date": "2023-09-20" }
      ],
      "eventParticipation": [
        { "id": 18, "eventName": "Flag Raising Ceremony", "date": "2023-09-11", "hours": 1 },
        { "id": 19, "eventName": "New Cadet Orientation", "date": "2023-08-30", "hours": 4 }
      ]
    }
];

const ManageCadets = () => {
  const [cadets, setCadets] = useState(initialCadets);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCadet, setEditingCadet] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterConfig, setFilterConfig] = useState({ nsLevel: 'all', platoon: 'all' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCadets = useMemo(() => {
    let filteredCadets = cadets.filter(cadet =>
      (cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cadet.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterConfig.nsLevel === 'all' || cadet.nsLevel === filterConfig.nsLevel) &&
      (filterConfig.platoon === 'all' || cadet.platoon.toString() === filterConfig.platoon)
    );

    if (sortConfig.key !== null) {
      filteredCadets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredCadets;
  }, [cadets, searchTerm, sortConfig, filterConfig]);

  const handleEditCadet = (cadet) => {
    setEditingCadet(cadet ? {...cadet} : { familyMembers: [], photos: [], eventParticipation: [] });
  };

  const handleSaveCadet = () => {
    if (editingCadet.id) {
      setCadets(cadets.map(cadet => cadet.id === editingCadet.id ? editingCadet : cadet));
    } else {
      setCadets([...cadets, {...editingCadet, id: Date.now()}]);
    }
    setEditingCadet(null);
  };

  const handleDeleteCadet = (id) => {
    setCadets(cadets.filter(cadet => cadet.id !== id));
    setEditingCadet(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingCadet({...editingCadet, [name]: value});
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const updatedFamilyMembers = [...editingCadet.familyMembers];
    updatedFamilyMembers[index] = {...updatedFamilyMembers[index], [field]: value};
    setEditingCadet({...editingCadet, familyMembers: updatedFamilyMembers});
  };

  const addFamilyMember = () => {
    setEditingCadet({
      ...editingCadet,
      familyMembers: [...editingCadet.familyMembers, { relation: '', name: '', contact: '' }]
    });
  };

  const removeFamilyMember = (index) => {
    const updatedFamilyMembers = [...editingCadet.familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setEditingCadet({...editingCadet, familyMembers: updatedFamilyMembers});
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = {
          id: Date.now(),
          url: reader.result,
          isActive: editingCadet.photos.length === 0, // Set as active if it's the first photo
          date: new Date().toISOString().split('T')[0]
        };
        setEditingCadet({
          ...editingCadet,
          photos: [...editingCadet.photos, newPhoto]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const setActivePhoto = (photoId) => {
    const updatedPhotos = editingCadet.photos.map(photo => ({
      ...photo,
      isActive: photo.id === photoId
    }));
    setEditingCadet({...editingCadet, photos: updatedPhotos});
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = editingCadet.photos.filter(photo => photo.id !== photoId);
    setEditingCadet({...editingCadet, photos: updatedPhotos});
  };

  const addEventParticipation = () => {
    setEditingCadet({
      ...editingCadet,
      eventParticipation: [...editingCadet.eventParticipation, { id: Date.now(), eventName: '', date: '', hours: 0 }]
    });
  };

  const handleEventParticipationChange = (index, field, value) => {
    const updatedEventParticipation = [...editingCadet.eventParticipation];
    updatedEventParticipation[index] = {...updatedEventParticipation[index], [field]: value};
    setEditingCadet({...editingCadet, eventParticipation: updatedEventParticipation});
  };

  const removeEventParticipation = (index) => {
    const updatedEventParticipation = [...editingCadet.eventParticipation];
    updatedEventParticipation.splice(index, 1);
    setEditingCadet({...editingCadet, eventParticipation: updatedEventParticipation});
  };

  const calculateTotalHours = useCallback((period) => {
    const now = new Date();
    const events = editingCadet.eventParticipation;
    let totalHours = 0;

    events.forEach(event => {
      const eventDate = new Date(event.date);
      switch (period) {
        case 'week':
          if (now - eventDate <= 7 * 24 * 60 * 60 * 1000) totalHours += event.hours;
          break;
        case 'month':
          if (now.getMonth() === eventDate.getMonth() && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
          break;
        case 'quarter':
          if (Math.floor(now.getMonth() / 3) === Math.floor(eventDate.getMonth() / 3) && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
          break;
        case 'semester':
          // Assuming semesters are Jan-Jun and Jul-Dec
          if (Math.floor(now.getMonth() / 6) === Math.floor(eventDate.getMonth() / 6) && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
          break;
        case 'schoolYear':
          // Assuming school year is Sep-Aug
          const schoolYearStart = new Date(now.getFullYear(), 8, 1); // September 1st
          if (eventDate >= schoolYearStart || (eventDate < now && eventDate >= new Date(schoolYearStart.getFullYear() - 1, 8, 1))) totalHours += event.hours;
          break;
      }
    });

    return totalHours;
  }, [editingCadet]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search cadets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className={styles.searchIcon} />
      </div>
      <div className={styles.filters}>
        <select
          className={styles.select}
          value={filterConfig.nsLevel}
          onChange={(e) => setFilterConfig({...filterConfig, nsLevel: e.target.value})}
        >
          <option value="all">All NS Levels</option>
          <option value="NS1">NS1</option>
          <option value="NS2">NS2</option>
          <option value="NS3">NS3</option>
          <option value="NS4">NS4</option>
        </select>
        <select
          className={styles.select}
          value={filterConfig.platoon}
          onChange={(e) => setFilterConfig({...filterConfig, platoon: e.target.value})}
        >
          <option value="all">All Platoons</option>
          <option value="1">Platoon 1</option>
          <option value="2">Platoon 2</option>
          <option value="3">Platoon 3</option>
        </select>
      </div>
      <button className={styles.button} onClick={() => handleEditCadet(null)}><Add /> Add Cadet</button>
      <table className={styles.table}>
        <thead>
        <tr>
          {['Name', 'Rank', 'NS Level', 'Platoon'].map((header) => (
            <th
              key={header}
              className={styles.th}
              onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
            >
              {header}
              {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                sortConfig.direction === 'ascending' ? <KeyboardArrowUp /> : <KeyboardArrowDown />
              )}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredAndSortedCadets.map(cadet => (
          <tr key={cadet.id} className={styles.tr} onClick={() => handleEditCadet(cadet)}>
            <td className={styles.td}>{`${cadet.firstName} ${cadet.lastName}`}</td>
            <td className={styles.td}>{cadet.rank}</td>
            <td className={styles.td}>{cadet.nsLevel}</td>
            <td className={styles.td}>{cadet.platoon}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {editingCadet && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>{editingCadet.id ? 'Edit Cadet' : 'Add Cadet'}</h3>
            <form className={styles.form}>
              <div className={styles.formGrid}>
                {['firstName', 'lastName', 'email', 'rank', 'dateOfBirth', 'grade', 'nsLevel', 'leadershipPosition', 'platoon'].map((field) => (
                  <div key={field} className={styles.formGroup}>
                    <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      className={styles.input}
                      name={field}
                      value={editingCadet[field] || ''}
                      onChange={handleInputChange}
                      type={field === 'dateOfBirth' ? 'date' : field === 'platoon' ? 'number' : 'text'}
                    />
                  </div>
                ))}
              </div>

              <h4 className={styles.subheader}>Family Members</h4>
              {editingCadet.familyMembers.map((member, index) => (
                <div key={index} className={styles.familyMember}>
                  {['relation', 'name', 'contact'].map((field) => (
                    <input
                      key={field}
                      className={styles.input}
                      value={member[field]}
                      onChange={(e) => handleFamilyMemberChange(index, field, e.target.value)}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  ))}
                  <button className={`${styles.button} ${styles.deleteButton}`} type="button" onClick={() => removeFamilyMember(index)}>
                    <Delete /> Remove
                  </button>
                </div>
              ))}
              <button className={`${styles.button} ${styles.addButton}`} type="button" onClick={addFamilyMember}>
                <Add /> Add Family Member
              </button>

              <h4 className={styles.subheader}>Photos</h4>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className={`${styles.button} ${styles.uploadButton}`}>
                <PhotoCamera /> Upload Photo
              </label>
              <div className={styles.photoGrid}>
                {editingCadet.photos.map(photo => (
                  <div key={photo.id} className={styles.photoItem}>
                    <img src={photo.url} alt="Cadet" className={styles.photo} />
                    <img src={photo.url} alt="Cadet" className={styles.photo} />
                    <div className={styles.photoActions}>
                      <button
                        className={`${styles.button} ${photo.isActive ? styles.activeButton : styles.inactiveButton}`}
                        onClick={() => setActivePhoto(photo.id)}
                      >
                        {photo.isActive ? 'Active' : 'Set Active'}
                      </button>
                      <button
                        className={`${styles.button} ${styles.deleteButton}`}
                        onClick={() => removePhoto(photo.id)}
                      >
                        <Delete />
                      </button>
                    </div>
                    <p className={styles.photoDate}>Uploaded: {photo.date}</p>
                  </div>
                ))}
              </div>

              <h4 className={styles.subheader}>Event Participation</h4>
              {editingCadet.eventParticipation.map((event, index) => (
                <div key={event.id} className={styles.eventItem}>
                  <input
                    className={styles.input}
                    value={event.eventName}
                    onChange={(e) => handleEventParticipationChange(index, 'eventName', e.target.value)}
                    placeholder="Event Name"
                  />
                  <input
                    className={styles.input}
                    type="date"
                    value={event.date}
                    onChange={(e) => handleEventParticipationChange(index, 'date', e.target.value)}
                  />
                  <input
                    className={styles.input}
                    type="number"
                    value={event.hours}
                    onChange={(e) => handleEventParticipationChange(index, 'hours', parseInt(e.target.value))}
                    placeholder="Hours"
                  />
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    type="button"
                    onClick={() => removeEventParticipation(index)}
                  >
                    <Delete /> Remove
                  </button>
                </div>
              ))}
              <button className={`${styles.button} ${styles.addButton}`} type="button" onClick={addEventParticipation}>
                <Add /> Add Event Participation
              </button>

              <h4 className={styles.subheader}>Total Hours</h4>
              <div className={styles.totalHours}>
                <p>This Week: {calculateTotalHours('week')}</p>
                <p>This Month: {calculateTotalHours('month')}</p>
                <p>This Quarter: {calculateTotalHours('quarter')}</p>
                <p>This Semester: {calculateTotalHours('semester')}</p>
                <p>This School Year: {calculateTotalHours('schoolYear')}</p>
              </div>

              <div className={styles.buttonGroup}>
                {editingCadet.id && (
                  <button className={`${styles.button} ${styles.deleteButton}`} type="button" onClick={() => handleDeleteCadet(editingCadet.id)}>
                    <Delete /> Delete Cadet
                  </button>
                )}
                <button className={`${styles.button} ${styles.saveButton}`} type="button" onClick={handleSaveCadet}>
                  <Save /> Save
                </button>
                <button className={`${styles.button} ${styles.cancelButton}`} type="button" onClick={() => setEditingCadet(null)}>
                  <Cancel /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCadets;
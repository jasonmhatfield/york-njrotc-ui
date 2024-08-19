import React, {useEffect, useState} from 'react';
import {Add, Close, Delete, Event, People, PhotoCamera, Save} from '@mui/icons-material';
import '../styles/ManageCadets.css';
import '../styles/Modal.css';

const ManageCadets = () => {
  const [cadets, setCadets] = useState([]);
  const [filteredCadets, setFilteredCadets] = useState([]);
  const [editingCadet, setEditingCadet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [filters, setFilters] = useState({nsLevel: 'all', platoon: 'all'});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch cadets data here
    // For now, we'll use dummy data
    const dummyCadets = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        rank: 'Cadet',
        dateOfBirth: '2005-05-15',
        grade: 10,
        nsLevel: 'NS1',
        leadershipPosition: 'Squad Leader',
        platoon: 1
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        rank: 'Cadet Officer',
        leadershipPosition: 'Platoon Commander',
        platoon: 2
      },
    ];
    setCadets(dummyCadets);
    setFilteredCadets(dummyCadets);
  }, []);

  useEffect(() => {
    const filtered = cadets.filter(cadet => {
      const matchesSearch = cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNSLevel = filters.nsLevel === 'all' || cadet.nsLevel === filters.nsLevel;
      const matchesPlatoon = filters.platoon === 'all' || cadet.platoon.toString() === filters.platoon;
      return matchesSearch && matchesNSLevel && matchesPlatoon;
    });
    setFilteredCadets(filtered);
  }, [cadets, filters, searchTerm]);

  const openModal = (cadet = null) => {
    setEditingCadet(cadet || {familyMembers: [], photos: [], eventParticipation: []});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCadet(null);
    setIsModalOpen(false);
    setActiveTab('basic');
    setShowDeleteConfirmation(false);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditingCadet(prev => ({...prev, [name]: value}));
  };

  const handleSave = () => {
    if (editingCadet.id) {
      setCadets(cadets.map(c => c.id === editingCadet.id ? editingCadet : c));
    } else {
      setCadets([...cadets, {...editingCadet, id: Date.now()}]);
    }
    closeModal();
  };

  const handleDelete = () => {
    setCadets(cadets.filter(c => c.id !== editingCadet.id));
    closeModal();
  };

  const handleFilterChange = (e) => {
    const {name, value} = e.target;
    setFilters(prev => ({...prev, [name]: value}));
  };

  return (
    <div className = "manage-cadets">
      <div className = "filters">
        <input
          type = "text"
          placeholder = "Search cadets..."
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
        />
        <select name = "nsLevel" value = {filters.nsLevel} onChange = {handleFilterChange}>
          <option value = "all">All NS Levels</option>
          <option value = "NS1">NS1</option>
          <option value = "NS2">NS2</option>
          <option value = "NS3">NS3</option>
          <option value = "NS4">NS4</option>
        </select>
        <select name = "platoon" value = {filters.platoon} onChange = {handleFilterChange}>
          <option value = "all">All Platoons</option>
          <option value = "1">Platoon 1</option>
          <option value = "2">Platoon 2</option>
          <option value = "3">Platoon 3</option>
        </select>
      </div>
      <button className = "add-button" onClick = {() => openModal()}>
        <Add/> Add Cadet
      </button>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Rank</th>
          <th>NS Level</th>
          <th>Platoon</th>
          <th>Leadership Position</th>
        </tr>
        </thead>
        <tbody>
        {filteredCadets.map(cadet => (
          <tr key = {cadet.id} onClick = {() => openModal(cadet)} className = "clickable-row">
            <td>{`${cadet.firstName} ${cadet.lastName}`}</td>
            <td>{cadet.rank}</td>
            <td>{cadet.nsLevel}</td>
            <td>{cadet.platoon}</td>
            <td>{cadet.leadershipPosition}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className = "modal-overlay">
          <div className = "modal-content">
            <div className = "tabs">
              <button className = {`tab ${activeTab === 'basic' ? 'active' : ''}`}
                      onClick = {() => setActiveTab('basic')}>Basic Info
              </button>
              <button className = {`tab ${activeTab === 'family' ? 'active' : ''}`}
                      onClick = {() => setActiveTab('family')}><People/> Family
              </button>
              <button className = {`tab ${activeTab === 'events' ? 'active' : ''}`}
                      onClick = {() => setActiveTab('events')}><Event/> Events
              </button>
              <button className = {`tab ${activeTab === 'photos' ? 'active' : ''}`}
                      onClick = {() => setActiveTab('photos')}><PhotoCamera/> Photos
              </button>
            </div>
            <form>
              {activeTab === 'basic' && (
                <div className = "form-grid">
                  <div className = "form-group">
                    <label htmlFor = "firstName">First Name</label>
                    <input
                      type = "text"
                      id = "firstName"
                      name = "firstName"
                      value = {editingCadet.firstName || ''}
                      onChange = {handleInputChange}
                    />
                  </div>
                  <div className = "form-group">
                    <label htmlFor = "lastName">Last Name</label>
                    <input
                      type = "text"
                      id = "lastName"
                      name = "lastName"
                      value = {editingCadet.lastName || ''}
                      onChange = {handleInputChange}
                    />
                  </div>
                  <div className = "form-group">
                    <label htmlFor = "rank">Rank</label>
                    <input
                      type = "text"
                      id = "rank"
                      name = "rank"
                      value = {editingCadet.rank || ''}
                      onChange = {handleInputChange}
                    />
                  </div>
                  <div className = "form-group">
                    <label htmlFor = "leadershipPosition">Leadership Position</label>
                    <input
                      type = "text"
                      id = "leadershipPosition"
                      name = "leadershipPosition"
                      value = {editingCadet.leadershipPosition || ''}
                      onChange = {handleInputChange}
                    />
                  </div>
                  <div className = "form-group">
                    <label htmlFor = "platoon">Platoon</label>
                    <input
                      type = "number"
                      id = "platoon"
                      name = "platoon"
                      value = {editingCadet.platoon || ''}
                      onChange = {handleInputChange}
                    />
                  </div>
                </div>
              )}
              {activeTab === 'family' && (
                <div className = "family-members">
                  <h3>Family Members</h3>
                  <p>Family members management will be implemented here.</p>
                </div>
              )}
              {activeTab === 'events' && (
                <div className = "event-participation">
                  <h3>Event Participation</h3>
                  <p>Event participation management will be implemented here.</p>
                </div>
              )}
              {activeTab === 'photos' && (
                <div className = "photos">
                  <h3>Photos</h3>
                  <p>Photo management will be implemented here.</p>
                </div>
              )}
            </form>
            <div className = "modal-actions">
              <button className = "cadet-save-button" onClick = {handleSave}>
                <Save/> Save
              </button>
              {editingCadet.id && (
                <button className = "cadet-delete-button" onClick = {() => setShowDeleteConfirmation(true)}>
                  <Delete/> Delete
                </button>
              )}
              <button className = "cadet-close-button" onClick = {closeModal}>
                <Close/> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className = "modal-overlay">
          <div className = "confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this cadet? This action cannot be undone.</p>
            <div className = "confirmation-actions">
              <button className = "confirm-delete" onClick = {handleDelete}>Yes, Delete</button>
              <button className = "cancel-delete" onClick = {() => setShowDeleteConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCadets;
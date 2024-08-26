import React, { useEffect, useState } from 'react';
import { AccountCircle, Add, Close, Save } from '@mui/icons-material';
import './styles/AdminDashboard.component.css';

const ManageCadets = () => {
  const [cadets, setCadets] = useState([]);
  const [editingCadet, setEditingCadet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatoon, setFilterPlatoon] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ranks, setRanks] = useState([]);
  const [positions, setPositions] = useState([]);

  const platoons = ['ALPHA', 'BRAVO', 'CHARLIE'];
  const statuses = ['ACTIVE', 'INACTIVE', 'GRADUATED'];

  useEffect(() => {
    fetchData('cadets', setCadets, formatCadetsData);
    fetchData('ranks', setRanks);
    fetchData('positions', data => setPositions(data.sort((a, b) => a.precedence - b.precedence))); // Order positions by precedence
  }, []);

  const fetchData = async (endpoint, setData, formatter = data => data) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await response.json();
      setData(formatter(data));
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const formatCadetsData = data =>
    data.map(cadet => ({
      ...cadet,
      platoon: cadet.platoon || '',
      status: cadet.status || '',
    }));

  const formatPlatoonDisplay = (platoon) => {
    return platoon.charAt(0).toUpperCase() + platoon.slice(1).toLowerCase();
  };

  const formatPlatoonForBackend = (platoon) => {
    return platoon.toUpperCase();
  };

  const formatStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatStatusForBackend = (status) => {
    return status.toUpperCase();
  };

  const openModal = (cadet = null) => {
    setEditingCadet(cadet ? { ...cadet } : createEmptyCadet());
    setIsModalOpen(true);
    setIsFormChanged(false);
    setUploadedImage(null);
  };

  const createEmptyCadet = () => ({
    firstName: '',
    lastName: '',
    rank: null,
    platoon: '',
    status: '',
    photoUrl: '',
    leadershipPosition: '',
    cadetPosition: null
  });

  const closeModal = () => {
    setEditingCadet(null);
    setIsModalOpen(false);
    setUploadedImage(null);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setEditingCadet(prev => ({
      ...prev,
      [name]: name === 'rank'
        ? ranks.find(r => r.id.toString() === value) || null
        : name === 'platoon'
          ? formatPlatoonForBackend(value)
          : name === 'status'
            ? formatStatusForBackend(value)
            : name === 'cadetPosition'
              ? positions.find(p => p.id.toString() === value) || null
              : value
    }));
    setIsFormChanged(true);
  };

  const handleSave = async () => {
    const method = editingCadet.id ? 'PUT' : 'POST';
    const url = editingCadet.id
      ? `http://localhost:8080/api/cadets/${editingCadet.id}`
      : `http://localhost:8080/api/cadets`;

    const { firstName, lastName, status, platoon, photoUrl, rank, leadershipPosition, cadetPosition } = editingCadet;

    const imageName = photoUrl ? photoUrl.split('/').pop().split('?')[0] : null;

    const payload = {
      firstName: firstName || "",
      lastName: lastName || "",
      status: status || null,
      platoon: platoon || null,
      photoUrl: imageName || "",
      rank: rank || null,
      leadershipPosition: leadershipPosition || "",
      cadetPosition: cadetPosition || null
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to save cadet');
      }

      const updatedCadet = await response.json();
      setCadets(prevCadets =>
        editingCadet.id
          ? prevCadets.map(cadet => (cadet.id === updatedCadet.id ? updatedCadet : cadet))
          : [...prevCadets, updatedCadet]
      );

      setEditingCadet(updatedCadet);
      setIsFormChanged(false);

      if (uploadedImage) {
        handleImageUploadDirectly(uploadedImage, updatedCadet.id);
      } else {
        closeModal();
      }

      fetchData('cadets', setCadets, formatCadetsData);
    } catch (error) {
      console.error('Error saving cadet:', error);
      alert(`Failed to save cadet: ${error.message}`);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImage(file);

    if (!editingCadet.id) {
      await handleSave();
    }

    if (!editingCadet.id) return;

    handleImageUploadDirectly(file, editingCadet.id);
  };

  const handleImageUploadDirectly = async (file, cadetId) => {
    if (!file || !cadetId) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8080/api/cadets/${cadetId}/uploadImage`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const updatedPhotoUrl = await response.text();
      setEditingCadet(prev => ({ ...prev, photoUrl: updatedPhotoUrl }));
      setUploadedImage(updatedPhotoUrl);
      setIsFormChanged(false);
      closeModal();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    }
  };

  const filteredCadets = cadets.filter(({ firstName, lastName, platoon, status }) =>
    `${firstName} ${lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterPlatoon || platoon === filterPlatoon) &&
    (!filterStatus || status === filterStatus)
  );

  return (
    <div className="manage-cadets">
      <div className="filter-add-section">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterPlatoon} onChange={e => setFilterPlatoon(e.target.value)}>
          <option value="">Select All Platoons</option>
          {platoons.map(platoon => (
            <option key={platoon} value={platoon}>{formatPlatoonDisplay(platoon)}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Select All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{formatStatusDisplay(status)}</option>
          ))}
        </select>
        <button className="add-button" onClick={() => openModal()}>
          <Add /> Add Cadet
        </button>
      </div>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Rank</th>
          <th>Platoon</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {filteredCadets.map(cadet => (
          <tr key={cadet.id} onClick={() => openModal(cadet)} className="clickable-row">
            <td>{`${cadet.firstName} ${cadet.lastName}`}</td>
            <td>{cadet.rank ? cadet.rank.rankName : 'N/A'}</td>
            <td>{formatPlatoonDisplay(cadet.platoon)}</td>
            <td>{formatStatusDisplay(cadet.status)}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-image-section">
              {(uploadedImage || editingCadet.photoUrl) ? (
                <img
                  src={uploadedImage || editingCadet.photoUrl}
                  alt="Cadet"
                  className="cadet-image"
                />
              ) : (
                <AccountCircle className="cadet-image" style={{ fontSize: '200px', color: '#ccc' }} />
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="image-upload-button"
                onClick={() => document.getElementById('imageUpload').click()}
              >
                {(uploadedImage || editingCadet.photoUrl) ? 'Replace Image' : 'Upload Image'}
              </button>
            </div>
            <div className="modal-form-section">
              <form className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editingCadet.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editingCadet.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rank">Rank</label>
                  <select
                    id="rank"
                    name="rank"
                    value={editingCadet.rank ? editingCadet.rank.id : ''}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>Select a Rank</option>
                    {ranks.map(rank => (
                      <option key={rank.id} value={rank.id}>{rank.rankName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="platoon">Platoon</label>
                  <select
                    id="platoon"
                    name="platoon"
                    value={editingCadet.platoon}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>Select a Platoon</option>
                    {platoons.map(platoon => (
                      <option key={platoon} value={platoon}>{formatPlatoonDisplay(platoon)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editingCadet.status}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>Select a Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{formatStatusDisplay(status)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cadetPosition">Position</label>
                  <select
                    id="cadetPosition"
                    name="cadetPosition"
                    value={editingCadet.cadetPosition ? editingCadet.cadetPosition.id : ''}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>Select a Position</option>
                    {positions.map(position => (
                      <option key={position.id} value={position.id}>{position.position}</option>
                    ))}
                  </select>
                </div>
              </form>
              <div className="modal-actions">
                <button className="cadet-save-button" onClick={handleSave} disabled={!isFormChanged}>
                  <Save /> Save
                </button>
                <button className="cadet-close-button" onClick={closeModal}>
                  <Close /> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCadets;

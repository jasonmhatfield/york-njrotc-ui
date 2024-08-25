import React, { useEffect, useState } from 'react';
import { Add, Close, Save, AccountCircle } from '@mui/icons-material';
import './styles/AdminDashboard.component.css';

const ManageCadets = ({ cadetData }) => {
  const [cadets, setCadets] = useState(cadetData || []);
  const [editingCadet, setEditingCadet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatoon, setFilterPlatoon] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (cadetData) {
      setCadets(cadetData);
    }
  }, [cadetData]);

  const openModal = (cadet = { firstName: '', lastName: '', rank: '', platoon: '', status: 'ACTIVE', photoUrl: '' }) => {
    setEditingCadet(cadet);
    setIsModalOpen(true);
    setIsFormChanged(false);
    setUploadedImage(null);
  };

  const closeModal = () => {
    setEditingCadet(null);
    setIsModalOpen(false);
    setUploadedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCadet(prev => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  const handleSave = async () => {
    try {
      const method = editingCadet.id ? 'PUT' : 'POST';
      const url = editingCadet.id ? `http://localhost:8080/api/cadets/${editingCadet.id}` : 'http://localhost:8080/api/cadets';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCadet),
      });

      if (!response.ok) throw new Error('Failed to save cadet');

      const updatedCadet = await response.json();
      setCadets(prevCadets =>
        editingCadet.id
          ? prevCadets.map(c => (c.id === updatedCadet.id ? updatedCadet : c))
          : [...prevCadets, updatedCadet]
      );
      closeModal();
    } catch (error) {
      console.error('Error saving cadet:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8080/api/cadets/${editingCadet.id}/uploadImage`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const updatedPhotoUrl = await response.text();

      setEditingCadet(prev => ({ ...prev, photoUrl: updatedPhotoUrl }));
      setCadets(prevCadets =>
        prevCadets.map(c => (c.id === editingCadet.id ? { ...c, photoUrl: updatedPhotoUrl } : c))
      );
      setUploadedImage(updatedPhotoUrl);
      setIsFormChanged(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Optionally, show an error message to the user
    }
  };

  const filteredCadets = cadets.filter(cadet => {
    return (
      (cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPlatoon ? cadet.platoon === filterPlatoon : true) &&
      (filterStatus ? cadet.status === filterStatus : true)
    );
  });

  const uniquePlatoons = [...new Set(cadets.map(cadet => cadet.platoon))];

  return (
    <div className="manage-cadets">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterPlatoon} onChange={(e) => setFilterPlatoon(e.target.value)}>
          <option value="">All Platoons</option>
          {uniquePlatoons.map(platoon => (
            <option key={platoon} value={platoon}>{platoon}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="GRADUATED">Graduated</option>
        </select>
      </div>
      <button className="add-button" onClick={() => openModal()}>
        <Add /> Add Cadet
      </button>
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
            <td>{cadet.platoon}</td>
            <td>{cadet.status}</td>
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
                    value={editingCadet.firstName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editingCadet.lastName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rank">Rank</label>
                  <select
                    id="rank"
                    name="rank"
                    value={editingCadet.rank ? editingCadet.rank.rankName : ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Rank</option>
                    <option value="Ensign">Ensign</option>
                    <option value="Lieutenant">Lieutenant</option>
                    {/* Add more rank options as needed */}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="platoon">Platoon</label>
                  <input
                    type="text"
                    id="platoon"
                    name="platoon"
                    value={editingCadet.platoon || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editingCadet.status || 'ACTIVE'}
                    onChange={handleInputChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="GRADUATED">Graduated</option>
                  </select>
                </div>
              </form>
              <div className="modal-actions">
                <button
                  className="cadet-save-button"
                  onClick={handleSave}
                  disabled={!isFormChanged}
                >
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
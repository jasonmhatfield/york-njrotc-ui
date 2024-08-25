import React, { useEffect, useState } from 'react';
import { Add, Close, Save, AccountCircle } from '@mui/icons-material';
import '../styles/AdminModal.component.css';

const ManageCadets = () => {
  const [cadets, setCadets] = useState([]);
  const [editingCadet, setEditingCadet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCadets = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cadets');
        const data = await response.json();
        setCadets(data);
      } catch (error) {
        console.error('Error fetching cadets:', error);
      }
    };
    fetchCadets();
  }, []);

  const openModal = (cadet = null) => {
    setEditingCadet(cadet || { firstName: '', lastName: '', rank: '', platoon: '', status: 'ACTIVE', photoUrl: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCadet(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCadet(prev => ({ ...prev, [name]: value }));
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
      setCadets(cadets.map(c => (c.id === updatedCadet.id ? updatedCadet : c)));
      closeModal();
    } catch (error) {
      console.error('Error saving cadet:', error);
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
      setCadets(cadets.map(c => (c.id === editingCadet.id ? { ...c, photoUrl: updatedPhotoUrl } : c)));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="manage-cadets">
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
        {cadets.map(cadet => (
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
                  {/* Options to be dynamically loaded */}
                  <option value="Ensign">Ensign</option>
                  <option value="Lieutenant">Lieutenant</option>
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
              <div className="image-section">
                {editingCadet.photoUrl ? (
                  <img
                    src={editingCadet.photoUrl}
                    alt="Cadet"
                    className="cadet-image"
                  />
                ) : (
                  <AccountCircle className="cadet-image" style={{ fontSize: '100px', color: '#ccc' }} />
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
                  {editingCadet.photoUrl ? 'Replace Image' : 'Upload Image'}
                </button>
              </div>
            </form>
            <div className="modal-actions">
              <button className="cadet-save-button" onClick={handleSave}>
                <Save /> Save
              </button>
              <button className="cadet-close-button" onClick={closeModal}>
                <Close /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCadets;

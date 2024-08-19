import React, { useState } from 'react';
import { Close, Save, Delete } from '@mui/icons-material';

const CadetModal = ({ cadet, onSave, onDelete, onClose }) => {
  const [editingCadet, setEditingCadet] = useState(cadet);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCadet(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingCadet.id ? 'Edit Cadet' : 'Add Cadet'}</h2>
        <button className="close-button" onClick={onClose}>
          <Close /> Close
        </button>
        <form>
          <div className="form-grid">
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editingCadet.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editingCadet.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rank">Rank</label>
              <input
                type="text"
                id="rank"
                name="rank"
                value={editingCadet.rank || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={editingCadet.dateOfBirth || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <input
                type="number"
                id="grade"
                name="grade"
                value={editingCadet.grade || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nsLevel">NS Level</label>
              <select
                id="nsLevel"
                name="nsLevel"
                value={editingCadet.nsLevel || ''}
                onChange={handleInputChange}
              >
                <option value="">Select NS Level</option>
                <option value="NS1">NS1</option>
                <option value="NS2">NS2</option>
                <option value="NS3">NS3</option>
                <option value="NS4">NS4</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="leadershipPosition">Leadership Position</label>
              <input
                type="text"
                id="leadershipPosition"
                name="leadershipPosition"
                value={editingCadet.leadershipPosition || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="platoon">Platoon</label>
              <input
                type="number"
                id="platoon"
                name="platoon"
                value={editingCadet.platoon || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className="modal-actions">
          <button className="save-button" onClick={() => onSave(editingCadet)}>
            <Save /> Save
          </button>
          {editingCadet.id && (
            <button className="delete-button" onClick={() => onDelete(editingCadet.id)}>
              <Delete /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CadetModal;
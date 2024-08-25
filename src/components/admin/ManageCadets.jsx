import React, {useEffect, useState} from 'react';
import {AccountCircle, Add, Close, Save} from '@mui/icons-material';
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

  const platoons = ['Alpha', 'Bravo', 'Charlie'];

  useEffect(() => {
    fetchCadets();
    fetchRanks();
  }, []);

  const fetchCadets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cadets');
      if (!response.ok) throw new Error('Failed to fetch cadets');
      const data = await response.json();
      const formattedData = data.map(cadet => ({
        ...cadet,
        platoon: cadet.platoon
          ? cadet.platoon.charAt(0).toUpperCase() + cadet.platoon.slice(1).toLowerCase()
          : '',
        status: cadet.status
          ? cadet.status.charAt(0).toUpperCase() + cadet.status.slice(1).toLowerCase()
          : ''
      }));
      setCadets(formattedData);
    } catch (error) {
      console.error('Error fetching cadets:', error);
    }
  };

  const fetchRanks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ranks');
      if (!response.ok) throw new Error('Failed to fetch ranks');
      const data = await response.json();
      setRanks(data);
    } catch (error) {
      console.error('Error fetching ranks:', error);
    }
  };

  const openModal = (cadet = null) => {
    if (cadet) {
      setEditingCadet({...cadet});
    } else {
      setEditingCadet({
        firstName: '',
        lastName: '',
        rank: null,
        platoon: '',
        status: 'ACTIVE',
        photoUrl: ''
      });
    }
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
    setEditingCadet(prev => {
      if (name === 'rank') {
        return {...prev, rank: ranks.find(r => r.id.toString() === value) || null};
      }
      return {...prev, [name]: value};
    });
    setIsFormChanged(true);
  };

  const handleSave = async () => {
    try {
      const method = editingCadet.id ? 'PUT' : 'POST';
      const url = editingCadet.id
        ? `http://localhost:8080/api/cadets/${editingCadet.id}`
        : `http://localhost:8080/api/cadets`;

      const { firstName, lastName, status, platoon, photoUrl, rank } = editingCadet;

      const imageName = photoUrl ? photoUrl.split('/').pop().split('?')[0] : null;

      const payload = {
        firstName: firstName || "",
        lastName: lastName || "",
        status: status ? status.toUpperCase() : "ACTIVE",
        platoon: platoon ? platoon.toUpperCase() : "ALPHA",
        photoUrl: imageName || "",
        rank: rank || null,
      };

      console.log('Payload:', payload);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
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
      closeModal();
      fetchCadets(); // Refresh the cadet list to ensure we have the latest data
    } catch (error) {
      console.error('Error saving cadet:', error);
      alert(`Failed to save cadet: ${error.message}`);
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
      setUploadedImage(updatedPhotoUrl);
      setIsFormChanged(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    }
  };

  const filteredCadets = cadets.filter(cadet => {
    const matchesSearchTerm = cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatoon = filterPlatoon ? cadet.platoon === filterPlatoon : true;
    const matchesStatus = filterStatus ? cadet.status === filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1).toLowerCase() : true;

    return matchesSearchTerm && matchesPlatoon && matchesStatus;
  });

  return (
    <div className="manage-cadets">
      <div className = "filter-add-section">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value = {filterPlatoon} onChange = {(e) => setFilterPlatoon(e.target.value)}>
          <option value = "">All Platoons</option>
          {platoons.map(platoon => (
            <option key = {platoon} value = {platoon}>{platoon}</option>
          ))}
        </select>
        <select value = {filterStatus} onChange = {(e) => setFilterStatus(e.target.value)}>
          <option value = "">All Statuses</option>
          <option value = "ACTIVE">Active</option>
          <option value = "INACTIVE">Inactive</option>
          <option value = "GRADUATED">Graduated</option>
        </select>
        <button className = "add-button" onClick = {() => openModal()}>
          <Add/> Add Cadet
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
          <tr key = {cadet.id} onClick = {() => openModal(cadet)} className = "clickable-row">
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
                    value = {editingCadet.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value = {editingCadet.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rank">Rank</label>
                  <select
                    id="rank"
                    name="rank"
                    value = {editingCadet.rank ? editingCadet.rank.id : ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Rank</option>
                    {ranks.map(rank => (
                      <option key = {rank.id} value = {rank.id}>{rank.rankName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="platoon">Platoon</label>
                  <select
                    id="platoon"
                    name="platoon"
                    value = {editingCadet.platoon}
                    onChange={handleInputChange}
                  >
                    <option value = "">Select Platoon</option>
                    {platoons.map(platoon => (
                      <option key = {platoon} value = {platoon.toUpperCase()}>{platoon}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value = {editingCadet.status}
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
}

export default ManageCadets;

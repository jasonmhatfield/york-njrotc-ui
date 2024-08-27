import React, {useEffect, useState} from 'react';
import {AccountCircle, Add, Close, Save} from '@mui/icons-material';
import './styles/AdminDashboard.component.css';
import {useAuth} from './context/AuthContext';

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [imageLoading, setImageLoading] = useState(false); // New state for image loading
  const { token } = useAuth();

  const platoons = ['Alpha', 'Bravo', 'Charlie'];
  const statuses = ['ACTIVE', 'INACTIVE', 'GRADUATED'];

  useEffect(() => {
    fetchData('cadets', setCadets, formatCadetsData);
    fetchData('ranks', setRanks);
    fetchData('positions', setPositions);
  }, []);

  const fetchData = async (endpoint, setData, formatter = data => data) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await response.json();
      const formattedData = formatter(data);

      if (endpoint === 'cadets') {
        formattedData.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }

      setData(formattedData);
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
  });

  const closeModal = () => {
    setEditingCadet(null);
    setIsModalOpen(false);
    setUploadedImage(null);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setEditingCadet(prev => ({
      ...prev,
      [name]: name === 'rank' ? ranks.find(r => r.id.toString() === value) || null : value
    }));
    setIsFormChanged(true);
  };

  const handleSave = async () => {
    const method = editingCadet.id ? 'PUT' : 'POST';
    const url = editingCadet.id
      ? `http://localhost:8080/api/cadets/${editingCadet.id}`
      : `http://localhost:8080/api/cadets`;

    const { firstName, lastName, status, platoon, photoUrl, rank, leadershipPosition } = editingCadet;

    const imageName = photoUrl ? photoUrl.split('/').pop().split('?')[0] : null;

    const payload = {
      firstName: firstName || "",
      lastName: lastName || "",
      status: status.toUpperCase(),
      platoon: platoon.toUpperCase(),
      photoUrl: imageName || "",
      rank: rank || null,
      leadershipPosition: leadershipPosition || "",
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
      setImageLoading(true); // Start loading

      const response = await fetch(`http://localhost:8080/api/cadets/${cadetId}/uploadImage`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure 'Bearer ' prefix
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const updatedPhotoUrl = await response.text();

      // Preload the new image
      const img = new Image();
      img.src = updatedPhotoUrl;
      img.onload = () => {
        setEditingCadet(prev => ({...prev, photoUrl: updatedPhotoUrl}));
        setImageLoading(false); // End loading immediately after load
      };

      setIsFormChanged(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
      setImageLoading(false); // End loading if there's an error
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCadets = React.useMemo(() => {
    if (sortConfig.key) {
      return [...cadets].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return cadets;
  }, [cadets, sortConfig]);

  const filteredCadets = sortedCadets.filter(({ firstName, lastName, platoon, status }) =>
    `${firstName} ${lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterPlatoon || platoon === filterPlatoon) &&
    (!filterStatus || status === filterStatus)
  );

  const formatPlatoonDisplay = (platoon) => platoon.charAt(0).toUpperCase() + platoon.slice(1).toLowerCase();
  const formatStatusDisplay = (status) => status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

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
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
          <tr>
            <th onClick={() => handleSort('firstName')} className="sortable">
              First Name {sortConfig.key === 'firstName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('lastName')} className="sortable">
              Last Name {sortConfig.key === 'lastName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('rank.rankName')} className="sortable">
              Rank {sortConfig.key === 'rank.rankName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('platoon')} className="sortable">
              Platoon {sortConfig.key === 'platoon' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('status')} className="sortable">
              Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
          </thead>
          <tbody>
          {filteredCadets.map(cadet => (
            <tr key={cadet.id} onClick={() => openModal(cadet)} className="clickable-row">
              <td>{cadet.firstName}</td>
              <td>{cadet.lastName}</td>
              <td>{cadet.rank ? cadet.rank.rankName : 'N/A'}</td>
              <td>{formatPlatoonDisplay(cadet.platoon)}</td>
              <td>{formatStatusDisplay(cadet.status)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-image-section">
              {
                imageLoading ? (
                  <div className = "image-placeholder">Loading...</div> // Placeholder while loading
                ) : (
                  editingCadet.photoUrl ? (
                    <img
                      src = {editingCadet.photoUrl}
                      alt = "Cadet"
                      className = "cadet-image loaded" // Always apply the loaded class
                    />
                  ) : (
                    <AccountCircle className = "cadet-image" style = {{fontSize: '200px', color: '#ccc'}}/>
                  )
                )
              }
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
                    <option value="">Select Rank</option>
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
                    <option value="">Select Platoon</option>
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
                    <option value="">Select Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{formatStatusDisplay(status)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="leadershipPosition">Leadership Position</label>
                  <select
                    id="leadershipPosition"
                    name="leadershipPosition"
                    value={editingCadet.leadershipPosition}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Position</option>
                    {positions.map(position => (
                      <option key={position.id} value={position.position}>{position.position}</option>
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const EntityManager = ({ entity = 'Item', apiEndpoint = '', fields = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [entities, setEntities] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const itemsPerPage = 10;
  const isNewForm = location.pathname.endsWith('/new');

  useEffect(() => {
    console.log('EntityManager props:', { entity, apiEndpoint, fields });
    if (!apiEndpoint) {
      setError('No API endpoint provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          console.log(`Fetching single ${entity} with id:`, id);
          const response = await axios.get(`${apiEndpoint}/${id}`);
          console.log(`Fetched ${entity}:`, response.data);
          setFormValues(response.data);
        } else if (!isNewForm) {
          console.log(`Fetching all ${entity} entities`);
          const response = await axios.get(apiEndpoint);
          console.log(`Fetched ${entity} list:`, response.data);
          setEntities(response.data.content || response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, apiEndpoint, isNewForm, entity]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${apiEndpoint}/${id}`, formValues);
      } else {
        await axios.post(apiEndpoint, formValues);
      }
      navigate(`/admin/${entity}`);
    } catch (error) {
      console.error('Error saving data:', error);
      setError(`Failed to save data: ${error.message}`);
    }
  };

  const handleDelete = async (entityId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${apiEndpoint}/${entityId}`);
        setEntities(entities.filter((entity) => entity.id !== entityId));
      } catch (error) {
        console.error('Error deleting data:', error);
        setError(`Failed to delete data: ${error.message}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const sortedEntities = [...entities].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedEntities = sortedEntities.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(sortedEntities.length / itemsPerPage);

  const getEntityKey = (entityItem, index) => {
    return entityItem.id || `${entity}-${index}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (fields.length === 0) {
    console.error('No fields defined for entity:', entity);
    return <div>Error: No fields defined for this entity.</div>;
  }

  if (id || isNewForm) {
    return (
      <div>
        <h2>{id ? `Edit ${entity}` : `New ${entity}`}</h2>
        <form onSubmit={handleSave}>
          {fields.map(({ name, label, type }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                value={formValues[name] || ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/admin/${entity}`)}>Cancel</button>
        </form>
      </div>
    );
  }

  return (
    <div className="entity-manager">
      <h2>{entity} List</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate(`/admin/${entity}/new`)}
      >
        Add New {entity}
      </button>
      {paginatedEntities.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
            <tr>
              {fields.map(({ name, label }) => (
                <th key={name} onClick={() => handleSort(name)} style={{ cursor: 'pointer' }}>
                  {label} {sortField === name && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              ))}
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {paginatedEntities.map((entityItem, index) => (
              <tr key={getEntityKey(entityItem, index)}>
                {fields.map(({ name }) => (
                  <td key={`${getEntityKey(entityItem, index)}-${name}`}>{entityItem[name]}</td>
                ))}
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => navigate(`/admin/${entity}/${entityItem.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entityItem.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span className="mx-3">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No {entity} found.</p>
      )}
    </div>
  );
};

export default EntityManager;
// src/components/admin/EntityManager.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EntityManager = ({ entityName, apiEndpoint, fields }) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formValues, setFormValues] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${apiEndpoint}/${id}`).then((response) => {
        setSelectedEntity(response.data);
        setFormValues(response.data);
      });
    } else {
      axios.get(apiEndpoint).then((response) => setEntities(response.data.content));
    }
  }, [id, apiEndpoint]);

  const handleSave = async () => {
    if (selectedEntity) {
      await axios.put(`${apiEndpoint}/${id}`, formValues);
    } else {
      await axios.post(apiEndpoint, formValues);
    }
    navigate(`/admin/${entityName}`);
  };

  const handleDelete = async (entityId) => {
    await axios.delete(`${apiEndpoint}/${entityId}`);
    setEntities(entities.filter((entity) => entity.id !== entityId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (id && !selectedEntity) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {id ? (
        <div>
          <h2>Edit {entityName}</h2>
          <form>
            {fields.map((field) => (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button type="button" onClick={handleSave}>Save</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{entityName} List</h2>
          <button onClick={() => navigate(`/admin/${entityName}/new`)}>Add New {entityName}</button>
          <table>
            <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {entities.map((entity) => (
              <tr key={entity.id}>
                {fields.map((field) => (
                  <td key={field.name}>{entity[field.name]}</td>
                ))}
                <td>
                  <button onClick={() => navigate(`/admin/${entityName}/${entity.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(entity.id)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EntityManager;

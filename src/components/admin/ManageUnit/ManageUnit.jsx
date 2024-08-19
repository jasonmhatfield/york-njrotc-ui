import React, { useState } from 'react';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { Button, Input, FormGrid, FormGroup, Label } from '../common/StyledComponents';
import '../styles/ManageCadets.css';
import '../styles/Modal.css';
import mockUnitInfo from '../../../mock/unitInfo.json';  // Importing mock data

const ManageUnit = () => {
  const [unitInfo, setUnitInfo] = useState(mockUnitInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save unit info logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to initial unit info
    setUnitInfo(mockUnitInfo);
    setIsEditing(false);
  };

  return (
    <div className="manage-cadets">
      <h3>Unit Information</h3>
      <form>
        <FormGrid>
          {Object.entries(unitInfo).map(([key, value]) => (
            <FormGroup key={key}>
              <Label>{key.replace(/([A-Z])/g, ' $1')}</Label>
              <Input
                name={key}
                value={value}
                onChange={handleInputChange}
                disabled={!isEditing}
                type={key.toLowerCase().includes('date') ? 'date' : 'text'}
              />
            </FormGroup>
          ))}
        </FormGrid>
        <div className="modal-actions">
          {isEditing ? (
            <>
              <Button className="cadet-save-button" onClick={handleSave}>
                <Save /> Save
              </Button>
              <Button className="cadet-close-button" onClick={handleCancel}>
                <Cancel /> Cancel
              </Button>
            </>
          ) : (
            <Button className="add-button" onClick={() => setIsEditing(true)}>
              <Edit /> Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageUnit;

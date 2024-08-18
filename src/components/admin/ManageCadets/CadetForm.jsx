import React from 'react';
import { Delete, Save, Cancel } from '@mui/icons-material';
import { Button, Input, Modal, FormGrid, FormGroup, Label } from '../common/StyledComponents';
import FamilyMemberForm from './FamilyMemberForm';
import PhotoManager from './PhotoManager';
import EventParticipation from './EventParticipation';

const CadetForm = ({ cadet, onSave, onDelete, onCancel }) => {
  const [editingCadet, setEditingCadet] = React.useState(cadet);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingCadet({...editingCadet, [name]: value});
  };

  const handleSave = () => {
    onSave(editingCadet);
  };

  return (
    <Modal>
      <h3>{editingCadet.id ? 'Edit Cadet' : 'Add Cadet'}</h3>
      <form>
        <FormGrid>
          {['firstName', 'lastName', 'email', 'rank', 'dateOfBirth', 'grade', 'nsLevel', 'leadershipPosition', 'platoon'].map((field) => (
            <FormGroup key={field}>
              <Label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
              <Input
                name={field}
                value={editingCadet[field] || ''}
                onChange={handleInputChange}
                type={field === 'dateOfBirth' ? 'date' : field === 'platoon' ? 'number' : 'text'}
              />
            </FormGroup>
          ))}
        </FormGrid>

        <FamilyMemberForm
          familyMembers={editingCadet.familyMembers}
          onChange={(newFamilyMembers) => setEditingCadet({...editingCadet, familyMembers: newFamilyMembers})}
        />

        <PhotoManager
          photos={editingCadet.photos}
          onChange={(newPhotos) => setEditingCadet({...editingCadet, photos: newPhotos})}
        />

        <EventParticipation
          events={editingCadet.eventParticipation}
          onChange={(newEvents) => setEditingCadet({...editingCadet, eventParticipation: newEvents})}
        />

        <div>
          {editingCadet.id && (
            <Button variant="secondary" onClick={() => onDelete(editingCadet.id)}>
              <Delete /> Delete Cadet
            </Button>
          )}
          <Button onClick={handleSave}>
            <Save /> Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            <Cancel /> Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CadetForm;
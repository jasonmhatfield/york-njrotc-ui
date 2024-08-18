import React from 'react';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { Button } from '../common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const PhotoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.md};
`;

const PhotoItem = styled.div`
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius.sm};
    overflow: hidden;
`;

const Photo = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const PhotoActions = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing.sm};
`;

const PhotoManager = ({ photos, onChange }) => {
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = {
          id: Date.now(),
          url: reader.result,
          isActive: photos.length === 0, // Set as active if it's the first photo
          date: new Date().toISOString().split('T')[0]
        };
        onChange([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    }
  };

  const setActivePhoto = (photoId) => {
    const updatedPhotos = photos.map(photo => ({
      ...photo,
      isActive: photo.id === photoId
    }));
    onChange(updatedPhotos);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    onChange(updatedPhotos);
  };

  return (
    <div>
      <h4>Photos</h4>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: 'none' }}
        id="photo-upload"
      />
      <label htmlFor="photo-upload">
        <Button as="span">
          <PhotoCamera /> Upload Photo
        </Button>
      </label>
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoItem key={photo.id}>
            <Photo src={photo.url} alt="Cadet" />
            <PhotoActions>
              <Button onClick={() => setActivePhoto(photo.id)}>
                {photo.isActive ? 'Active' : 'Set Active'}
              </Button>
              <Button variant="secondary" onClick={() => removePhoto(photo.id)}>
                <Delete />
              </Button>
            </PhotoActions>
          </PhotoItem>
        ))}
      </PhotoGrid>
    </div>
  );
};

export default PhotoManager;
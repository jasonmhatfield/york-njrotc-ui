import React, { useState } from 'react';
import { Save, Cancel, Edit } from '@mui/icons-material';
import { Button, Input, FormGrid, FormGroup, Label } from './common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import mockUnitInfo from '../../mock/unitInfo.json';

const Container = styled.div`
    padding: ${theme.spacing.md};
`;

const Title = styled.h2`
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
`;

const ManageUnit = () => {
  const [unitInfo, setUnitInfo] = useState(mockUnitInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnitInfo({...unitInfo, [name]: value});
  };

  const handleSave = () => {
    // Here you would typically send the updated info to a server
    console.log('Saving unit info:', unitInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUnitInfo(mockUnitInfo);
    setIsEditing(false);
  };

  return (
    <Container>
      <Title>Unit Information</Title>
      <form>
        <FormGrid>
          {Object.entries(unitInfo).map(([key, value]) => (
            <FormGroup key={key}>
              <Label>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
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

        <div>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>
                <Save /> Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                <Cancel /> Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit /> Edit
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default ManageUnit;
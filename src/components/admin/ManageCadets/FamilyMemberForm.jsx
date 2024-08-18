import React from 'react';
import { Add, Delete } from '@mui/icons-material';
import { Button, Input } from '../common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const FamilyMemberContainer = styled.div`
    margin-bottom: ${theme.spacing.md};
`;

const FamilyMemberRow = styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
`;

const FamilyMemberForm = ({ familyMembers, onChange }) => {
  const handleFamilyMemberChange = (index, field, value) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index] = {...updatedFamilyMembers[index], [field]: value};
    onChange(updatedFamilyMembers);
  };

  const addFamilyMember = () => {
    onChange([...familyMembers, { relation: '', name: '', contact: '' }]);
  };

  const removeFamilyMember = (index) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers.splice(index, 1);
    onChange(updatedFamilyMembers);
  };

  return (
    <FamilyMemberContainer>
      <h4>Family Members</h4>
      {familyMembers.map((member, index) => (
        <FamilyMemberRow key={index}>
          {['relation', 'name', 'contact'].map((field) => (
            <Input
              key={field}
              value={member[field]}
              onChange={(e) => handleFamilyMemberChange(index, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
          <Button variant="secondary" onClick={() => removeFamilyMember(index)}>
            <Delete />
          </Button>
        </FamilyMemberRow>
      ))}
      <Button onClick={addFamilyMember}>
        <Add /> Add Family Member
      </Button>
    </FamilyMemberContainer>
  );
};

export default FamilyMemberForm;
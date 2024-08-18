import React, { useState, useMemo } from 'react';
import { Add, Search } from '@mui/icons-material';
import { Button, Input, Select, Card } from '../common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import CadetList from './CadetList';
import CadetForm from './CadetForm';
import { filterAndSortCadets } from '../../../utils/cadetUtils';
import mockCadets from '../../../mock/cadets.json';

const SearchBar = styled.div`
    display: flex;
    margin-bottom: ${theme.spacing.md};
`;

const FilterContainer = styled.div`
    display: flex;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};
`;

const ManageCadets = () => {
  const [cadets, setCadets] = useState(mockCadets);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCadet, setEditingCadet] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterConfig, setFilterConfig] = useState({ nsLevel: 'all', platoon: 'all' });

  const filteredAndSortedCadets = useMemo(
    () => filterAndSortCadets(cadets, searchTerm, sortConfig, filterConfig),
    [cadets, searchTerm, sortConfig, filterConfig]
  );

  const handleEditCadet = (cadet) => {
    setEditingCadet(cadet ? {...cadet} : { familyMembers: [], photos: [], eventParticipation: [] });
  };

  const handleSaveCadet = (savedCadet) => {
    if (savedCadet.id) {
      setCadets(cadets.map(cadet => cadet.id === savedCadet.id ? savedCadet : cadet));
    } else {
      setCadets([...cadets, {...savedCadet, id: Date.now()}]);
    }
    setEditingCadet(null);
  };

  const handleDeleteCadet = (id) => {
    setCadets(cadets.filter(cadet => cadet.id !== id));
    setEditingCadet(null);
  };

  return (
    <Card>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search cadets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => {/* implement search */}}><Search /></Button>
      </SearchBar>
      <FilterContainer>
        <Select
          value={filterConfig.nsLevel}
          onChange={(e) => setFilterConfig({...filterConfig, nsLevel: e.target.value})}
        >
          <option value="all">All NS Levels</option>
          <option value="NS1">NS1</option>
          <option value="NS2">NS2</option>
          <option value="NS3">NS3</option>
          <option value="NS4">NS4</option>
        </Select>
        <Select
          value={filterConfig.platoon}
          onChange={(e) => setFilterConfig({...filterConfig, platoon: e.target.value})}
        >
          <option value="all">All Platoons</option>
          <option value="1">Platoon 1</option>
          <option value="2">Platoon 2</option>
          <option value="3">Platoon 3</option>
        </Select>
      </FilterContainer>
      <Button onClick={() => handleEditCadet(null)}><Add /> Add Cadet</Button>
      <CadetList
        cadets={filteredAndSortedCadets}
        onEditCadet={handleEditCadet}
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />
      {editingCadet && (
        <CadetForm
          cadet={editingCadet}
          onSave={handleSaveCadet}
          onDelete={handleDeleteCadet}
          onCancel={() => setEditingCadet(null)}
        />
      )}
    </Card>
  );
};

export default ManageCadets;
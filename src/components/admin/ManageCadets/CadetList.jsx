import React from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Table, Th, Td, Tr } from '../common/StyledComponents';

const CadetList = ({ cadets, onEditCadet, sortConfig, onSort }) => {
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    onSort({ key, direction });
  };

  return (
    <Table>
      <thead>
      <Tr>
        {['Name', 'Rank', 'NS Level', 'Platoon'].map((header) => (
          <Th key={header} onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}>
            {header}
            {sortConfig.key === header.toLowerCase().replace(' ', '') && (
              sortConfig.direction === 'ascending' ? <KeyboardArrowUp /> : <KeyboardArrowDown />
            )}
          </Th>
        ))}
      </Tr>
      </thead>
      <tbody>
      {cadets.map(cadet => (
        <Tr key={cadet.id} onClick={() => onEditCadet(cadet)}>
          <Td>{`${cadet.firstName} ${cadet.lastName}`}</Td>
          <Td>{cadet.rank}</Td>
          <Td>{cadet.nsLevel}</Td>
          <Td>{cadet.platoon}</Td>
        </Tr>
      ))}
      </tbody>
    </Table>
  );
};

export default CadetList;
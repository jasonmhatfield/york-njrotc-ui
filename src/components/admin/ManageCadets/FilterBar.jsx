// import React from 'react';
// import { Search } from '@mui/icons-material';
//
// const FilterBar = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };
//
//   return (
//     <div className="filter-bar">
//       <div className="search-container">
//         <Search />
//         <input
//           type="text"
//           placeholder="Search cadets..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <select
//         name="nsLevel"
//         value={filters.nsLevel}
//         onChange={handleFilterChange}
//       >
//         <option value="all">All NS Levels</option>
//         <option value="NS1">NS1</option>
//         <option value="NS2">NS2</option>
//         <option value="NS3">NS3</option>
//         <option value="NS4">NS4</option>
//       </select>
//       <select
//         name="platoon"
//         value={filters.platoon}
//         onChange={handleFilterChange}
//       >
//         <option value="all">All Platoons</option>
//         <option value="1">Platoon 1</option>
//         <option value="2">Platoon 2</option>
//         <option value="3">Platoon 3</option>
//       </select>
//     </div>
//   );
// };
//
// export default FilterBar;
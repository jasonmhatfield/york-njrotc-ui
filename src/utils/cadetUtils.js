export const filterAndSortCadets = (cadets, searchTerm, sortConfig, filterConfig) => {
  let filteredCadets = cadets.filter(cadet =>
    (cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterConfig.nsLevel === 'all' || cadet.nsLevel === filterConfig.nsLevel) &&
    (filterConfig.platoon === 'all' || cadet.platoon.toString() === filterConfig.platoon)
  );

  if (sortConfig.key !== null) {
    filteredCadets.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  return filteredCadets;
};
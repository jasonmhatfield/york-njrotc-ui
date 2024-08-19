export const filterCadets = (cadets, filters, searchTerm) => {
  return cadets.filter(cadet => {
    const matchesSearch = cadet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cadet.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNSLevel = filters.nsLevel === 'all' || cadet.nsLevel === filters.nsLevel;
    const matchesPlatoon = filters.platoon === 'all' || cadet.platoon.toString() === filters.platoon;
    return matchesSearch && matchesNSLevel && matchesPlatoon;
  });
};

export const validateCadet = (cadet) => {
  const errors = {};
  if (!cadet.firstName) errors.firstName = 'First name is required';
  if (!cadet.lastName) errors.lastName = 'Last name is required';
  if (!cadet.email) errors.email = 'Email is required';
  if (!cadet.phone) errors.phone = 'Phone number is required';
  if (!cadet.rank) errors.rank = 'Rank is required';
  if (!cadet.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
  if (!cadet.grade) errors.grade = 'Grade is required';
  if (!cadet.nsLevel) errors.nsLevel = 'NS Level is required';
  if (!cadet.platoon) errors.platoon = 'Platoon is required';
  return errors;
};
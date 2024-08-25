import React, { useState, useEffect } from 'react';

const CadetStaff = () => {
  const [loading, setLoading] = useState(true);
  const [cadetData, setCadetData] = useState([]);

  // Fetch cadet staff data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cadets');
        const data = await response.json();
        setCadetData(data.filter(cadet => cadet.status === 'ACTIVE')); // Filter active cadets
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cadet data:', error);
      }
    };

    fetchData();
  }, []);

  const isEnlisted = (rankPrecedence) => {
    return rankPrecedence > 6; // Enlisted ranks have a precedence greater than 6
  };

  const getStaffMember = (positionTitle) => {
    return cadetData.find(cadet => cadet.cadetPosition && cadet.cadetPosition.position === positionTitle);
  };

  const renderStaffCards = (staffCategory) => {
    return staffCategory.map((staff, index) => {
      const staffMember = getStaffMember(staff.title);
      if (!staffMember) return null; // Hide the card if no cadet is in this position

      const rankType = isEnlisted(staffMember.rank.rankPrecedence) ? 'enlisted' : 'officer';

      return (
        <div key={index} style={styles.staffCard(rankType)}>
          <img
            src={staffMember.photoUrl} // Assume the API provides the correct image URL
            alt={`${staff.title} ${staffMember.firstName} ${staffMember.lastName}`}
            style={styles.staffImage(rankType)}
            onLoad={() => setLoading(false)}
          />
          <div style={styles.staffInfo}>
            <p style={styles.staffName}>{`Cadet ${staffMember.rank.rankName} ${staffMember.firstName} ${staffMember.lastName}`}</p>
          </div>
          <p style={styles.staffTitle}>{staff.title}</p>
        </div>
      );
    });
  };

  // Define the staff categories based on the position titles
  const triad = [
    { title: 'Commanding Officer' },
    { title: 'Executive Officer' },
    { title: 'Command Master Chief' },
  ];

  const wardroom = [
    { title: 'Operations Officer' },
    { title: 'Supply Officer' },
    { title: 'Administration Officer' },
  ];

  const unitStaff = [
    { title: 'Master-at-Arms' },
    { title: 'Public Affairs Officer' },
    { title: 'Weapons Officer' },
  ];

  return (
    <div style={styles.container}>
      {loading && <div style={styles.loading}>Loading...</div>}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>The Triad</h2>
          <div style={styles.sectionContent}>{renderStaffCards(triad)}</div>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>The Wardroom</h2>
          <div style={styles.sectionContent}>{renderStaffCards(wardroom)}</div>
        </div>
        <div style={{ ...styles.section, borderBottom: 'none' }}>
          <h2 style={styles.sectionTitle}>Unit Staff</h2>
          <div style={styles.sectionContent}>{renderStaffCards(unitStaff)}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#ffd700',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '2px solid gold',
  },
  sectionTitle: {
    color: '#ffd700',
    fontSize: '2rem',
    margin: '10px 0',
  },
  sectionContent: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  staffCard: (rank) => ({
    marginBottom: '30px',
    width: '250px',
    textAlign: 'center',
  }),
  staffImage: (rank) => ({
    width: '400px',
    margin: '10px auto',
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: `0 0 10px 0 ${rank === 'officer' ? 'gold' : 'silver'}`,
  }),
  staffInfo: {
    margin: '10px 0',
  },
  staffName: {
    fontSize: '1.3rem',
    color: '#ecf0f1',
    padding: '1px',
    margin: '1px 1px 5px',
  },
  staffTitle: {
    marginTop: '10px',
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default CadetStaff;

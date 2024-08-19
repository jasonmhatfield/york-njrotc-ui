import React, { useState, useEffect } from 'react';
import * as staffImages from '../assets/images/staff';

const staffData = {
  triad: [
    { title: 'Commanding Officer', name: 'Cadet LCDR Gideon Hatfield', image: staffImages.CO, rank: 'officer' },
    { title: 'Executive Officer', name: 'Cadet LT Liam Miller', image: staffImages.XO, rank: 'officer' },
    { title: 'Command Master Chief', name: 'Cadet MCPO Trey Arnett', image: staffImages.CMC, rank: 'enlisted' },
  ],
  wardroom: [
    { title: 'Operations Officer', name: 'Cadet LTJG Gabby Clinton', image: staffImages.OPS, rank: 'officer' },
    { title: 'Supply Officer', name: 'Cadet LTJG Logan Zelakowski', image: staffImages.SUPPO, rank: 'officer' },
    { title: 'Admin Officer', name: 'Cadet ENS Addy Branch', image: staffImages.ADMIN, rank: 'officer' },
  ],
  unitStaff: [
    { title: 'Master At Arms', name: 'Cadet CPO Kam LaForge', image: staffImages.MAA, rank: 'enlisted' },
    { title: 'PAO', name: 'Cadet CPO Maygan Kimble', image: staffImages.PAO, rank: 'enlisted' },
    { title: 'WEPS', name: 'Cadet CPO Hunter King', image: staffImages.WEPS, rank: 'enlisted' },
  ],
};

const CadetStaff = () => {
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = Object.values(staffData).flat().length;

  useEffect(() => {
    if (loadedImages === totalImages) {
      setLoading(false);
    }
  }, [loadedImages, totalImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const renderStaffCards = (section) => {
    return staffData[section].map((staff, index) => (
      <div key={index} style={styles.staffCard(staff.rank)}>
        <img
          src={staff.image}
          alt={`${staff.title} ${staff.name}`}
          style={styles.staffImage(staff.rank)}
          onLoad={handleImageLoad}
        />
        <div style={styles.staffInfo}>
          <p style={styles.staffName}>{staff.name}</p>
        </div>
        <p style={styles.staffTitle}>{staff.title}</p>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      {loading && <div style={styles.loading}>Loading...</div>}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>The Triad</h2>
          <div style={styles.sectionContent}>{renderStaffCards('triad')}</div>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>The Wardroom</h2>
          <div style={styles.sectionContent}>{renderStaffCards('wardroom')}</div>
        </div>
        <div style={{ ...styles.section, borderBottom: 'none' }}>
          <h2 style={styles.sectionTitle}>Unit Staff</h2>
          <div style={styles.sectionContent}>{renderStaffCards('unitStaff')}</div>
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

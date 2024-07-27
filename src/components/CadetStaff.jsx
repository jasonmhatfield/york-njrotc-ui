import React, { useState, useEffect } from 'react';
import '../styles/CadetStaff.css';

const staffData = {
  triad: [
    { title: 'Commanding Officer', name: 'Cadet LCDR Gideon Hatfield', image: '/images/staff/CO.jpg', rank: 'officer' },
    { title: 'Executive Officer', name: 'Cadet LT Liam Miller', image: '/images/staff/XO.jpg', rank: 'officer' },
    { title: 'Command Master Chief', name: 'Cadet MCPO Trey Arnett', image: '/images/staff/CMC.jpg', rank: 'enlisted' },
  ],
  wardroom: [
    { title: 'Operations Officer', name: 'Cadet LTJG Gabby Clinton', image: '/images/staff/OPS.jpg', rank: 'officer' },
    { title: 'Supply Officer', name: 'Cadet LTJG Logan Zelakowski', image: '/images/staff/SUPPO.jpg', rank: 'officer' },
    { title: 'Admin Officer', name: 'Cadet ENS Addy Branch', image: '/images/staff/ADMIN.jpg', rank: 'officer' },
  ],
  unitStaff: [
    { title: 'Master At Arms', name: 'Cadet CPO Kam LaForge', image: '/images/staff/MAA.jpg', rank: 'enlisted' },
    { title: 'PAO', name: 'Cadet CPO Maygan Kimble', image: '/images/staff/PAO.jpg', rank: 'enlisted' },
    { title: 'WEPS', name: 'Cadet CPO Hunter King', image: '/images/staff/WEPS.jpg', rank: 'enlisted' },
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
      <div key={index} className={`staff-card ${staff.rank}`}>
        <img src={staff.image} alt={`${staff.title} ${staff.name}`} className="staff-image" onLoad={handleImageLoad} />
        <div className="staff-info">
          <p>{staff.name}</p>
        </div>
        <p className="staff-title">{staff.title}</p>
      </div>
    ));
  };

  return (
    <div className="cadet-staff-container">
      {loading && <div className="loading">Loading...</div>}
      <div className="staff-sections" style={{ display: loading ? 'none' : 'block' }}>
        <div className="staff-section">
          <h2>The Triad</h2>
          <div className="staff-section-content large-cards">
            {renderStaffCards('triad')}
          </div>
        </div>
        <div className="staff-section">
          <h2>The Wardroom</h2>
          <div className="staff-section-content medium-cards">
            {renderStaffCards('wardroom')}
          </div>
        </div>
        <div className="staff-section">
          <h2>Unit Staff</h2>
          <div className="staff-section-content small-cards">
            {renderStaffCards('unitStaff')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadetStaff;

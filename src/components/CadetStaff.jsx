import React, { useState, useEffect } from 'react';
import '../styles/CadetStaff.component.css'; // Import the CSS file

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
        <div key={index} className={`staff-card ${rankType}`}>
          <img
            src={staffMember.photoUrl} // Assume the API provides the correct image URL
            alt={`${staff.title} ${staffMember.firstName} ${staffMember.lastName}`}
            className={`staff-image ${rankType}`}
            onLoad={() => setLoading(false)}
          />
          <div className="staff-info">
            <p className="staff-name">{`Cadet ${staffMember.rank.rankName} ${staffMember.firstName} ${staffMember.lastName}`}</p>
          </div>
          <p className="staff-title">{staff.title}</p>
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
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div className="section">
          <h2 className="section-title">The Triad</h2>
          <div className="section-content">{renderStaffCards(triad)}</div>
        </div>
        <div className="section">
          <h2 className="section-title">The Wardroom</h2>
          <div className="section-content">{renderStaffCards(wardroom)}</div>
        </div>
        <div className="section" style={{ borderBottom: 'none' }}>
          <h2 className="section-title">Unit Staff</h2>
          <div className="section-content">{renderStaffCards(unitStaff)}</div>
        </div>
      </div>
    </div>
  );
};

export default CadetStaff;

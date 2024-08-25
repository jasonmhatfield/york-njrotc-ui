import React, { useEffect, useState } from 'react';

const RibbonChecker = () => {
  const [ribbons, setRibbons] = useState([]);
  const [currentRibbon, setCurrentRibbon] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/ribbons')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setRibbons(data))
      .catch(error => {
        console.error('Error fetching ribbons:', error);
        alert('Failed to fetch ribbons. Please check the console for more details.');
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedRibbons', JSON.stringify(ribbons));
  }, [ribbons]);

  const handleCheckboxChange = (id) => {
    setRibbons(ribbons.map(ribbon => ribbon.id === id ? { ...ribbon, selected: !ribbon.selected } : ribbon));
  };

  const handleSelectAll = () => {
    setRibbons(ribbons.map(ribbon => ({ ...ribbon, selected: true })));
  };

  const handleClearSelection = () => {
    setRibbons(ribbons.map(ribbon => ({ ...ribbon, selected: false })));
  };

  const renderRibbons = (selectedRibbons) => {
    const totalRibbons = selectedRibbons.length;
    if (totalRibbons === 0) {
      return <div style={styles.noRibbonsMessage}>No ribbons selected.</div>;
    }

    const rows = [];
    let index = 0;

    const topRowCount = totalRibbons % 3 === 0 ? 3 : totalRibbons % 3;
    const topRow = selectedRibbons.slice(index, index + topRowCount);
    rows.push(
      <div key={`row-${index}`} style={{ ...styles.ribbonRow, ...styles.centeredRow }}>
        {topRow.map(ribbon => (
          <div key={ribbon.id} style={styles.ribbonImage}>
            <img src={ribbon.imageUrl} alt={ribbon.name} title={ribbon.name} />
          </div>
        ))}
      </div>
    );
    index += topRowCount;

    while (index < totalRibbons) {
      const row = selectedRibbons.slice(index, index + 3);
      rows.push(
        <div key={`row-${index}`} style={styles.ribbonRow}>
          {row.map(ribbon => (
            <div key={ribbon.id} style={styles.ribbonImage}>
              <img src={ribbon.imageUrl} alt={ribbon.name} title={ribbon.name} />
            </div>
          ))}
        </div>
      );
      index += 3;
    }

    return rows;
  };

  const selectedRibbons = ribbons.filter(ribbon => ribbon.selected).sort((a, b) => a.precedence - b.precedence);

  return (
    <div style={styles.ribbonChecker}>
      <h2 style={styles.center}>Ribbon Checker</h2>
      <div style={styles.ribbonContainer}>
        <div style={styles.selectedRibbons}>
          <h4>Selected Ribbons</h4>
          {renderRibbons(selectedRibbons)}
        </div>
        <div style={styles.ribbonSelector}>
          <h3>Choose Ribbons</h3>
          <div style={styles.ribbonFlexContainer}>
            {ribbons.sort((a, b) => a.precedence - b.precedence).map(ribbon => (
              <div key={ribbon.id} style={styles.ribbonItem}>
                <button onClick={() => setCurrentRibbon(ribbon)} style={styles.infoButton}>ℹ</button>
                <input
                  type="checkbox"
                  style={styles.customCheckbox}
                  id={ribbon.id}
                  checked={ribbon.selected}
                  onChange={() => handleCheckboxChange(ribbon.id)}
                />
                <label htmlFor={ribbon.id} style={styles.label}>{ribbon.name}</label>
              </div>
            ))}
          </div>
          <div style={styles.buttonsContainer}>
            <button onClick={handleSelectAll} style={styles.btn}>Select All</button>
            <button onClick={handleClearSelection} style={styles.btn}>Clear Selection</button>
          </div>
        </div>
      </div>

      {currentRibbon && (
        <div style={styles.modalBackdrop} onClick={() => setCurrentRibbon(null)}>
          <div style={styles.modalContentWrapper} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h5 style={styles.modalTitle}>{currentRibbon.name}</h5>
              </div>
              <div style={styles.modalBody}>
                <img src={currentRibbon.imageUrl} alt={currentRibbon.name} style={styles.modalRibbonImage} />
                <p style={styles.description}>{currentRibbon.description}</p>
              </div>
              <div style={styles.modalFooter}>
                <button type="button" style={styles.btn} onClick={() => setCurrentRibbon(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  ribbonChecker: {
    animation: 'fadeIn 1.5s ease-in-out',
  },
  ribbonContainer: {
    maxWidth: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    backgroundColor: '#1a2a3a',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  selectedRibbons: {
    margin: '1rem',
    padding: '1rem',
    backgroundColor: '#16222a',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '325px',
  },
  ribbonSelector: {
    margin: '1rem',
    padding: '1rem',
    backgroundColor: '#16222a',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '430px',
  },
  ribbonFlexContainer: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 450px)',
    backgroundColor: '#34495e',
    border: '1px solid #ecf0f1',
    padding: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  ribbonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#ecf0f1',
    fontSize: '1.4rem',
  },
  customCheckbox: {
    accentColor: '#ffd700',
    width: '15px',
    height: '15px',
  },
  infoButton: {
    backgroundColor: '#ffd700',
    color: '#16222a',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
  },
  label: {
    fontWeight: 600,
    color: '#ecf0f1',
  },
  ribbonRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  centeredRow: {
    justifyContent: 'center',
  },
  description: {
    fontSize: '1.25rem',
    padding: '0 2rem',
    margin: '5px 5px 20px 20px',
    color: '#ecf0f1',
  },
  noRibbonsMessage: {
    fontSize: '1.25rem',
    textAlign: 'center',
    color: '#ecf0f1',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentWrapper: {
    backgroundColor: '#1a2a3a',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '600px',
    width: '100%',
    padding: '1rem',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    textAlign: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#ffd700',
  },
  modalBody: {
    textAlign: 'center',
    padding: '10px',
  },
  modalRibbonImage: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  modalFooter: {
    width: '100%',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#003366',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    borderRadius: '6px',
    textAlign: 'center',
    width: 'calc(50% - 1rem)',
    boxSizing: 'border-box',
    fontSize: '1rem',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    backgroundColor: '#1a2a3a',
    borderTop: '1px solid #ddd',
    flexShrink: 0,
  },
  center: {
    textAlign: 'center',
    color: '#ffd700',
    fontSize: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 600,
    margin: '20px 0',
  },
};

export default RibbonChecker;

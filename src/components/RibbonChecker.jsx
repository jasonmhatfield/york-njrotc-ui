import React, { useEffect, useState } from 'react';
import '../styles/RibbonChecker.css';
import ribbonsData from '../data/ribbonsData';

const RibbonChecker = () => {
  const [ribbons, setRibbons] = useState(() => {
    const savedRibbons = sessionStorage.getItem('selectedRibbons');
    return savedRibbons ? JSON.parse(savedRibbons) : ribbonsData;
  });
  const [currentRibbon, setCurrentRibbon] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
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
      return <div className="no-ribbons-message">No ribbons selected.</div>;
    }

    const rows = [];
    let index = 0;

    // Top row, which may have 1 to 3 ribbons
    const topRowCount = totalRibbons % 3 === 0 ? 3 : totalRibbons % 3;
    const topRow = selectedRibbons.slice(index, index + topRowCount);
    rows.push(
      <div key={`row-${index}`} className="ribbon-row centered-row">
        {topRow.map(ribbon => (
          <div key={ribbon.id} className="ribbon-image">
            <img src={ribbon.imagePath} alt={ribbon.name} title={ribbon.name} />
          </div>
        ))}
      </div>
    );
    index += topRowCount;

    // Subsequent rows, each with 3 ribbons
    while (index < totalRibbons) {
      const row = selectedRibbons.slice(index, index + 3);
      rows.push(
        <div key={`row-${index}`} className="ribbon-row">
          {row.map(ribbon => (
            <div key={ribbon.id} className="ribbon-image">
              <img src={ribbon.imagePath} alt={ribbon.name} title={ribbon.name} />
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
    <div className="ribbon-checker">
      <h2 className="center">Ribbon Checker</h2>
      <div className="ribbon-container">
        <div className="selected-ribbons">
          <h4>Selected Ribbons</h4>
          {renderRibbons(selectedRibbons)}
        </div>
        <div className="ribbon-selector">
          <h3>Choose Ribbons</h3>
          <div className="ribbon-flex-container">
            {ribbons.sort((a, b) => a.precedence - b.precedence).map(ribbon => (
              <div key={ribbon.id} className="ribbon-item">
                <button onClick={() => setCurrentRibbon(ribbon)} className="info-button">ℹ</button>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={ribbon.id}
                  checked={ribbon.selected}
                  onChange={() => handleCheckboxChange(ribbon.id)}
                />
                <label htmlFor={ribbon.id}>{ribbon.name}</label>
              </div>
            ))}
          </div>
          <div className="center buttons-container">
            <button onClick={handleSelectAll} className="btn btn-primary">Select All</button>
            <button onClick={handleClearSelection} className="btn btn-primary">Clear Selection</button>
          </div>
        </div>
      </div>

      {currentRibbon && (
        <div className="modal-backdrop" onClick={() => setCurrentRibbon(null)}>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentRibbon.name}</h5>
              </div>
              <div className="modal-body">
                <img src={currentRibbon.imagePath} alt={currentRibbon.name} className="modal-ribbon-image" />
                <p className="description">{currentRibbon.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setCurrentRibbon(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RibbonChecker;

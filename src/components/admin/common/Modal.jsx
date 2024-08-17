import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '500px',
    maxWidth: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const modalCloseStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  const modalContentStyle = {
    maxHeight: '60vh',
    overflowY: 'auto',
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        <div style={modalHeaderStyle}>
          <h2>{title}</h2>
          <button style={modalCloseStyle} onClick={onClose}>×</button>
        </div>
        <div style={modalContentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

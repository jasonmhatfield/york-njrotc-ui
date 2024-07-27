import React from 'react';
import '../styles/ScrollContainer.css';

const ScrollContainer = ({ children }) => {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;

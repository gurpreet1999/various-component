import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Tooltip Example</h1>
      <Tooltip content="This is a tooltip content">
        <button>Hover over me</button>
      </Tooltip>
    </div>
  );
};

export default App;
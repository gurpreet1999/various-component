import React from 'react';

const ProgressBar = ({
  progress,
  barColor = 'blue',
  barHeight = '20px',
  showPercentage = true,
  showLabel = true,
}) => {
  // Ensure progress is within [0, 100] range
  const normalizedProgress = Math.max(0, Math.min(progress, 100));

  const barStyle = {
    width: `${normalizedProgress}%`,
    height: barHeight,
    backgroundColor: barColor,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={barStyle} />
        {showPercentage && <span style={{ marginLeft: '5px' }}>{`${normalizedProgress}%`}</span>}
      </div>
      {showLabel && <p>Progress: {normalizedProgress}%</p>}
    </div>
  );
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Customizable Progress Bar Example</h1>
      <ProgressBar progress={50} />
      <ProgressBar progress={75} barColor="green" barHeight="10px" />
      <ProgressBar progress={30} barColor="orange" showPercentage={false} showLabel={false} />
    </div>
  );
};

export default App;
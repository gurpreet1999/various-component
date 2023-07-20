import React, { useState } from 'react';

const Toggle = ({ render }) => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((prevIsToggled) => !prevIsToggled);
  };

  return render({ isToggled, toggle: handleToggle });
};

// Usage
const App = () => {
  return (
    <div>
      <Toggle
        render={({ isToggled, toggle }) => (
          <div>
            <button onClick={toggle}>
              {isToggled ? 'ON' : 'OFF'}
            </button>
            {isToggled ? <p>Toggle is ON</p> : <p>Toggle is OFF</p>}
          </div>
        )}
      />
    </div>
  );
};

export default App;
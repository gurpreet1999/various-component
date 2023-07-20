import React, { useState } from 'react';

// Compound Component: Dropdown
const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Expose isOpen and toggleDropdown function to children
  return children({ isOpen, toggleDropdown });
};

// Subcomponent: DropdownToggle
const DropdownToggle = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
  </button>
);

// Subcomponent: DropdownMenu
const DropdownMenu = ({ isOpen, children }) => (
  isOpen ? <div className="dropdown-menu">{children}</div> : null
);

// Usage
const App = () => {
  return (
    <div>
      <h1>Customizable Dropdown Component</h1>
      <Dropdown>
        {({ isOpen, toggleDropdown }) => (
          <div>
            {/* DropdownToggle */}
            <DropdownToggle onClick={toggleDropdown}>
              {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
            </DropdownToggle>

            {/* DropdownMenu */}
            <DropdownMenu isOpen={isOpen}>
              {/* DropdownItems */}
              <button onClick={() => console.log('Option 1 clicked')}>Option 1</button>
              <button onClick={() => console.log('Option 2 clicked')}>Option 2</button>
              <button onClick={() => console.log('Option 3 clicked')}>Option 3</button>
            </DropdownMenu>
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export default App;
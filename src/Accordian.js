import React, { createContext, useState, useContext } from 'react';

// Create a new context for the accordion state and actions
const AccordionContext = createContext();

// Compound Component: Accordion
const Accordion = ({ children }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  // Function to handle opening/closing accordion items
  const toggleItem = (index) => {
    setActiveItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Expose activeItemIndex and toggleItem function through context
  const accordionContextValue = {
    activeItemIndex,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      {children}
    </AccordionContext.Provider>
  );
};

// Custom hook to access accordion context
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionProvider');
  }
  return context;
};

// Subcomponent: AccordionItem
const AccordionItem = ({ index, children }) => {
  const { activeItemIndex, toggleItem } = useAccordionContext();
  const isActive = activeItemIndex === index;

  return (
    <div>
      <button onClick={() => toggleItem(index)}>
        {isActive ? '▼' : '►'} {children.props.title}
      </button>
      <div
        style={{
          maxHeight: isActive ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out',
        }}
      >
        {isActive && children}
      </div>
    </div>
  );
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Accordion Example with Animation</h1>
      <Accordion>
        <AccordionItem index={1} title="Item 1">
          <p>Content for Item 1</p>
        </AccordionItem>
        <AccordionItem index={2} title="Item 2">
          <p>Content for Item 2</p>
        </AccordionItem>
        <AccordionItem index={3} title="Item 3">
          <p>Content for Item 3</p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default App;
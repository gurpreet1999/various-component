import React, { useState } from 'react';

const DragAndDrop = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {
    setIsDragging(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - position.x;
      const deltaY = event.clientY - position.y;
      setPosition({ x: event.clientX, y: event.clientY });
      // Handle the drag behavior, e.g., update the position of the dragged element
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Expose isDragging, handleDragStart, handleDrag, and handleDragEnd through render prop
  return children({ isDragging, handleDragStart, handleDrag, handleDragEnd });
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <DragAndDrop>
        {({ isDragging, handleDragStart, handleDrag, handleDragEnd }) => (
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: isDragging ? 'red' : 'blue',
              cursor: 'move',
            }}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            Drag Me!
          </div>
        )}
      </DragAndDrop>
    </div>
  );
};

export default App;
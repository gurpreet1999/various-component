import React, { createContext, useState, useContext } from 'react';

// Create a new context for the autocomplete state and actions
const AutocompleteContext = createContext();

// Compound Component: Autocomplete
const Autocomplete = ({ children, suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Function to update input value and filter suggestions
  const handleInputChange = (value) => {
    setInputValue(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  // Expose inputValue and handleInputChange function through context
  const autocompleteContextValue = {
    inputValue,
    handleInputChange,
    filteredSuggestions,
  };

  return (
    <AutocompleteContext.Provider value={autocompleteContextValue}>
      {children}
    </AutocompleteContext.Provider>
  );
};

// Custom hook to access autocomplete context
const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error('useAutocompleteContext must be used within an AutocompleteProvider');
  }
  return context;
};

// Subcomponent: AutocompleteInput
const AutocompleteInput = () => {
  const { inputValue, handleInputChange } = useAutocompleteContext();

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

// Subcomponent: AutocompleteSuggestions
const AutocompleteSuggestions = () => {
  const { filteredSuggestions } = useAutocompleteContext();

  return (
    <ul>
      {filteredSuggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  );
};

// Usage
const App = () => {
  const suggestions = ['apple', 'banana', 'orange', 'grape', 'pineapple'];

  return (
    <div>
      <h1>Autocomplete Example</h1>
      <Autocomplete suggestions={suggestions}>
        <div>
          <AutocompleteInput />
          <AutocompleteSuggestions />
        </div>
      </Autocomplete>
    </div>
  );
};

export default App;
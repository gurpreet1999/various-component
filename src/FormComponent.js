import React, { createContext, useState, useContext } from 'react';

// Create a new context for the form state and actions
const FormContext = createContext();

// Compound Component: Form
const Form = ({ children, initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to update form field values
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    onSubmit(values);
  };

  // Expose form values, handleChange, and handleSubmit through context
  const formContextValue = {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={formContextValue}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

// Custom hook to access form context
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Subcomponent: FormField
const FormField = ({ name, children }) => {
  const { values, handleChange } = useFormContext();

  return (
    <div>
      <label>{name}</label>
      {children({
        value: values[name] || '',
        onChange: (e) => handleChange(name, e.target.value),
      })}
    </div>
  );
};

// Subcomponent: FormSubmitButton
const FormSubmitButton = ({ children }) => {
  const { isSubmitting } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : children}
    </button>
  );
};

// Usage
const App = () => {
  const handleSubmit = (formData) => {
    // Handle form submission
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Form Example</h1>
      <Form initialValues={{ name: '', email: '' }} onSubmit={handleSubmit}>
        <FormField name="name">
          {({ value, onChange }) => (
            <input type="text" value={value} onChange={onChange} />
          )}
        </FormField>
        <FormField name="email">
          {({ value, onChange }) => (
            <input type="email" value={value} onChange={onChange} />
          )}
        </FormField>
        <FormSubmitButton>Submit</FormSubmitButton>
      </Form>
    </div>
  );
};

export default App;
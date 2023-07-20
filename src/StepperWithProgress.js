import React, { createContext, useContext, useState } from 'react';

// Create a new context for the stepper state and actions
const StepperContext = createContext();

// Compound Component: Stepper
const Stepper = ({ children, initialStep = 0 }) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  // Function to go to the next step
  const nextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, React.Children.count(children) - 1));
  };

  // Function to go to the previous step
  const prevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Expose activeStep, nextStep, and prevStep through context
  const stepperContextValue = {
    activeStep,
    nextStep,
    prevStep,
  };

  return (
    <StepperContext.Provider value={stepperContextValue}>
      {children}
    </StepperContext.Provider>
  );
};

// Custom hook to access stepper context
const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
};

// Subcomponent: Step
const Step = ({ children }) => {
  const { activeStep } = useStepperContext();
  const isVisible = React.Children.count(children) > 0 && React.Children.toArray(children)[activeStep];

  return isVisible ? React.Children.toArray(children)[activeStep] : null;
};

// Subcomponent: StepTitle
const StepTitle = ({ children }) => {
  return <h2>{children}</h2>;
};

// Subcomponent: StepContent
const StepContent = ({ children }) => {
  return <div>{children}</div>;
};

// Subcomponent: StepStatusIndicator
const StepStatusIndicator = () => {
  const { activeStep } = useStepperContext();

  return (
    <div>
      {Array.from({ length: React.Children.count(children) }, (_, index) => (
        <div
          key={index}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: index === activeStep ? 'green' : 'gray',
            margin: '5px',
          }}
        />
      ))}
    </div>
  );
};

// Subcomponent: StepErrorMessage
const StepErrorMessage = ({ children }) => {
  return <p style={{ color: 'red' }}>{children}</p>;
};

// Usage
const App = () => {
  return (
    <div>
      <h1>Stepper Example</h1>
      <Stepper>
        <Step>
          <StepTitle>Step 1</StepTitle>
          <StepContent>
            <p>Step 1 content</p>
            <StepErrorMessage>Error message for Step 1</StepErrorMessage>
          </StepContent>
        </Step>
        <Step>
          <StepTitle>Step 2</StepTitle>
          <StepContent>
            <p>Step 2 content</p>
          </StepContent>
        </Step>
        <Step>
          <StepTitle>Step 3</StepTitle>
          <StepContent>
            <p>Step 3 content</p>
          </StepContent>
        </Step>
      </Stepper>
      <StepStatusIndicator />
    </div>
  );
};

export default App;
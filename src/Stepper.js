import React, { useState, createContext, useContext } from 'react';

// StepContext: Create a new context to manage stepper state
const StepContext = createContext();

// Compound Component: Stepper
const Stepper = ({ children, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  // Function to handle moving to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to handle moving to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Function to reset the stepper to the initial step
  const resetStepper = () => {
    setCurrentStep(initialStep);
  };

  // Use StepContext.Provider to pass down the stepper state and functions
  return (
    <StepContext.Provider value={{ currentStep, nextStep, prevStep, resetStepper }}>
      {children}
    </StepContext.Provider>
  );
};

// Custom hook to access stepper state and functions
const useStepper = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};

// Subcomponent: Step
const Step = ({ children }) => {
  return <div>{children}</div>;
};

// Usage
const MyApp = () => {
  return (
    <Stepper initialStep={0}>
      <div>
        <Step>
          <StepOne />
        </Step>
        <Step>
          <StepTwo />
        </Step>
        <Step>
          <StepThree />
        </Step>
      </div>
    </Stepper>
  );
};

// Subcomponents: StepOne, StepTwo, StepThree
const StepOne = () => {
  const { nextStep } = useStepper();

  return (
    <div>
      <h2>Step One</h2>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const StepTwo = () => {
  const { nextStep, prevStep } = useStepper();

  return (
    <div>
      <h2>Step Two</h2>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const StepThree = () => {
  const { prevStep, resetStepper } = useStepper();

  return (
    <div>
      <h2>Step Three</h2>
      <button onClick={prevStep}>Back</button>
      <button onClick={resetStepper}>Start Over</button>
    </div>
  );
};

export default MyApp;
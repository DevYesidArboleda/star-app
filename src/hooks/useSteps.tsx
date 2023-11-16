import { useState } from 'react';

export const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return {
    currentStep,
    setCurrentStep,
  };
}
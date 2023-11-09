import { useState } from 'react';

export function useSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  return {
    currentStep,
    setCurrentStep,
  };
}
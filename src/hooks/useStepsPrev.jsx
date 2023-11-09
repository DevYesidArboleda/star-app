import { useState } from 'react';

export function usePrevs() {
  const [previousStep, setPreviousStep] = useState(0)

  return {
    previousStep,
    setPreviousStep,
  };
}
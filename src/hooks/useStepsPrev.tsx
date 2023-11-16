import { useState } from 'react';

export const usePrevs = () => {
  const [previousStep, setPreviousStep] = useState(0)

  return {
    previousStep,
    setPreviousStep,
  };
}
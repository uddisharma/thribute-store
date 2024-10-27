'use client';
import { useState } from 'react';
import StepZero from './shared/onboarding/step-0';
import StepOne from './shared/onboarding/step-1';
import StepTwo from './shared/onboarding/step-2';
import StepThree from './shared/onboarding/step-3';
import StepFour from './shared/onboarding/step-4';
import StepFive from './shared/onboarding/step-5';
import StepSix from './shared/onboarding/step-6';
import StepSeven from './shared/onboarding/step-7';
import StepEight from './shared/onboarding/step-8';
import StepNine from './shared/onboarding/step-9';
import StepTen from './shared/onboarding/step-10';

export default function MultiStepFormPage() {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step == 0 && <StepZero step={step} setStep={setStep} />}
      {step == 1 && <StepOne step={step} setStep={setStep} />}
      {step == 2 && <StepTwo step={step} setStep={setStep} />}
      {step == 3 && <StepThree step={step} setStep={setStep} />}
      {step == 4 && <StepFour step={step} setStep={setStep} />}
      {step == 5 && <StepFive step={step} setStep={setStep} />}
      {step == 6 && <StepSix step={step} setStep={setStep} />}
      {step == 7 && <StepSeven step={step} setStep={setStep} />}
      {step == 8 && <StepEight step={step} setStep={setStep} />}
      {step == 9 && <StepNine step={step} setStep={setStep} />}
      {step == 10 && <StepTen step={step} setStep={setStep} />}
    </div>
  );
}

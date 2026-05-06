'use client';

import { useCallback } from 'react';
import { useOnboarding, OnboardingState } from '@/lib/useOnboarding';

function renderStep(
  step: number,
  state: OnboardingState,
  onNext: (data?: Partial<OnboardingState>) => void,
) {
  // Step components will be imported and rendered here in Task 6
  // For now return placeholder
  return (
    <div className="text-white text-center py-8">
      <p className="text-zinc-400 text-sm mb-4">Step {step + 1} of 7</p>
      <button onClick={() => onNext()} className="text-brand-indigo underline">
        Continue (placeholder)
      </button>
    </div>
  );
}

export default function OnboardingWizard() {
  const { state, updateState, nextStep } = useOnboarding();

  const handleNext = useCallback(
    (data?: Partial<OnboardingState>) => {
      if (data) updateState(data);
      nextStep();
    },
    [updateState, nextStep],
  );

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{
          background: 'rgba(255,255,255,0.024)',
          border: '1px solid rgba(255,255,255,0.071)',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ordinowebsite.vercel.app/logo-wordmark-light.png"
          alt="Ordino AI"
          height={32}
          className="mx-auto mb-6"
        />

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1 mb-8">
          <div
            className="bg-brand-indigo h-1 rounded-full transition-all duration-300"
            style={{ width: `${(state.step / 7) * 100}%` }}
          />
        </div>

        {/* Step content */}
        {renderStep(state.step, state, handleNext)}
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/useOnboarding';
import type { OnboardingState } from '@/lib/useOnboarding';
import AccountStep from './steps/AccountStep';
import UsernameStep from './steps/UsernameStep';
import TeamSizeStep from './steps/TeamSizeStep';
import ToolsStep from './steps/ToolsStep';
import GoalStep from './steps/GoalStep';
import WorkspaceStep from './steps/WorkspaceStep';
import ProjectStep from './steps/ProjectStep';

const STEPS = [
  AccountStep,
  UsernameStep,
  TeamSizeStep,
  ToolsStep,
  GoalStep,
  WorkspaceStep,
  ProjectStep,
];

function renderStep(
  step: number,
  state: OnboardingState,
  onNext: (data?: Partial<OnboardingState>) => void,
) {
  const StepComponent = STEPS[step];
  if (!StepComponent) return null;
  return <StepComponent state={state} onNext={onNext} />;
}

export default function OnboardingWizard() {
  const { state, nextStep } = useOnboarding();
  const router = useRouter();

  const handleNext = useCallback(
    (data?: Partial<OnboardingState>) => {
      nextStep(data);
    },
    [nextStep],
  );

  useEffect(() => {
    if (state.step >= 7) {
      router.replace('/dashboard');
    }
  }, [state.step, router]);

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{
          background: 'rgba(255,255,255,0.024)',
          border: '1px solid rgba(255,255,255,0.071)',
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ordinowebsite.vercel.app/logo-wordmark-light.png"
          alt="Ordino AI"
          height={32}
          width={120}
          className="mx-auto mb-6"
        />

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1 mb-8">
          <div
            className="bg-brand-indigo h-1 rounded-full transition-all duration-300"
            style={{ width: `${(state.step / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step content */}
        <div key={state.step} className="step-enter">
          {renderStep(state.step, state, handleNext)}
        </div>
      </div>
    </div>
  );
}

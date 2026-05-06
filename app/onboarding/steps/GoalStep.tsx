'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

const OPTIONS = [
  'Increase test coverage fast',
  'Write tests fast enough to keep up with development pace',
  'Maintain tests with changes to requirements',
  'Get clear visibility on product quality',
  'Reduce manual work in software development',
];

export default function GoalStep({ state, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>(state.goals || []);

  function toggle(option: string) {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((g) => g !== option) : [...prev, option],
    );
  }

  const isValid = selected.length > 0;

  function handleSubmit() {
    if (!isValid) return;
    onNext({ goals: selected });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">
        What&apos;s your main goal with Ordino AI?
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">Select all that apply.</p>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={[
                'rounded-lg border p-4 cursor-pointer transition-all text-left',
                isSelected
                  ? 'border-brand-indigo bg-brand-indigo/10 text-white'
                  : 'border-dark-border bg-white/[0.02] text-zinc-300 hover:border-white/20',
              ].join(' ')}
            >
              <span className="text-sm font-medium">{option}</span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white transition-opacity duration-150"
      >
        Continue
      </Button>
    </div>
  );
}

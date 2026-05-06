'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

const OPTIONS = ['Just me', '2–10', '11–50', '51–200', '200+'];

export default function TeamSizeStep({ state, onNext }: Props) {
  const [selected, setSelected] = useState<string>(state.teamSize || '');

  function toggle(option: string) {
    setSelected((prev) => (prev === option ? '' : option));
  }

  function handleSubmit() {
    if (!selected) return;
    onNext({ teamSize: selected });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">How large is your team?</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        Help us tailor Ordino AI for your team&apos;s scale.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {OPTIONS.map((option) => {
          const isSelected = selected === option;
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
        disabled={!selected}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white"
      >
        Continue
      </Button>
    </div>
  );
}

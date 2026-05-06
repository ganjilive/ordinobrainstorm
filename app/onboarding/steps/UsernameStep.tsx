'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

const USERNAME_RE = /^[a-zA-Z0-9_]{3,}$/;

export default function UsernameStep({ state, onNext }: Props) {
  const [username, setUsername] = useState(state.username || '');

  const isValid = USERNAME_RE.test(username);
  const showError = username.length > 0 && !isValid;

  function handleSubmit() {
    if (!isValid) return;
    onNext({ username });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Choose your username</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        This is how teammates will identify you in Ordino AI.
      </p>

      <div className="space-y-1.5">
        <div className="flex items-center bg-dark-surface border border-dark-border rounded-md px-3 py-2 focus-within:border-brand-indigo focus-within:ring-1 focus-within:ring-brand-indigo">
          <span className="text-zinc-500 mr-1 font-mono">@</span>
          <input
            type="text"
            className="bg-transparent text-white font-mono outline-none flex-1 text-sm"
            placeholder="yourhandle"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>
        {showError && (
          <p className="text-xs text-red-400 mt-1">
            Username must be 3+ chars, letters/numbers/underscores only
          </p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white"
      >
        Continue
      </Button>
    </div>
  );
}

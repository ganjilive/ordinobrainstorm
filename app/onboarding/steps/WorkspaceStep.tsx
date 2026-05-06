'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

export default function WorkspaceStep({ state, onNext }: Props) {
  const [workspaceName, setWorkspaceName] = useState(state.workspaceName || '');

  const isValid = workspaceName.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;
    onNext({ workspaceName: workspaceName.trim() });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Create your Workspace</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        In Ordino AI, work happens in a Workspace. Think of it like your company — a shared space
        where your team collaborates on testing and quality.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="workspace-name" className="text-zinc-300">
          Workspace name
        </Label>
        <Input
          id="workspace-name"
          type="text"
          placeholder="e.g. Acme Corp"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          autoFocus
        />
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

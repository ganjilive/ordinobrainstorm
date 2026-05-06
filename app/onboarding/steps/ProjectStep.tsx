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

export default function ProjectStep({ state, onNext }: Props) {
  const [projectName, setProjectName] = useState(state.projectName || '');

  const isValid = projectName.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;
    onNext({ projectName: projectName.trim() });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Create your first Project</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        A Project in Ordino AI is similar to a Product or Product Area in your company — a focused
        space for a specific area of work.
      </p>

      <div className="bg-brand-indigo/10 border border-brand-indigo/30 rounded-lg p-3 text-sm text-zinc-300 mb-4">
        We&apos;ll also create an example project with sample data so you can explore how Ordino AI
        works right away.
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="project-name" className="text-zinc-300">
          Project name
        </Label>
        <Input
          id="project-name"
          type="text"
          placeholder="e.g. Mobile App"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          autoFocus
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white transition-opacity duration-150"
      >
        Finish setup
      </Button>
    </div>
  );
}

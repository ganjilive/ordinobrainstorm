'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingState } from '@/lib/useOnboarding';
import { toSlug } from '@/lib/utils';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

export default function ProjectStep({ state, onNext }: Props) {
  const [projectName, setProjectName] = useState(state.projectName || '');
  const [projectId, setProjectId] = useState(
    state.projectId || toSlug(state.projectName || '')
  );
  const [isIdEdited, setIsIdEdited] = useState(false);

  const isValidId = /^[a-z0-9][a-z0-9-]*$/.test(projectId);
  const isValid = projectName.trim().length > 0 && isValidId;

  function handleNameChange(value: string) {
    setProjectName(value);
    if (!isIdEdited) {
      setProjectId(toSlug(value));
    }
  }

  function handleIdChange(value: string) {
    setIsIdEdited(true);
    setProjectId(value);
  }

  function handleSubmit() {
    if (!isValid) return;
    onNext({ projectName: projectName.trim(), projectId });
  }

  function fillDummy() {
    handleNameChange('Mobile App');
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">Create your first Project</h2>
        <button
          type="button"
          onClick={fillDummy}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0 mt-1"
        >
          Fill sample data
        </button>
      </div>
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
          onChange={(e) => handleNameChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          autoFocus
        />
      </div>

      <div className="space-y-1.5 mt-4">
        <Label htmlFor="project-id" className="text-zinc-300">
          Project ID
        </Label>
        <Input
          id="project-id"
          type="text"
          value={projectId}
          onChange={(e) => handleIdChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="bg-dark-surface border-dark-border text-white font-mono text-sm placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
        />
        {isIdEdited && !isValidId ? (
          <p className="text-xs text-red-400">
            Only lowercase letters, numbers, and hyphens. Must start with a letter or number.
          </p>
        ) : (
          <p className="text-xs text-zinc-500">Used in URLs and API references</p>
        )}
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

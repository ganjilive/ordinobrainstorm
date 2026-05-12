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

export default function WorkspaceStep({ state, onNext }: Props) {
  const [workspaceName, setWorkspaceName] = useState(state.workspaceName || '');
  const [workspaceId, setWorkspaceId] = useState(
    state.workspaceId || toSlug((state.workspaceName || '') + '-' + (state.username || ''))
  );
  const [isIdEdited, setIsIdEdited] = useState(false);

  const isValidId = /^[a-z0-9][a-z0-9-]*$/.test(workspaceId);
  const isValid = workspaceName.trim().length > 0 && isValidId;

  function handleNameChange(value: string) {
    setWorkspaceName(value);
    if (!isIdEdited) {
      setWorkspaceId(toSlug(value + '-' + state.username));
    }
  }

  function handleIdChange(value: string) {
    setIsIdEdited(true);
    setWorkspaceId(value);
  }

  function handleSubmit() {
    if (!isValid) return;
    onNext({ workspaceName: workspaceName.trim(), workspaceId });
  }

  function fillDummy() {
    handleNameChange('Acme Corp');
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">Create your Workspace</h2>
        <button
          type="button"
          onClick={fillDummy}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0 mt-1"
        >
          Fill sample data
        </button>
      </div>
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
          onChange={(e) => handleNameChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          autoFocus
        />
      </div>

      <div className="space-y-1.5 mt-4">
        <Label htmlFor="workspace-id" className="text-zinc-300">
          Workspace ID
        </Label>
        <Input
          id="workspace-id"
          type="text"
          value={workspaceId}
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
        Continue
      </Button>
    </div>
  );
}

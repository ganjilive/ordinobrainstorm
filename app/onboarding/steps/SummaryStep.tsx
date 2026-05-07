'use client';

import {
  Building2,
  FolderOpen,
  ShieldCheck,
  GitBranch,
  Download,
  FolderPlus,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

const TODO_ITEMS = [
  { num: '01', icon: GitBranch, label: 'Create a GitHub repository' },
  { num: '02', icon: Download, label: 'Download the Connector app' },
  { num: '03', icon: FolderPlus, label: 'Create a test automation project' },
  { num: '04', icon: BookOpen, label: 'Follow the user guide to start generating automated tests' },
];

export default function SummaryStep({ state, onNext }: Props) {
  const { workspaceName, projectName } = state;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">You&apos;re all set!</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        Here&apos;s what we&apos;ve set up for you.
      </p>

      {/* Workspace illustration */}
      <div
        className="rounded-xl border border-dark-border overflow-hidden mb-6"
        style={{ background: 'rgba(255,255,255,0.024)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-zinc-500" />
            <span className="text-sm font-medium text-white">
              {workspaceName || 'My Workspace'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/20 rounded-full px-2.5 py-0.5">
            <ShieldCheck size={11} />
            Admin
          </span>
        </div>

        <div className="px-5 py-3">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-1">
            Projects
          </p>
          <div className="flex items-center gap-2.5 py-2.5 border-b border-dark-border">
            <FolderOpen size={14} className="text-brand-indigo shrink-0" />
            <span className="text-sm text-white">Sandbox</span>
            <span className="ml-auto text-xs text-zinc-600">Sample</span>
          </div>
          <div className="flex items-center gap-2.5 py-2.5">
            <FolderOpen size={14} className="text-brand-indigo shrink-0" />
            <span className="text-sm text-white">{projectName || 'My Project'}</span>
          </div>
        </div>
      </div>

      {/* To-do list */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3">What&apos;s next</p>
        <div
          className="rounded-xl border border-dark-border overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          {TODO_ITEMS.map(({ num, icon: Icon, label }) => (
            <div
              key={num}
              className="flex items-center gap-3 px-4 py-3 border-b border-dark-border last:border-0"
            >
              <span className="text-xs font-mono text-zinc-600 w-5 shrink-0">{num}</span>
              <Icon size={14} className="text-zinc-500 shrink-0" />
              <span className="text-sm text-zinc-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={() => onNext()}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white transition-opacity duration-150 flex items-center justify-center gap-2"
      >
        Go to Dashboard
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}

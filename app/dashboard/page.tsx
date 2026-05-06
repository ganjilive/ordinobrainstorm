'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/useOnboarding';
import {
  Download,
  GitBranch,
  FolderPlus,
  BookOpen,
  FolderOpen,
  CheckCircle2,
  Circle,
  Users,
  ShieldCheck,
} from 'lucide-react';

const NEXT_ACTIONS = [
  {
    id: 'download-connector',
    icon: Download,
    step: 1,
    title: 'Download the Connector App',
    description:
      'Install the Ordino Connector to link your local test environment to your workspace.',
  },
  {
    id: 'create-github-repo',
    icon: GitBranch,
    step: 2,
    title: 'Create a GitHub repository',
    description:
      'Set up a dedicated repo to hold your automated test scripts and version them.',
  },
  {
    id: 'create-test-project',
    icon: FolderPlus,
    step: 3,
    title: 'Create a test automation project',
    description:
      'Create your first project in Ordino and start organizing your test suites.',
  },
  {
    id: 'read-guide',
    icon: BookOpen,
    step: 4,
    title: 'Follow the user guide',
    description:
      'Read the getting-started guide to write and run your first automated test.',
  },
] as const;

const LS_KEY = 'ordino_next_steps';

export default function DashboardPage() {
  const router = useRouter();
  const { state: onboardingState, reset } = useOnboarding();
  const { workspaceName, username, projectName } = onboardingState;
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setCompletedSteps(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  function toggleStep(id: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(LS_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const completedCount = completedSteps.size;
  const projects = ['Sample Project', ...(projectName ? [projectName] : [])];

  return (
    <div className="min-h-screen bg-dark-base font-sans">
      {/* Top bar */}
      <div className="border-b border-dark-border px-6 py-4 flex items-center justify-between">
        <img
          src="https://ordinowebsite.vercel.app/logo-wordmark-light.png"
          alt="Ordino"
          height={28}
          width={100}
          style={{ height: 28 }}
        />
        <button
          onClick={() => { reset(); router.push('/onboarding'); }}
          className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          ← Restart onboarding
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10 step-enter">
        {/* Hero */}
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Your workspace is ready.
          </h1>
          <div className="flex items-center gap-3 mt-2">
            {workspaceName && (
              <span className="text-zinc-400">{workspaceName}</span>
            )}
            {username && (
              <span className="text-zinc-600 text-sm">@{username}</span>
            )}
          </div>
        </div>

        {/* Workspace panel */}
        <section
          className="rounded-xl border border-dark-border overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-zinc-500" />
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
            {projects.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-2.5 border-b border-dark-border last:border-0"
              >
                <FolderOpen size={14} className="text-brand-indigo shrink-0" />
                <span className="text-sm text-white">{name}</span>
                {i === 0 && (
                  <span className="ml-auto text-xs text-zinc-600">Sample</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Next steps */}
        <section>
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Get started</h2>
              <p className="text-sm text-zinc-500 mt-0.5">
                Complete these steps to set up your first automated test.
              </p>
            </div>
            <span className="text-xs text-zinc-600 tabular-nums shrink-0">
              {completedCount}/{NEXT_ACTIONS.length} done
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NEXT_ACTIONS.map(({ id, icon: Icon, step, title, description }) => {
              const done = completedSteps.has(id);
              return (
                <div
                  key={id}
                  className={`relative rounded-xl border p-5 transition-all duration-200 ${
                    done
                      ? 'border-dark-border opacity-50'
                      : 'border-dark-border hover:border-brand-indigo/30'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.024)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
                          done
                            ? 'bg-brand-indigo/10 text-brand-indigo'
                            : 'bg-white/5 text-zinc-400'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="text-xs text-zinc-600 font-mono">
                        0{step}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleStep(id)}
                      className="text-zinc-600 hover:text-brand-indigo transition-colors duration-150 cursor-pointer"
                      aria-label={done ? 'Mark as not done' : 'Mark as done'}
                    >
                      {done ? (
                        <CheckCircle2 size={18} className="text-brand-indigo" />
                      ) : (
                        <Circle size={18} />
                      )}
                    </button>
                  </div>

                  <p
                    className={`text-sm font-medium leading-snug mb-1 transition-colors duration-200 ${
                      done ? 'line-through text-zinc-500' : 'text-white'
                    }`}
                  >
                    {title}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

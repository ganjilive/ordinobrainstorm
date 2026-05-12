'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/useOnboarding';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Download,
  GitBranch,
  FolderPlus,
  BookOpen,
  ArrowRight,
  Mail,
  MessageSquare,
  ExternalLink,
  Search,
  Sun,
  Moon,
  ChevronsUpDown,
  LayoutGrid,
  Wand2,
  GitFork,
  Layers,
  Workflow,
  ListChecks,
  Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Nav ─────────────────────────────────────────────────────────────────────

type NavItem = { icon: LucideIcon; label: string; active: boolean };
type NavSection = { label: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { icon: Wand2, label: 'QA Copilot', active: false },
      { icon: LayoutGrid, label: 'Dashboard', active: true },
    ],
  },
  {
    label: 'Test management',
    items: [
      { icon: GitFork, label: 'Repository', active: false },
      { icon: Layers, label: 'Shared steps', active: false },
    ],
  },
  {
    label: 'Test Automation',
    items: [
      { icon: Workflow, label: 'Automation Projects', active: false },
      { icon: ListChecks, label: 'Test runs', active: false },
    ],
  },
  {
    label: 'Settings',
    items: [{ icon: Globe, label: 'Environments', active: false }],
  },
];

// ─── Content ──────────────────────────────────────────────────────────────────

const NEXT_ACTIONS = [
  {
    id: 'download-connector',
    icon: Download,
    step: 1,
    title: 'Download the Connector App',
    description:
      'Install the Ordino Connector to link your local test environment to your workspace.',
    cta: 'Download',
    href: '#download',
  },
  {
    id: 'create-github-repo',
    icon: GitBranch,
    step: 2,
    title: 'Create a GitHub repository',
    description: 'Set up a dedicated repo to hold your automated test scripts and version them.',
    cta: 'Open GitHub',
    href: 'https://github.com/new',
  },
  {
    id: 'create-test-project',
    icon: FolderPlus,
    step: 3,
    title: 'Create a test automation project',
    description: 'Create your first project in Ordino and start organising your test suites.',
    cta: 'Open Ordino',
    href: '#projects',
  },
  {
    id: 'read-guide',
    icon: BookOpen,
    step: 4,
    title: 'Follow the user guide',
    description: 'Read the getting-started guide to write and run your first automated test.',
    cta: 'Read guide',
    href: '#docs',
  },
] as const;

const QUICK_LINKS = [
  {
    icon: BookOpen,
    label: 'Documentation',
    description: 'Full reference for all Ordino features',
    href: '#',
  },
  {
    icon: ExternalLink,
    label: 'Getting started guide',
    description: 'Step-by-step walkthrough for new users',
    href: '#',
  },
  {
    icon: MessageSquare,
    label: 'Support',
    description: 'Get help from the Ordino team',
    href: '#',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const { state: onboardingState, reset } = useOnboarding();
  const { name, username, workspaceName, workspaceId } = onboardingState;
  const [inviteEmail, setInviteEmail] = useState('');

  const displayName = name || username || 'User';
  const displayInitial = displayName[0].toUpperCase();
  const workspaceInitials = (workspaceName || 'WS').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-dark-base flex flex-col font-sans">
      {/* ── Topbar ────────────────────────────────────────────────────────── */}
      <header className="h-14 border-b border-dark-border flex items-center px-4 gap-4 shrink-0 bg-dark-base">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ordinowebsite.vercel.app/logo-wordmark-light.png"
          alt="Ordino AI"
          height={28}
          width={100}
          style={{ height: 28 }}
          className="shrink-0"
        />

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search..."
              readOnly
              className="w-full h-8 bg-white/5 border border-dark-border rounded-lg pl-8 pr-14 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none cursor-pointer"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-white/5 border border-dark-border rounded px-1.5 py-0.5 font-mono pointer-events-none">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme toggle (decorative) */}
          <div className="flex items-center bg-white/5 border border-dark-border rounded-full p-1 gap-0.5">
            <button className="p-1 rounded-full text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Sun size={13} />
            </button>
            <button className="p-1 rounded-full bg-white/10 text-white cursor-pointer">
              <Moon size={13} />
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-indigo flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {displayInitial}
            </div>
            <div className="text-xs leading-tight">
              <p className="text-white font-medium">{displayName}</p>
              <p className="text-zinc-500">{workspaceName || 'Sandbox Workspace'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="w-52 shrink-0 border-r border-dark-border flex flex-col overflow-y-auto bg-dark-surface">
          {/* Project switcher */}
          <div className="p-3 border-b border-dark-border">
            <button className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer">
              <div className="w-7 h-7 rounded-md bg-brand-indigo flex items-center justify-center text-white text-xs font-bold shrink-0">
                {workspaceInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {workspaceName || 'My Workspace'}
                </p>
                <p className="text-xs text-zinc-500 truncate font-mono">
                  {workspaceId || 'my-workspace'}
                </p>
              </div>
              <ChevronsUpDown size={14} className="text-zinc-500 shrink-0" />
            </button>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 p-3 space-y-5">
            {NAV_SECTIONS.map(({ label, items }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium mb-1.5 px-2">
                  {label}
                </p>
                <div className="space-y-0.5">
                  {items.map(({ icon: Icon, label: itemLabel, active }) => (
                    <a
                      key={itemLabel}
                      href="#"
                      className={cn(
                        'flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors',
                        active
                          ? 'bg-white/5 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5',
                      )}
                    >
                      <Icon size={15} />
                      {itemLabel}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-dark-border">
            <button
              onClick={() => {
                reset();
                router.push('/onboarding');
              }}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              ← Restart onboarding
            </button>
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10 space-y-10 step-enter">
            {/* Connector App banner */}
            <section
              className="rounded-xl border border-brand-indigo/30 p-5 flex items-center justify-between gap-4"
              style={{ background: 'rgba(99,102,241,0.08)' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-indigo/20 text-brand-indigo shrink-0">
                  <Download size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Download the Connector App</p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Connect your local environment to Ordino AI and start running automated tests.
                  </p>
                </div>
              </div>
              <a
                href="#download"
                className={cn(
                  buttonVariants(),
                  'shrink-0 bg-brand-indigo hover:bg-brand-indigo/90 text-white text-sm',
                )}
              >
                Download <ArrowRight size={14} className="ml-1" />
              </a>
            </section>

            {/* Get started */}
            <section>
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Get started</h2>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    Complete these steps to set up your first automated test.
                  </p>
                </div>
                <span className="text-xs text-zinc-600 tabular-nums shrink-0">
                  {NEXT_ACTIONS.length} steps
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {NEXT_ACTIONS.map(({ id, icon: Icon, step, title, description, cta, href }) => (
                  <div
                    key={id}
                    className="relative rounded-xl border border-dark-border hover:border-brand-indigo/30 p-5 transition-all duration-200 flex flex-col"
                    style={{ background: 'rgba(255,255,255,0.024)' }}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-zinc-400">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs text-zinc-600 font-mono">0{step}</span>
                    </div>

                    <p className="text-sm font-medium text-white leading-snug mb-1">{title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed flex-1">{description}</p>

                    <a
                      href={href}
                      className="inline-flex items-center gap-1 mt-4 text-xs text-brand-indigo hover:text-brand-indigo/80 transition-colors"
                    >
                      {cta}
                      <ArrowRight size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Invite teammates */}
            <section
              className="rounded-xl border border-dark-border p-6"
              style={{ background: 'rgba(255,255,255,0.024)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Mail size={16} className="text-zinc-400" />
                <h2 className="text-base font-semibold text-white">Invite your team</h2>
              </div>
              <p className="text-sm text-zinc-500 mb-4">
                Bring your teammates into the workspace to collaborate on test automation.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
                />
                <Button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white shrink-0">
                  Send invite
                </Button>
              </div>
            </section>

            {/* Resources */}
            <section>
              <h2 className="text-base font-semibold text-white mb-4">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {QUICK_LINKS.map(({ icon: Icon, label, description, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-xl border border-dark-border p-4 hover:border-brand-indigo/30 transition-all duration-200 group block"
                    style={{ background: 'rgba(255,255,255,0.024)' }}
                  >
                    <Icon
                      size={16}
                      className="text-zinc-500 group-hover:text-brand-indigo mb-2 transition-colors"
                    />
                    <p className="text-sm font-medium text-white mb-0.5">{label}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

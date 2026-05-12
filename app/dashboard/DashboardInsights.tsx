import { CheckCircle2, Clock, FolderKanban, Zap, PlayCircle } from 'lucide-react';

const STATS = [
  {
    id: 'projects',
    icon: FolderKanban,
    label: 'Automation Projects',
    value: '3',
    sub: 'active projects',
    color: 'text-brand-indigo',
  },
  {
    id: 'tests',
    icon: CheckCircle2,
    label: 'Tests Generated',
    value: '142',
    sub: 'across all runs',
    color: 'text-white',
  },
  {
    id: 'saved',
    icon: Clock,
    label: 'Time Saved',
    value: '47h',
    sub: 'vs manual scripting',
    color: 'text-green-500',
  },
  {
    id: 'pass',
    icon: Zap,
    label: 'Pass Rate',
    value: '94%',
    sub: 'last 30 days',
    color: 'text-green-500',
  },
] as const;

const LATEST_RUN = {
  name: 'checkout-flow',
  tests: 38,
  duration: '4m 12s',
  status: 'Passed',
  ago: '2 hrs ago',
};

export function DashboardInsights() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Insights</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Your workspace at a glance</p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {STATS.map(({ id, icon: Icon, label, value, sub, color }) => (
          <div
            key={id}
            className="rounded-xl border border-dark-border p-4 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.024)' }}
          >
            <div className="flex items-center gap-1.5">
              <Icon size={13} className="text-zinc-600" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                {label}
              </span>
            </div>
            <p className={`text-2xl font-bold leading-none ${color}`}>{value}</p>
            <p className="text-xs text-zinc-600">{sub}</p>
          </div>
        ))}
      </div>

      {/* Latest run */}
      <div
        className="rounded-xl border border-dark-border p-4 flex items-center gap-4"
        style={{ background: 'rgba(255,255,255,0.024)' }}
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-indigo/15 text-brand-indigo shrink-0">
          <PlayCircle size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">
            {LATEST_RUN.name}
            <span className="text-zinc-500 font-normal"> · {LATEST_RUN.tests} tests</span>
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Completed {LATEST_RUN.ago} · {LATEST_RUN.duration}
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 shrink-0">
          {LATEST_RUN.status}
        </span>
      </div>
    </section>
  );
}

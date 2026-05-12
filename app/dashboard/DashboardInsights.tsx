'use client';
import {
  CheckCircle2,
  Clock,
  FolderKanban,
  Zap,
  PlayCircle,
  TestTube2,
  Bot,
  Gauge,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// ─── Existing stats ───────────────────────────────────────────────────────────

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

// ─── New project-scoped stats ─────────────────────────────────────────────────

const PROJECT_STATS = [
  {
    id: 'total',
    icon: TestTube2,
    label: 'Total Test Cases',
    value: '212',
    sub: 'in this project',
    color: 'text-white',
  },
  {
    id: 'automated',
    icon: Bot,
    label: 'Automated Tests',
    value: '142',
    sub: 'test cases automated',
    color: 'text-brand-indigo',
  },
  {
    id: 'coverage',
    icon: Gauge,
    label: 'Automation Coverage',
    value: '67%',
    sub: 'of test cases automated',
    color: 'text-amber-400',
  },
] as const;

// ─── Chart data ───────────────────────────────────────────────────────────────

const COVERAGE_SLICES = [
  { label: 'Automated', value: 142, color: '#6366f1' },
  { label: 'Manual', value: 70, color: '#f59e0b' },
];

const FAILING_TESTS = [
  { name: 'checkout-flow › payment-step', count: 6, runs: ['#38', '#37', '#35'], lastFailed: '2h ago' },
  { name: 'login › sso-redirect',         count: 4, runs: ['#40', '#39'],         lastFailed: '5h ago' },
  { name: 'cart › discount-apply',         count: 3, runs: ['#36', '#35'],         lastFailed: '1d ago' },
] as const;

const FLAKY_TESTS = [
  { name: 'api › rate-limit-retry',       rate: 40, pattern: [true,false,true,false,true,true,false,true,false,true] },
  { name: 'search › autocomplete-timing', rate: 30, pattern: [true,true,false,true,true,true,false,true,true,false] },
  { name: 'checkout › promo-code-apply',  rate: 20, pattern: [true,true,true,false,true,true,true,true,false,true] },
] as const;

const COVERAGE_TREND = [
  { period: 'Mar 17', pct: 44 },
  { period: 'Mar 31', pct: 48 },
  { period: 'Apr 14', pct: 52 },
  { period: 'Apr 28', pct: 58 },
  { period: 'May 12', pct: 63 },
  { period: 'May 26', pct: 67 },
];

const TEST_RUNS = [
  { run: '#31', passed: 28, failed: 5, flaky: 3, skipped: 2 },
  { run: '#32', passed: 32, failed: 3, flaky: 2, skipped: 1 },
  { run: '#33', passed: 30, failed: 4, flaky: 1, skipped: 3 },
  { run: '#34', passed: 35, failed: 2, flaky: 2, skipped: 1 },
  { run: '#35', passed: 29, failed: 6, flaky: 4, skipped: 1 },
  { run: '#36', passed: 33, failed: 3, flaky: 1, skipped: 2 },
  { run: '#37', passed: 36, failed: 1, flaky: 2, skipped: 1 },
  { run: '#38', passed: 34, failed: 2, flaky: 3, skipped: 1 },
  { run: '#39', passed: 37, failed: 1, flaky: 1, skipped: 0 },
  { run: '#40', passed: 38, failed: 0, flaky: 2, skipped: 0 },
];

const LATEST_RUN = {
  name: 'checkout-flow',
  tests: 38,
  duration: '4m 12s',
  status: 'Passed',
  ago: '2 hrs ago',
};

// ─── Shared chart style helpers ───────────────────────────────────────────────

const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#080c16',
    border: '1px solid rgba(255,255,255,0.071)',
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: '#fff', fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: '#a1a1aa' },
};

const AXIS_PROPS = {
  tick: { fill: '#52525b', fontSize: 11 },
  axisLine: false as const,
  tickLine: false as const,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardInsightsProps {
  projectName?: string;
}

export function DashboardInsights({ projectName }: DashboardInsightsProps) {
  const displayName = projectName || 'My Project';

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Insights
            <span className="text-zinc-500 font-normal text-sm ml-2">· {displayName}</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">Your project at a glance</p>
        </div>
      </div>

      {/* Existing stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      {/* Project-scoped stat tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROJECT_STATS.map(({ id, icon: Icon, label, value, sub, color }) => (
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

      {/* Charts row 1: Pie + Trend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Automation Coverage Pie */}
        <div
          className="rounded-xl border border-dark-border p-4"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          <p className="text-xs uppercase tracking-widest text-zinc-600 font-medium mb-4">
            Automation Coverage
          </p>
          <div className="flex items-center gap-6">
            <div className="shrink-0">
              <PieChart width={120} height={120}>
                <Pie
                  data={COVERAGE_SLICES}
                  cx={55}
                  cy={55}
                  innerRadius={36}
                  outerRadius={55}
                  dataKey="value"
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                >
                  {COVERAGE_SLICES.map((slice) => (
                    <Cell key={slice.label} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} />
              </PieChart>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="text-center -ml-6 -mt-2">
                <p className="text-2xl font-bold text-white">67%</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">automated</p>
              </div>
              <div className="space-y-2">
                {COVERAGE_SLICES.map((slice) => (
                  <div key={slice.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: slice.color }}
                      />
                      <span className="text-xs text-zinc-400">{slice.label}</span>
                    </div>
                    <span className="text-xs font-medium text-white">{slice.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Trend */}
        <div
          className="rounded-xl border border-dark-border p-4"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          <p className="text-xs uppercase tracking-widest text-zinc-600 font-medium mb-4">
            Coverage Trend
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={COVERAGE_TREND} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="period" {...AXIS_PROPS} />
              <YAxis domain={[30, 80]} unit="%" {...AXIS_PROPS} />
              <Tooltip
                {...TOOLTIP_STYLE}
                formatter={(v) => [`${v}%`, 'Coverage']}
              />
              <Area
                type="monotone"
                dataKey="pct"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#trendGrad)"
                dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 4, fill: '#6366f1' }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-zinc-600 mt-2">bi-weekly · last 3 months</p>
        </div>
      </div>

      {/* Last 10 test runs bar chart */}
      <div
        className="rounded-xl border border-dark-border p-4"
        style={{ background: 'rgba(255,255,255,0.024)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-widest text-zinc-600 font-medium">
            Last 10 Test Runs
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: 'Passed', color: '#22c55e' },
              { label: 'Failed', color: '#ef4444' },
              { label: 'Flaky', color: '#f59e0b' },
              { label: 'Skipped', color: '#3f3f46' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: color }} />
                <span className="text-[10px] text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={TEST_RUNS} margin={{ top: 0, right: 4, left: -24, bottom: 0 }} barGap={1}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="run" {...AXIS_PROPS} />
            <YAxis {...AXIS_PROPS} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="passed" name="Passed" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="failed" name="Failed" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="flaky" name="Flaky" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="skipped" name="Skipped" stackId="a" fill="#3f3f46" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
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

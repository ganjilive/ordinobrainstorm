'use client';
import { Clock, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIME_SAVED = {
  hoursSaved: 47,
  withOrdino: '3h',
  manual: '50h',
  projectCount: 3,
  hint: 'Did you know? Development teams spend approximately 4 hours to automate a single user flow by writing test scripts manually.',
};

const AUTOMATION_PROJECTS = [
  {
    id: 'checkout-flow',
    name: 'Checkout Flow',
    totalTestCases: 212,
    testsGenerated: 142,
    coveragePct: 67,
    latestRunFailed: false,
    qualityHealth: 82,
    coverageTrend: [
      { period: 'Mar 17', pct: 44 },
      { period: 'Mar 31', pct: 48 },
      { period: 'Apr 14', pct: 52 },
      { period: 'Apr 28', pct: 58 },
      { period: 'May 12', pct: 63 },
      { period: 'May 26', pct: 67 },
    ],
  },
  {
    id: 'login-auth',
    name: 'Login & Auth',
    totalTestCases: 156,
    testsGenerated: 98,
    coveragePct: 63,
    latestRunFailed: true,
    qualityHealth: 61,
    coverageTrend: [
      { period: 'Mar 17', pct: 38 },
      { period: 'Mar 31', pct: 44 },
      { period: 'Apr 14', pct: 49 },
      { period: 'Apr 28', pct: 55 },
      { period: 'May 12', pct: 59 },
      { period: 'May 26', pct: 63 },
    ],
  },
  {
    id: 'cart-orders',
    name: 'Cart & Orders',
    totalTestCases: 89,
    testsGenerated: 42,
    coveragePct: 47,
    latestRunFailed: false,
    qualityHealth: 74,
    coverageTrend: [
      { period: 'Mar 17', pct: 28 },
      { period: 'Mar 31', pct: 33 },
      { period: 'Apr 14', pct: 37 },
      { period: 'Apr 28', pct: 41 },
      { period: 'May 12', pct: 44 },
      { period: 'May 26', pct: 47 },
    ],
  },
];

const COVERAGE_TRENDS_MERGED = AUTOMATION_PROJECTS[0].coverageTrend.map((_, i) => ({
  period: AUTOMATION_PROJECTS[0].coverageTrend[i].period,
  ...Object.fromEntries(AUTOMATION_PROJECTS.map((p) => [p.id, p.coverageTrend[i].pct])),
}));

const PROJECT_COLORS = ['#6366f1', '#22c55e', '#f59e0b'];

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function healthColor(score: number) {
  if (score >= 80) return 'text-green-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

function StatMini({
  label,
  value,
  color = 'text-white',
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-zinc-600">{label}</span>
      <span className={`text-xl font-bold leading-none ${color}`}>{value}</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardInsightsProps {
  projectName?: string;
}

export function DashboardInsights(_: DashboardInsightsProps) {
  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Insights</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Your automation at a glance</p>
        </div>
      </div>

      {/* Time Saved Hero */}
      <div
        className="rounded-xl border border-green-900/40 p-5 flex flex-col gap-4"
        style={{ background: 'rgba(34,197,94,0.04)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Headline */}
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-widest text-green-500/70 font-medium flex items-center gap-1.5">
              <Clock size={11} />
              Time Saved with Ordino AI
            </span>
            <p className="text-4xl font-bold text-green-400 leading-none mt-2">
              {TIME_SAVED.hoursSaved}h
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              saved across {TIME_SAVED.projectCount} projects
            </p>
          </div>

          {/* Ordino vs Manual comparison */}
          <div className="flex items-center gap-3">
            <div
              className="flex flex-col items-center px-5 py-3 rounded-lg border border-brand-indigo/30"
              style={{ background: 'rgba(99,102,241,0.08)' }}
            >
              <span className="text-2xl font-bold text-brand-indigo leading-none">
                {TIME_SAVED.withOrdino}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 text-center">With Ordino AI</span>
            </div>
            <span className="text-zinc-600 text-sm font-medium">vs</span>
            <div
              className="flex flex-col items-center px-5 py-3 rounded-lg border border-dark-border"
              style={{ background: 'rgba(255,255,255,0.024)' }}
            >
              <span className="text-2xl font-bold text-zinc-400 leading-none">
                {TIME_SAVED.manual}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 text-center">Manual scripting</span>
            </div>
          </div>
        </div>

        {/* Did you know hint */}
        <p className="text-xs text-zinc-500 italic border-t border-green-900/20 pt-3">
          💡 {TIME_SAVED.hint}
        </p>
      </div>

      {/* Section label */}
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium pt-1">
        Automation Projects
      </p>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AUTOMATION_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-dark-border p-4 flex flex-col gap-3"
            style={{ background: 'rgba(255,255,255,0.024)' }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-white truncate">{project.name}</span>
              {project.latestRunFailed && (
                <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  <AlertCircle size={10} />
                  Run Failed
                </span>
              )}
            </div>

            {/* 2×2 stats */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <StatMini label="Total Test Cases" value={project.totalTestCases} />
              <StatMini label="Automated Tests" value={project.testsGenerated} />
              <StatMini
                label="Coverage"
                value={`${project.coveragePct}%`}
                color="text-brand-indigo"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Quality Health
                </span>
                <span
                  className={`text-xl font-bold leading-none ${healthColor(project.qualityHealth)}`}
                >
                  {project.qualityHealth}
                  <span className="text-xs font-normal text-zinc-500">/100</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coverage Trends — multi-line */}
      <div
        className="rounded-xl border border-dark-border p-4"
        style={{ background: 'rgba(255,255,255,0.024)' }}
      >
        <p className="text-xs uppercase tracking-widest text-zinc-600 font-medium mb-4">
          Coverage Trends
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart
            data={COVERAGE_TRENDS_MERGED}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="period" {...AXIS_PROPS} />
            <YAxis domain={[20, 80]} unit="%" {...AXIS_PROPS} />
            <Tooltip
              {...TOOLTIP_STYLE}
              formatter={(v: unknown) => [`${v}%`]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            />
            {AUTOMATION_PROJECTS.map((project, i) => (
              <Line
                key={project.id}
                dataKey={project.id}
                name={project.name}
                stroke={PROJECT_COLORS[i]}
                strokeWidth={2}
                dot={{ fill: PROJECT_COLORS[i], r: 3, strokeWidth: 0 }}
                activeDot={{ r: 4, fill: PROJECT_COLORS[i] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-600 mt-2">bi-weekly · last 3 months</p>
      </div>
    </section>
  );
}

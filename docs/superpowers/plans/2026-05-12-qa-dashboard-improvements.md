# QA Dashboard Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Top Failing Tests and Flaky Tests sections to the top of the dashboard insights view, and remove the redundant automation coverage pie chart.

**Architecture:** All changes are confined to a single component file (`app/dashboard/DashboardInsights.tsx`). New mock data arrays are added alongside existing ones at the top of the file. Two new JSX sections are inserted at the top of the `<section>` render output. The pie chart panel and its associated data/imports are deleted.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Recharts

---

## File Map

| File | Change |
|---|---|
| `app/dashboard/DashboardInsights.tsx` | Add data, add 2 sections, remove pie chart panel + unused imports |

---

## Task 1: Add mock data arrays for failing and flaky tests

**Files:**
- Modify: `app/dashboard/DashboardInsights.tsx`

- [ ] **Step 1: Open the file and locate the data block**

The existing data constants (`STATS`, `PROJECT_STATS`, `COVERAGE_SLICES`, etc.) live between lines 27–128. Insert the two new arrays **after** `COVERAGE_SLICES` (after line 98) and **before** `COVERAGE_TREND`.

- [ ] **Step 2: Add `FAILING_TESTS` array**

Insert after the `COVERAGE_SLICES` block:

```ts
const FAILING_TESTS = [
  { name: 'checkout-flow › payment-step', count: 6, runs: ['#38', '#37', '#35'], lastFailed: '2h ago' },
  { name: 'login › sso-redirect',         count: 4, runs: ['#40', '#39'],         lastFailed: '5h ago' },
  { name: 'cart › discount-apply',         count: 3, runs: ['#36', '#35'],         lastFailed: '1d ago' },
] as const;
```

- [ ] **Step 3: Add `FLAKY_TESTS` array**

Insert immediately after `FAILING_TESTS`:

```ts
const FLAKY_TESTS = [
  { name: 'api › rate-limit-retry',       rate: 40, pattern: [true,false,true,false,true,true,false,true,false,true] },
  { name: 'search › autocomplete-timing', rate: 30, pattern: [true,true,false,true,true,true,false,true,true,false] },
  { name: 'checkout › promo-code-apply',  rate: 20, pattern: [true,true,true,false,true,true,true,true,false,true] },
] as const;
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/DashboardInsights.tsx
git commit -m "feat: add failing and flaky test mock data to dashboard insights"
```

---

## Task 2: Add Top Failing Tests and Flaky Tests sections

**Files:**
- Modify: `app/dashboard/DashboardInsights.tsx`

- [ ] **Step 1: Locate the insertion point**

Inside `DashboardInsights`, the `<section className="space-y-3">` contains a header `<div>` followed immediately by the global stat cards grid (`{/* Existing stat tiles */}`). The new two-column grid goes **between** the header div and the stat tiles.

- [ ] **Step 2: Insert the two-column grid**

Add the following JSX block after the closing `</div>` of the header block and before `{/* Existing stat tiles */}`:

```tsx
{/* Failing + Flaky tests */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {/* Top Failing Tests */}
  <div
    className="rounded-xl border border-red-900/40 p-4 flex flex-col gap-3"
    style={{ background: 'rgba(239,68,68,0.04)' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest text-red-500 font-medium">
        Top Failing Tests
      </span>
      <span className="text-[10px] text-zinc-500">Last 7 days</span>
    </div>
    <div className="flex flex-col gap-2">
      {FAILING_TESTS.map((test) => (
        <div
          key={test.name}
          className="rounded-lg border border-dark-border p-3 flex flex-col gap-1"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-mono text-white truncate">{test.name}</span>
            <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
              {test.count}×
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Run {test.runs.join(', ')} · {test.lastFailed}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Flaky Tests */}
  <div
    className="rounded-xl border border-amber-900/40 p-4 flex flex-col gap-3"
    style={{ background: 'rgba(245,158,11,0.04)' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
        Flaky Tests
      </span>
      <span className="text-[10px] text-zinc-500">Last 10 runs</span>
    </div>
    <div className="flex flex-col gap-2">
      {FLAKY_TESTS.map((test) => (
        <div
          key={test.name}
          className="rounded-lg border border-dark-border p-3 flex flex-col gap-2"
          style={{ background: 'rgba(255,255,255,0.024)' }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-mono text-white truncate">{test.name}</span>
            <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black">
              {test.rate}% flaky
            </span>
          </div>
          <div className="flex gap-0.5">
            {test.pattern.map((pass, i) => (
              <span
                key={i}
                className="w-3 h-2 rounded-sm shrink-0"
                style={{ background: pass ? '#22c55e' : '#ef4444' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Smoke check in browser**

```bash
npm run dev
```

Open `http://localhost:3000/dashboard`. Confirm:
- Two new cards appear at the top of the Insights section, above the 4 global stat tiles
- Failing Tests card has a red tint border, 3 rows with red pill badges (`6×`, `4×`, `3×`)
- Flaky Tests card has an amber tint border, 3 rows with amber pill badges and 10 spark squares each
- Existing stat tiles, charts, and latest run card are visually unchanged

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/DashboardInsights.tsx
git commit -m "feat: add top failing tests and flaky tests sections to dashboard"
```

---

## Task 3: Remove pie chart, make Coverage Trend full-width

**Files:**
- Modify: `app/dashboard/DashboardInsights.tsx`

- [ ] **Step 1: Delete the `COVERAGE_SLICES` data array**

Remove these lines entirely (currently around line 95–98):

```ts
const COVERAGE_SLICES = [
  { label: 'Automated', value: 142, color: '#6366f1' },
  { label: 'Manual', value: 70, color: '#f59e0b' },
];
```

- [ ] **Step 2: Remove unused recharts imports**

In the import block at the top of the file, remove `PieChart`, `Pie`, and `Cell` from the recharts import. The remaining recharts imports should be:

```ts
import {
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
```

- [ ] **Step 3: Replace the two-chart grid with a standalone Coverage Trend panel**

Find and replace the entire "Charts row 1: Pie + Trend" block. It currently looks like:

```tsx
{/* Charts row 1: Pie + Trend */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {/* Automation Coverage Pie */}
  <div ...> ... </div>

  {/* Coverage Trend */}
  <div ...> ... </div>
</div>
```

Replace it with just the Coverage Trend panel, standalone (no grid wrapper):

```tsx
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
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see "'PieChart' is defined but never used" or similar, it means Step 2 was incomplete — re-check the import block.

- [ ] **Step 5: Final visual check**

```bash
npm run dev
```

Open `http://localhost:3000/dashboard`. Confirm:
- The donut pie chart is gone
- Coverage Trend spans the full content width
- The "67%" Automation Coverage stat card is still present in the project stats row
- No layout shifts in other sections

- [ ] **Step 6: Commit**

```bash
git add app/dashboard/DashboardInsights.tsx
git commit -m "refactor: remove redundant automation coverage pie chart, expand trend to full width"
```

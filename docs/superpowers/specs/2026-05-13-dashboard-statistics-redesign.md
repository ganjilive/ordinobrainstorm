# Dashboard Statistics Redesign

**Date:** 2026-05-13  
**Status:** Implemented

## Context

The dashboard insights section was cluttered with overlapping metrics: 4 global stat tiles, 3 project stat tiles, top failing tests, flaky tests, a coverage trend area chart, a test runs bar chart, and a latest run card. The user wanted to declutter the view and focus on what matters: how much time Ordino AI saves, and the health/progress of each automation project.

## Scope

Full replacement of `app/dashboard/DashboardInsights.tsx`. `page.tsx` is unchanged.

## Layout

```
[Time Saved Hero — full width]
[Automation Projects label]
[Project Card] [Project Card] [Project Card]   ← 3-column grid
[Coverage Trends — full-width multi-line chart]
```

## Data Structures

### TIME_SAVED
```ts
{
  hoursSaved: 47,
  withOrdino: '3h',
  manual: '50h',
  projectCount: 3,
  hint: string,  // "Did you know?" educational callout
}
```

### AUTOMATION_PROJECTS
```ts
Array<{
  id: string,
  name: string,
  totalTestCases: number,
  testsGenerated: number,
  coveragePct: number,
  latestRunFailed: boolean,   // drives red "Run Failed" badge
  qualityHealth: number,      // 0–100 composite of pass rate + flakiness
  coverageTrend: Array<{ period: string, pct: number }>,
}>
```

### COVERAGE_TRENDS_MERGED
Derived from AUTOMATION_PROJECTS — each row keyed by `period` plus one entry per project ID. Fed directly to the Recharts LineChart.

## Components

### Time Saved Hero
Green-accented card (`border-green-900/40`, `rgba(34,197,94,0.04)` background).  
Left column: large `47h` in `text-green-400`, subline "saved across N projects".  
Right column: two comparison boxes — "With Ordino AI: 3h" (indigo accent) vs "Manual: 50h" (neutral).  
Bottom hint row (italic, `text-zinc-500`): "💡 Did you know? Development teams spend approximately 4 hours to automate a single user flow by writing test scripts manually."

### Project Cards
Dark surface card with `border-dark-border`.  
Header: project name + conditional red `"Run Failed"` pill badge (`latestRunFailed === true`).  
Body: 2×2 grid via `StatMini` helper — Total Test Cases / Tests Generated / Coverage % (indigo) / Quality Health score (color-coded).

**Quality Health color thresholds:**
- ≥ 80 → `text-green-400`
- 50–79 → `text-amber-400`
- < 50 → `text-red-400`

### Coverage Trends Chart
Full-width `LineChart` (Recharts) with `COVERAGE_TRENDS_MERGED` as data.  
One `Line` per project, colored `['#6366f1', '#22c55e', '#f59e0b']`.  
Y-axis domain `[20, 80]` with `%` unit. Legend shows project names. Height 160px.

## Sections Removed

- Global stat tiles (Automation Projects count, Tests Generated, Time Saved card, Pass Rate)
- Project-scoped stat tiles (Total Test Cases, Automated Tests, Coverage %)
- Top Failing Tests panel
- Flaky Tests panel
- Last 10 Test Runs bar chart
- Latest Run card
- Coverage Trend area chart (replaced by multi-line LineChart)

## Verification

1. `npm run dev` → `/dashboard` loads without errors
2. Time Saved hero visible first, shows 47h / 3h vs 50h / hint text
3. Three project cards: Checkout Flow (no badge), Login & Auth (red "Run Failed"), Cart & Orders (no badge)
4. Quality Health colors: 82 → green, 61 → amber, 74 → amber
5. Coverage Trends: 3 distinct lines with legend
6. None of the removed sections appear
7. `npx tsc --noEmit` exits cleanly

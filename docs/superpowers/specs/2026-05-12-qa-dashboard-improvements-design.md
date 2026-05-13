# QA Dashboard Improvements — Design Spec

**Date:** 2026-05-12
**Status:** Approved

## Context

The Ordino AI dashboard currently surfaces coverage and run history metrics but gives a QA engineer no quick path to what needs attention. A engineer opening the dashboard sees aggregate pass rates and trend charts but has to dig manually to find which tests are failing and which are flaky. This spec adds actionable test health sections at the top of the insights view and removes a redundant chart.

## Scope

Three changes to `DashboardInsights.tsx`:

1. **Add Top Failing Tests section** — new, at top of insights
2. **Add Flaky Tests section** — new, at top of insights (side-by-side with failing tests)
3. **Remove Automation Coverage Pie Chart** — redundant with the `67%` stat card; Coverage Trend becomes full-width

`page.tsx` is unchanged — the onboarding auto-collapse is already implemented via the `!allDone` gate (persisted in localStorage through `useSetupProgress`).

## Data

Add two static mock data arrays to `DashboardInsights.tsx`, consistent with the existing `TEST_RUNS` data (runs #31–#40):

```ts
const FAILING_TESTS = [
  { name: 'checkout-flow › payment-step', count: 6, runs: ['#38', '#37', '#35'], lastFailed: '2h ago' },
  { name: 'login › sso-redirect',         count: 4, runs: ['#40', '#39'],         lastFailed: '5h ago' },
  { name: 'cart › discount-apply',         count: 3, runs: ['#36', '#35'],         lastFailed: '1d ago' },
];

// pattern: true = pass, false = fail, index 0 = oldest run
const FLAKY_TESTS = [
  { name: 'api › rate-limit-retry',        rate: 40, pattern: [true,false,true,false,true,true,false,true,false,true] },
  { name: 'search › autocomplete-timing',  rate: 30, pattern: [true,true,false,true,true,true,false,true,true,false] },
  { name: 'checkout › promo-code-apply',   rate: 20, pattern: [true,true,true,false,true,true,true,true,false,true] },
];
```

## Components

### Layout — top of `<section className="space-y-3">`

Insert a new two-column grid **before** the existing stat cards grid:

```
[Top Failing Tests card] [Flaky Tests card]
[4 global stat cards                      ]
[3 project stat cards                     ]
[Coverage Trend — full width              ]  ← pie chart removed
[Last 10 Test Runs bar chart              ]
[Latest Run card                          ]
```

### Top Failing Tests card

Container: `rounded-xl border border-red-900/40 p-4`, background `rgba(239,68,68,0.04)`.

Header row: label `TOP FAILING TESTS` (red, 10px uppercase tracking-widest) + subtitle `Last 7 days` (zinc-500, right-aligned).

Each test row (`background: rgba(255,255,255,0.024)`, `border border-dark-border`, `rounded-lg p-3`):
- Top line: test name in `font-mono text-sm text-white` + red pill badge `{count}×` (white text on `bg-red-500`, `rounded-full text-xs px-2`)
- Bottom line: `text-xs text-zinc-500` — `Run {runs.join(', ')} · {lastFailed}`

### Flaky Tests card

Container: `rounded-xl border border-amber-900/40 p-4`, background `rgba(245,158,11,0.04)`.

Header row: label `FLAKY TESTS` (amber-400, same style) + subtitle `Last 10 runs`.

Each test row (same base style as above):
- Top line: test name + amber pill badge `{rate}% flaky` (black text on `bg-amber-400`)
- Spark row: 10 inline `<span>` blocks, `w-3 h-2 rounded-sm`, green (`#22c55e`) for pass, red (`#ef4444`) for fail, `gap-0.5`, matching the `pattern` array

### Coverage Trend (full-width)

Remove the `grid grid-cols-1 md:grid-cols-2` wrapper. The Coverage Trend panel gets its own full-width container identical in style to the existing bar chart panel. No other changes to the chart itself.

### Pie Chart removal

Delete the entire "Automation Coverage Pie" panel (lines 213–263 of current `DashboardInsights.tsx`). Remove unused imports: `PieChart`, `Pie`, `Cell` from recharts, and `COVERAGE_SLICES` data array.

## Design tokens (existing, reused)

| Token | Value |
|---|---|
| `border-dark-border` | `rgba(255,255,255,0.071)` |
| `bg-dark-surface` | card background |
| `text-brand-indigo` | `#6366f1` |
| Fail red | `#ef4444` |
| Flaky amber | `#f59e0b` / `amber-400` |
| Pass green | `#22c55e` |

## Verification

1. Run `npm run dev` and open `/dashboard`
2. Confirm the two new cards appear at the top of the Insights section, above the stat tiles
3. Confirm the pie chart is gone and Coverage Trend spans full width
4. Confirm no TypeScript errors (`npm run build` or `tsc --noEmit`)
5. Confirm the spark patterns in Flaky Tests correctly reflect the `pattern` arrays (green = pass, red = fail)
6. Confirm stat cards, bar chart, and latest run card are visually unchanged

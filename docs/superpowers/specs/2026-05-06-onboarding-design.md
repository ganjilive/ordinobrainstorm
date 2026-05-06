# Ordino AI Onboarding — Design Spec
**Date:** 2026-05-06

## Context

Ordino AI needs a first-run onboarding experience that collects account credentials, personalises the product for the user, and guides them through setting up their Workspace and first Project. This is a prototype — Next.js + Tailwind CSS + shadcn/ui, single-page multi-step wizard, localStorage persistence, no backend.

---

## Architecture

```
app/
  page.tsx                        → redirect: step < 7 → /onboarding, step === 7 → /dashboard
  onboarding/
    page.tsx                      → renders <OnboardingWizard />
    OnboardingWizard.tsx          → step state machine, progress bar, localStorage sync
    steps/
      AccountStep.tsx             → name, email, password
      UsernameStep.tsx            → @username
      TeamSizeStep.tsx            → preset bucket cards
      ToolsStep.tsx               → multi-select tool cards
      GoalStep.tsx                → multi-select goal cards
      WorkspaceStep.tsx           → workspace name + explainer
      ProjectStep.tsx             → project name + explainer + example project callout
  dashboard/
    page.tsx                      → mock placeholder (content TBD)
```

---

## Step Flow (7 steps)

| # | Step | Fields / UI |
|---|------|-------------|
| 1 | Account | Full name, Email, Password (single form) |
| 2 | Username | @username text input |
| 3 | Team size | Clickable preset cards: Just me / 2–10 / 11–50 / 51–200 / 200+ |
| 4 | Your tools | Multi-select cards: Cursor, Claude Code, GitHub Copilot |
| 5 | Your goal | Multi-select cards: 5 options (see below) |
| 6 | Workspace | Workspace name input + "what is a Workspace" blurb |
| 7 | Project | Project name input + "what is a Project" blurb + example project callout |

**Goal options (Step 5):**
- Increase test coverage fast
- Write tests fast enough to keep up with development pace
- Maintain tests with changes to requirements
- Get clear visibility on product quality
- Reduce manual work in software development

---

## Visual Design System

Match the aesthetic of `ordinowebsite.vercel.app` exactly:

| Token | Value |
|-------|-------|
| Base background | `#06080f` |
| Surface background | `#080c16` |
| Card background | `#ffffff06` |
| Card border | `#ffffff12` |
| Primary text | `#ffffff` |
| Muted text | `#a1a1a1` |
| Brand orange | `#ff6b2b` |
| Brand indigo | `#6366f1` |
| Brand cyan | `#22d3ee` |
| Brand violet | `#a855f7` |
| Font (sans) | Space Grotesk (via Google Fonts or `next/font`) |
| Font (mono) | JetBrains Mono (for code/username hints) |

**Logo:** `https://ordinowebsite.vercel.app/logo-wordmark-light.png` — displayed at the top of the wizard card.

**Card style:** `background: #ffffff06; border: 1px solid #ffffff12; border-radius: 12px;` with subtle box shadow.

**Primary button:** Solid `#6366f1` (indigo) background, white text, rounded, hover darkens slightly.

**Selected state (cards):** `border-color: #6366f1; background: #6366f11a;` with an indigo ring.

**Progress bar:** Thin indigo line at the top of the card, filling proportionally to current step.

---

## State

Persisted to `localStorage` key `ordino_onboarding` (password excluded):

```ts
type OnboardingState = {
  step: number;           // 0–7; 7 = complete → redirect to /dashboard
  name: string;
  email: string;
  username: string;
  teamSize: string;       // e.g. "2-10"
  tools: string[];        // e.g. ["Cursor", "Claude Code"]
  goals: string[];
  workspaceName: string;
  projectName: string;
};
```

`password` is held only in React state — never persisted.

On mount, `OnboardingWizard` reads localStorage and resumes at the saved step. On `page.tsx`, if `step === 7` is found in localStorage, immediately redirect to `/dashboard`.

---

## Step UI Details

**Shared shell:** Full-screen dark background (`#06080f`), centered card (max-w-md), Ordino logo at top of card, step progress bar, heading, optional subtext/blurb, input area, "Continue" button.

**Step 1 — Account**
- Heading: "Create your account"
- Fields: Full Name, Email, Password (with show/hide toggle)
- Validation: all fields required, basic email format check

**Step 2 — Username**
- Heading: "Choose a username"
- Single `@`-prefixed input (monospace font hint)
- Validation: alphanumeric + underscores only, min 3 chars

**Step 3 — Team size**
- Heading: "How large is your team?"
- 5 clickable cards in a 2–3 column grid: Just me / 2–10 / 11–50 / 51–200 / 200+
- Single-select; selected card gets indigo highlight

**Step 4 — Tools**
- Heading: "Which agentic coding tools do you use?"
- 3 cards: Cursor, Claude Code, GitHub Copilot
- Multi-select; at least one required to continue

**Step 5 — Goal**
- Heading: "What's your main goal with Ordino AI?"
- 5 cards with the listed options
- Multi-select; at least one required

**Step 6 — Workspace**
- Heading: "Create your Workspace"
- Blurb: *"In Ordino AI, work happens in a Workspace. Think of it like your company — a shared space where your team collaborates on testing and quality."*
- Text input: Workspace name (e.g. "Acme Corp")

**Step 7 — Project**
- Heading: "Create your first Project"
- Blurb: *"A Project in Ordino AI is similar to a Product or Product Area in your company — a focused space for a specific area of work."*
- Info callout (subtle indigo-tinted banner): *"We'll also create an example project with sample data so you can explore how Ordino AI works right away."*
- Text input: Project name (e.g. "Mobile App")
- On "Continue" → set step = 7 in localStorage → redirect to `/dashboard`

---

## Dashboard Placeholder

`/dashboard/page.tsx` renders a minimal shell:
- Ordino logo in top-left
- Centered text: "Your workspace is ready." + username/workspace name from localStorage
- Note: full dashboard content to be defined separately

---

## Verification

1. `npm run dev` → visit `http://localhost:3000`
2. Confirm redirect to `/onboarding`
3. Walk through all 7 steps, verify each continues correctly
4. Verify localStorage is updated at each step (except password)
5. Refresh mid-flow → confirm resume at correct step
6. Complete step 7 → confirm redirect to `/dashboard`
7. Revisit `http://localhost:3000` after completion → confirm redirect to `/dashboard` (not onboarding)
8. Clear localStorage → confirm onboarding restarts from step 1

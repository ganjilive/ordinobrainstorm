import { useState, useCallback } from 'react';

export type OnboardingState = {
  step: number;        // 0-7; 7 = complete
  name: string;
  email: string;
  username: string;
  teamSize: string;    // e.g. "2-10"
  tools: string[];     // e.g. ["Cursor", "Claude Code"]
  goals: string[];
  workspaceName: string;
  projectName: string;
};

const STORAGE_KEY = 'ordino_onboarding';

const DEFAULT_STATE: OnboardingState = {
  step: 0,
  name: '',
  email: '',
  username: '',
  teamSize: '',
  tools: [],
  goals: [],
  workspaceName: '',
  projectName: '',
};

function readFromStorage(): Partial<OnboardingState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<OnboardingState>;
  } catch {
    return {};
  }
}

function writeToStorage(state: OnboardingState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (e.g. private mode quota)
  }
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(() => ({
    ...DEFAULT_STATE,
    ...readFromStorage(),
  }));

  const nextStep = useCallback((partial?: Partial<OnboardingState>) => {
    setState((prev) => {
      if (prev.step >= 7) return prev;
      const next = { ...prev, ...partial, step: prev.step + 1 };
      writeToStorage(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(DEFAULT_STATE);
  }, []);

  return { state, nextStep, reset };
}

/**
 * Non-hook utility — reads localStorage state synchronously.
 * Safe to call in client components (e.g. root redirect page).
 */
export function getOnboardingState(): OnboardingState {
  return { ...DEFAULT_STATE, ...readFromStorage() };
}

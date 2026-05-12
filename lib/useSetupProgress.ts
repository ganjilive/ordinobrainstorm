import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ordino_setup_progress';

function readFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function writeToStorage(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors (e.g. private mode quota)
  }
}

export function useSetupProgress(allIds: readonly string[]) {
  const [completedIds, setCompletedIds] = useState<string[]>(() => readFromStorage());

  const completed = new Set(completedIds);
  const allDone = allIds.length > 0 && allIds.every((id) => completed.has(id));

  const toggle = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeToStorage(next);
      return next;
    });
  }, []);

  const markAllComplete = useCallback(() => {
    const next = Array.from(allIds);
    writeToStorage(next);
    setCompletedIds(next);
  }, [allIds]);

  return { completed, toggle, markAllComplete, allDone };
}

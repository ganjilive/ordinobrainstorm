'use client';
import { useEffect, useState } from 'react';
import { getOnboardingState } from '@/lib/useOnboarding';

export default function DashboardPage() {
  const [workspaceName, setWorkspaceName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const state = getOnboardingState();
    setWorkspaceName(state.workspaceName);
    setUsername(state.username);
  }, []);

  return (
    <div className="min-h-screen bg-dark-base flex flex-col items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src="https://ordinowebsite.vercel.app/logo-wordmark-light.png"
          alt="Ordino"
          height={32}
          width={120}
          style={{ height: 32 }}
        />
        <h1 className="text-4xl font-semibold text-white mt-6">
          Your workspace is ready.
        </h1>
        {workspaceName && (
          <p className="text-lg text-zinc-400">{workspaceName}</p>
        )}
        {username && (
          <p className="text-sm text-zinc-500">@{username}</p>
        )}
      </div>
      <p className="absolute bottom-8 text-sm text-zinc-600">
        Dashboard coming soon.
      </p>
    </div>
  );
}

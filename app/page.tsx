'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingState } from '@/lib/useOnboarding';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const state = getOnboardingState();
    if (state.step >= 7) {
      router.replace('/dashboard');
    } else {
      router.replace('/onboarding');
    }
  }, [router]);
  return <div className="min-h-screen bg-dark-base" />;
}

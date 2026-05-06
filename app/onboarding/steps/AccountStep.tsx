'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingState } from '@/lib/useOnboarding';

interface Props {
  state: OnboardingState;
  onNext: (data?: Partial<OnboardingState>) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountStep({ state, onNext }: Props) {
  const [name, setName] = useState(state.name || '');
  const [email, setEmail] = useState(state.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid =
    name.trim().length > 0 &&
    EMAIL_RE.test(email.trim()) &&
    password.length > 0;

  function handleSubmit() {
    if (!isValid) return;
    onNext({ name: name.trim(), email: email.trim() });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>

      <div className="space-y-4 mt-6">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-zinc-300">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-zinc-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-zinc-300">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dark-surface border-dark-border text-white placeholder:text-zinc-600 focus-visible:border-brand-indigo focus-visible:ring-brand-indigo/20 pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full mt-6 bg-brand-indigo hover:bg-brand-indigo/90 text-white"
      >
        Continue
      </Button>
    </div>
  );
}

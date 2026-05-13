'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  // Force refresh - email/password authentication
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => router.push('/dashboard'), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      setSuccess('Account created! Logging you in...');
      setTimeout(() => router.push('/dashboard'), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Plane className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-black text-gray-900">FareDip</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setTab('signin');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors ${
                tab === 'signin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setTab('signup');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors ${
                tab === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mb-6">
            {tab === 'signin'
              ? 'Sign in to track your flight prices'
              : 'Join FareDip to start saving on flights'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-bold">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-bold">{success}</p>
            </div>
          )}

          <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {tab === 'signup' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {loading
                ? tab === 'signin'
                  ? 'Signing in...'
                  : 'Creating account...'
                : tab === 'signin'
                ? 'Sign In'
                : 'Create Account'}
            </button>
          </form>

          {tab === 'signin' && (
            <p className="text-center text-gray-600 text-xs mt-4">
              Demo: demo@example.com / password123
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

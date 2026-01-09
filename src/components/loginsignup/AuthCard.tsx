'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup';

interface AuthCardProps {
  mode: AuthMode;
  isModal?: boolean;
}

export default function AuthCard({ mode, isModal = false }: AuthCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/login' : '/api/signup';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          router.push('/');
        } else {
          router.push('/login');
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isModal ? 'w-full' : 'min-h-screen flex items-center justify-center p-4'} font-sans relative backdrop-blur-sm bg-white/90`}>
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">        
               
        {/* Left Sidebar with Image */}
        <div className="w-full md:w-5/12 bg-white/80 backdrop-blur-sm relative flex items-center justify-center p-8">
          <div className="relative w-full h-full min-h-[300px] md:min-h-full">
            <Image 
              src="/auth-illustration.png" 
              alt="Learning Illustration" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Form Area */}
        <div className="w-full md:w-7/12 bg-white/70 backdrop-blur-md md:border-l border-[#3245ff]/20 p-8 md:p-12 flex flex-col justify-center relative">
          
          {/* Close Button */}
          <button 
            type="button"
            onClick={() => window.location.href = '/'}
            className="absolute top-6 right-6 text-[#3245ff]/60 hover:text-[#3245ff] transition-colors p-2 z-50"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Tabs - Vertical on Left Edge */}
          <div className="absolute top-0 bottom-0 left-0 -translate-x-full flex flex-col justify-start pt-20 gap-1 z-10">
            <Link href="/login" className="relative group flex justify-end items-center">
              <div className={`relative pl-10 py-4 pr-8 rounded-l-3xl transition-all duration-300 flex items-center font-bold tracking-wider text-sm ${isLogin ? 'bg-white/70 backdrop-blur-md text-[#3245ff] shadow-none z-20 border-y border-l border-[#3245ff]/20' : 'bg-transparent text-gray-400 hover:text-[#3245ff] z-10'}`}>
                LOGIN
                {isLogin && (
                  <>
                    {/* Top Curve */}
                    <div className="absolute -top-5 -right-px w-5 h-5 bg-transparent rounded-br-3xl shadow-[5px_5px_0_5px_rgba(255,255,255,0.7)] border-b border-r border-[#3245ff]/20"></div>
                    {/* Bottom Curve */}
                    <div className="absolute -bottom-5 -right-px w-5 h-5 bg-transparent rounded-tr-3xl shadow-[5px_-5px_0_5px_rgba(255,255,255,0.7)] border-t border-r border-[#3245ff]/20"></div>
                    {/* Connector to hide border radius on right side */}
                    <div className="absolute -right-px top-px bottom-px w-5 bg-white/70 backdrop-blur-md"></div>
                  </>
                )}
              </div>
            </Link>

            <Link href="/signup" className="relative group flex justify-end items-center">
              <div className={`relative pl-10 py-4 pr-8 rounded-l-3xl transition-all duration-300 flex items-center font-bold tracking-wider text-sm ${!isLogin ? 'bg-white/70 backdrop-blur-md text-[#3245ff] shadow-none z-20 border-y border-l border-[#3245ff]/20' : 'bg-transparent text-gray-400 hover:text-[#3245ff] z-10'}`}>
                SIGN UP
                {!isLogin && (
                  <>
                    {/* Top Curve */}
                    <div className="absolute -top-5 -right-px w-5 h-5 bg-transparent rounded-br-3xl shadow-[5px_5px_0_5px_rgba(255,255,255,0.7)] border-b border-r border-[#3245ff]/20"></div>
                    {/* Bottom Curve */}
                    <div className="absolute -bottom-5 -right-px w-5 h-5 bg-transparent rounded-tr-3xl shadow-[5px_-5px_0_5px_rgba(255,255,255,0.7)] border-t border-r border-[#3245ff]/20"></div>
                    {/* Connector to hide border radius on right side */}
                    <div className="absolute -right-px top-px bottom-px w-5 bg-white/70 backdrop-blur-md"></div>
                  </>
                )}
              </div>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto w-full">
            {/* Header Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg text-white" style={{
                background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
              }}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 tracking-wide" style={{
              background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#3245ff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 focus:border-[#3245ff] outline-none transition-colors bg-transparent placeholder-gray-400 text-gray-700"
                  />
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#3245ff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 focus:border-[#3245ff] outline-none transition-colors bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#3245ff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 focus:border-[#3245ff] outline-none transition-colors bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-[#3245ff] hover:text-[#48c9ff] font-medium">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3 rounded-full border-2 border-transparent transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                style={{
                  background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
                }}
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-500 font-medium">Or Login With</span>
              </div>
              <div className="mt-6 flex justify-center gap-6">
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

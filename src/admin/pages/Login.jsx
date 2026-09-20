import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartHandshake, Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col justify-center items-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back to Public Website link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5D42] hover:text-[#164430] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        {/* Logo and Brand Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#1F5D42] text-[#D98B3A] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1F5D42]/20">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F5D42] tracking-tight">
            Om Charitable Trust
          </h1>
          <p className="text-xs sm:text-sm text-[#24332B]/75 mt-1 font-medium">
            Admin Lead Management CRM
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1F5D42]/10">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="font-heading font-bold text-lg text-[#24332B]">
              Sign in to Dashboard
            </h2>
            <p className="text-xs text-[#24332B]/60 mt-0.5">
              Enter your authorized Trust credentials to continue.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-heading font-bold text-xs text-[#24332B] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#24332B]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="admin@omtrust.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] focus:bg-white text-[#24332B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold text-xs text-[#24332B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#24332B]/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] focus:bg-white text-[#24332B] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-[#1F5D42] hover:bg-[#164430] disabled:opacity-75 text-white font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Access CRM</span>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-[11px] text-[#24332B]/60">
          Protected Administrative Desk • Om Charitable Trust Lucknow
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../redux/authSlice.js';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, AlertIcon, CheckCircleIcon } from '../components/icons.jsx';
import Logo from '../components/Logo.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHART_BARS = [40, 65, 50, 80, 60, 95];

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: 'bg-slate-200' };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    { label: 'Very weak', color: 'bg-red-400' },
    { label: 'Weak', color: 'bg-orange-400' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-income' },
  ];
  const idx = Math.min(score, levels.length - 1);
  return { score: idx + 1, ...levels[idx] };
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [user]);

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  const nameError = touched.name && form.name.trim().length < 2 ? 'Enter your full name' : '';
  const emailError = touched.email && !EMAIL_RE.test(form.email) ? 'Enter a valid email address' : '';
  const passwordError = touched.password && form.password.length < 6 ? 'Password must be at least 6 characters' : '';
  const confirmError = touched.confirm && confirmPassword !== form.password ? 'Passwords do not match' : '';

  const canSubmit =
    form.name.trim().length >= 2 &&
    EMAIL_RE.test(form.email) &&
    form.password.length >= 6 &&
    confirmPassword === form.password &&
    agreed;

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!canSubmit) return;
    dispatch(register(form));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left branding panel with bar chart mockup */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-800 via-primary-700 to-primary-600 text-white p-12">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <Logo size={40} />
            BudgetAxis
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Join thousands tracking<br />their spending smarter.
          </h2>

          {/* Mini bar chart mockup */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-white/80">Savings growth</p>
              <span className="text-xs bg-income/20 text-emerald-200 font-medium px-2 py-0.5 rounded-full">+38%</span>
            </div>
            <div className="flex items-end gap-2 h-24">
              {CHART_BARS.map((h, i) => (
                <div key={i} className="flex-1 bg-white/25 rounded-t-md" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/50 mt-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          <div className="space-y-3">
            {['Free forever, no credit card required', 'Your financial data stays private', 'Set up in under a minute'].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircleIcon className="w-4 h-4 text-emerald-300 shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/60 text-xs">
          Secure, reliable expense tracking for everyday finances.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <Logo size={48} className="mx-auto mb-3" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="text-sm text-slate-400 mt-1">Start tracking in under a minute</p>
          </div>

          {error && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
              <AlertIcon className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Full name</label>
              <div className={`input-icon-wrap ${nameError ? 'input-error' : ''}`}>
                <UserIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={() => handleBlur('name')}
                />
              </div>
              {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Email</label>
              <div className={`input-icon-wrap ${emailError ? 'input-error' : ''}`}>
                <MailIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                />
              </div>
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Password</label>
              <div className={`input-icon-wrap ${passwordError ? 'input-error' : ''}`}>
                <LockIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="6+ characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onBlur={() => handleBlur('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-slate-400 hover:text-slate-600 shrink-0"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}

              {form.password && !passwordError && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${i < strength.score ? strength.color : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{strength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Confirm password</label>
              <div className={`input-icon-wrap ${confirmError ? 'input-error' : ''}`}>
                <LockIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur('confirm')}
                />
              </div>
              {confirmError && <p className="text-xs text-red-500 mt-1">{confirmError}</p>}
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 mt-6">
            Already have an account? <Link to="/login" className="text-primary-600 font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

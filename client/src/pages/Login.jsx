import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../redux/authSlice.js';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, AlertIcon, PieChartIcon, BellIcon, TrendingUpIcon } from '../components/icons.jsx';
import Logo from '../components/Logo.jsx';

const FEATURES = [
  { icon: PieChartIcon, text: 'Visual breakdown of spending by category' },
  { icon: BellIcon, text: 'Set monthly budgets and get alerted before you overspend' },
  { icon: TrendingUpIcon, text: 'Track income vs. expenses over time' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [user]);

  const emailError = touched.email && !EMAIL_RE.test(form.email) ? 'Enter a valid email address' : '';
  const passwordError = touched.password && form.password.length < 6 ? 'Password must be at least 6 characters' : '';
  const canSubmit = EMAIL_RE.test(form.email) && form.password.length >= 6;

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    dispatch(login(form));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left branding panel — hidden on small screens */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-800 text-white p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <Logo size={40} />
            BudgetAxis
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold leading-snug">
            Take control of your money,<br />one transaction at a time.
          </h2>
          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f.text} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 shrink-0">
                  <f.icon className="w-4.5 h-4.5 text-white" />
                </span>
                <p className="text-white/90 text-sm pt-2">{f.text}</p>
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
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-sm text-slate-400 mt-1">Log in to keep track of your spending</p>
          </div>

          {error && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
              <AlertIcon className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Remember me
              </label>
              <button type="button" className="text-primary-600 font-medium hover:text-primary-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 mt-6">
            Don't have an account? <Link to="/register" className="text-primary-600 font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

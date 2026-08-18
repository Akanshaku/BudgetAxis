import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar.jsx';
import Footer from '../components/Footer.jsx';
import { BarChartIcon, BellIcon, PlusCircleIcon, FilterIcon, ShieldCheckIcon, PhoneIcon } from '../components/icons.jsx';

const FEATURES = [
  {
    icon: BarChartIcon,
    title: 'Smart Analytics',
    desc: 'Track where your money goes with interactive charts and monthly spending trends.',
  },
  {
    icon: BellIcon,
    title: 'Budget Alerts',
    desc: 'Set a monthly budget and get warned automatically the moment you go over.',
  },
  {
    icon: PlusCircleIcon,
    title: 'Quick Add',
    desc: 'Log an expense or income entry in seconds with a fast, no-friction form.',
  },
  {
    icon: FilterIcon,
    title: 'Powerful Filters',
    desc: 'Slice your transactions by category, type, or a custom date range instantly.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Private & Secure',
    desc: 'Your data is scoped to your account with JWT-based authentication.',
  },
  {
    icon: PhoneIcon,
    title: 'Mobile Friendly',
    desc: 'A fully responsive layout that works just as well on your phone as your laptop.',
  },
];

const STEPS = [
  { num: '1', title: 'Create your free account', desc: 'Sign up in under a minute — no credit card required.' },
  { num: '2', title: 'Log your transactions', desc: 'Add income and expenses, tag them by category as you go.' },
  { num: '3', title: 'See where your money goes', desc: 'Your dashboard updates instantly with charts and budget status.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              100% Free · Open Source
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight">
              Track your spending.<br />
              <span className="text-primary-600">Stay on budget.</span>
            </h1>
            <p className="text-slate-500 text-lg mt-5 max-w-md">
              BudgetAxis helps you log income and expenses, visualize where your money goes,
              and get alerted before you overspend — all in one clean dashboard.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/register" className="btn-primary px-6 py-3 text-base">
                Start tracking for free
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 text-base font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* CSS-only dashboard preview mockup */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-200/40 rounded-full blur-3xl" />
            <div className="relative card shadow-xl border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-400">This Month</p>
                <span className="text-xs bg-green-50 text-income font-medium px-2 py-1 rounded-full">On Track</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Income</p>
                  <p className="text-lg font-bold text-income">$3,200</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Expenses</p>
                  <p className="text-lg font-bold text-expense">$1,940</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Rent', pct: 70, color: 'bg-purple-400' },
                  { label: 'Food', pct: 45, color: 'bg-orange-400' },
                  { label: 'Transport', pct: 25, color: 'bg-blue-400' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{row.label}</span>
                      <span>{row.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Everything you need to stay on top of your money</h2>
          <p className="text-slate-500 mt-3">No clutter, no learning curve — just the tools that actually help.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card hover:shadow-md transition-shadow">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100">
                <f.icon className="w-5 h-5 text-primary-600" />
              </span>
              <h3 className="font-semibold text-slate-800 mt-3">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-800">How it works</h2>
            <p className="text-slate-500 mt-3">Three steps between you and a clear picture of your finances.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold text-slate-800">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary-700 to-indigo-800 rounded-3xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to see where your money really goes?</h2>
          <p className="text-white/80 mt-3">Create your free account — it takes less than a minute.</p>
          <Link
            to="/register"
            className="inline-block mt-6 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-white/90"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './icons.jsx';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Sign Up', href: '/register' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Report an Issue', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

// Swap these for your real profile URLs once you have them —
// currently pointed at each platform's login page as requested.
const SOCIALS = [
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/login' },
  { label: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/login' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/login' },
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/accounts/login/' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
            <Logo size={32} />
            BudgetAxis
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            A simple, free way to track spending, set budgets, and understand where your money goes.
          </p>

          <div className="flex items-center gap-3 mt-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BudgetAxis. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

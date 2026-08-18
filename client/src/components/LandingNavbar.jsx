import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function LandingNavbar() {
  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <Logo size={36} />
          BudgetAxis
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-800">Features</a>
          <a href="#how-it-works" className="hover:text-slate-800">How It Works</a>
          <a href="#footer" className="hover:text-slate-800">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-800 px-3 py-2">
            Login
          </Link>
          <Link to="/register" className="btn-primary text-sm px-4 py-2">
            Sign Up Free
          </Link>
        </div>
      </div>
    </nav>
  );
}

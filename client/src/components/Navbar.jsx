import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice.js';
import Logo from './Logo.jsx';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary-700">
          <Logo size={32} />
          BudgetAxis
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 text-sm font-medium">Dashboard</Link>
            <Link to="/transactions" className="text-slate-600 hover:text-primary-600 text-sm font-medium">Transactions</Link>
            <span className="text-sm text-slate-400 hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

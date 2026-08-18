import { useDispatch } from 'react-redux';
import { removeTransaction, fetchSummary } from '../redux/transactionSlice.js';

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700',
  Rent: 'bg-purple-100 text-purple-700',
  Transport: 'bg-blue-100 text-blue-700',
  Utilities: 'bg-cyan-100 text-cyan-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Health: 'bg-red-100 text-red-700',
  Entertainment: 'bg-yellow-100 text-yellow-700',
  Salary: 'bg-green-100 text-green-700',
  Freelance: 'bg-emerald-100 text-emerald-700',
  Investment: 'bg-teal-100 text-teal-700',
  Gift: 'bg-rose-100 text-rose-700',
  Other: 'bg-slate-100 text-slate-700',
};

export default function TransactionList({ transactions }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(removeTransaction(id));
    dispatch(fetchSummary({}));
  };

  if (!transactions.length) {
    return (
      <div className="card text-center text-slate-400 py-10">
        No transactions yet — add your first one!
      </div>
    );
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="divide-y divide-slate-100">
        {transactions.map((t) => (
          <div key={t._id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[t.category] || CATEGORY_COLORS.Other}`}>
                {t.category}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-700">{t.note || t.category}</p>
                <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold text-sm ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
              </span>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-slate-300 hover:text-red-500 transition-colors text-sm"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

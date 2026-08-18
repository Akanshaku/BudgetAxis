import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transactionSlice.js';
import TransactionList from '../components/TransactionList.jsx';

const CATEGORIES = ['All', 'Food', 'Rent', 'Transport', 'Utilities', 'Shopping', 'Health', 'Entertainment', 'Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

export default function Transactions() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.transactions);
  const [filters, setFilters] = useState({ type: '', category: '', from: '', to: '' });

  useEffect(() => {
    const params = {};
    if (filters.type) params.type = filters.type;
    if (filters.category && filters.category !== 'All') params.category = filters.category;
    if (filters.from) params.from = filters.from;
    if (filters.to) params.to = filters.to;
    dispatch(fetchTransactions(params));
  }, [filters, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">All Transactions</h1>

      <div className="card flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-1">Type</label>
          <select className="input-field" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-1">Category</label>
          <select className="input-field" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-1">From</label>
          <input type="date" className="input-field" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-1">To</label>
          <input type="date" className="input-field" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
        </div>
        <button
          onClick={() => setFilters({ type: '', category: '', from: '', to: '' })}
          className="text-sm text-primary-600 font-medium"
        >
          Clear filters
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading...</p>
      ) : (
        <TransactionList transactions={items} />
      )}
    </div>
  );
}

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, fetchSummary } from '../redux/transactionSlice.js';

const EXPENSE_CATEGORIES = ['Food', 'Rent', 'Transport', 'Utilities', 'Shopping', 'Health', 'Entertainment', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

export default function TransactionForm({ onAdded }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: 'expense',
    category: 'Food',
    amount: '',
    note: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = form.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleTypeChange = (type) => {
    setForm((f) => ({ ...f, type, category: type === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    setSubmitting(true);
    await dispatch(addTransaction({ ...form, amount: Number(form.amount) }));
    dispatch(fetchSummary({}));
    setForm((f) => ({ ...f, amount: '', note: '' }));
    setSubmitting(false);
    onAdded?.();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="font-semibold text-slate-800">Add Transaction</h3>

      <div className="flex rounded-xl overflow-hidden border border-slate-200">
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            form.type === 'expense' ? 'bg-expense text-white' : 'bg-white text-slate-500'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            form.type === 'income' ? 'bg-income text-white' : 'bg-white text-slate-500'
          }`}
        >
          Income
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-500">Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="input-field mt-1"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500">Category</label>
          <select
            className="input-field mt-1"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Date</label>
        <input
          type="date"
          className="input-field mt-1"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Note (optional)</label>
        <input
          type="text"
          className="input-field mt-1"
          placeholder="e.g. Groceries at Walmart"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
}

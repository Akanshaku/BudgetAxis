import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary, fetchTransactions, addTransaction } from '../redux/transactionSlice.js';
import { updateBudget } from '../redux/authSlice.js';
import { CategoryPieChart, MonthlyTrendChart } from '../components/ChartCard.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { summary, items } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.auth);
  const [budgetInput, setBudgetInput] = useState('');
  const [editingBudget, setEditingBudget] = useState(false);

  useEffect(() => {
    dispatch(fetchSummary({}));
    dispatch(fetchTransactions({}));
  }, [dispatch]);

  const handleBudgetSave = async () => {
    if (budgetInput === '') return;
    await dispatch(updateBudget(Number(budgetInput)));
    dispatch(fetchSummary({}));
    setEditingBudget(false);
  };

  const recentTransactions = items.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-400 text-sm">
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} overview
        </p>
      </div>

      {/* Budget alert banner */}
      {summary?.budgetExceeded && (
        <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          ⚠️ You've exceeded your monthly budget of ${summary.budget.toFixed(2)} by ${Math.abs(summary.budgetRemaining).toFixed(2)}.
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs text-slate-400 font-medium">Income</p>
          <p className="text-2xl font-bold text-income mt-1">${(summary?.income || 0).toFixed(2)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-400 font-medium">Expenses</p>
          <p className="text-2xl font-bold text-expense mt-1">${(summary?.expense || 0).toFixed(2)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-400 font-medium">Balance</p>
          <p className={`text-2xl font-bold mt-1 ${(summary?.balance || 0) >= 0 ? 'text-slate-800' : 'text-expense'}`}>
            ${(summary?.balance || 0).toFixed(2)}
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-400 font-medium">Monthly Budget</p>
          {editingBudget ? (
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                autoFocus
                className="input-field py-1 text-sm"
                placeholder="Set budget"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button onClick={handleBudgetSave} className="text-primary-600 text-sm font-medium">Save</button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-slate-800">${(user?.monthlyBudget || 0).toFixed(2)}</p>
              <button
                onClick={() => { setEditingBudget(true); setBudgetInput(user?.monthlyBudget || ''); }}
                className="text-xs text-primary-600 font-medium"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-2">Spending by Category</h3>
          <CategoryPieChart data={summary?.categoryBreakdown} />
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-2">Income vs Expense (6 months)</h3>
          <MonthlyTrendChart data={summary?.monthlyTrend} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm onAdded={() => dispatch(fetchTransactions({}))} />
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-2">Recent Transactions</h3>
          <TransactionList transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
}

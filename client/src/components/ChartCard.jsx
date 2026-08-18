import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#ec4899', '#8b5cf6', '#84cc16'];

export function CategoryPieChart({ data }) {
  if (!data?.length) {
    return <div className="text-center text-slate-400 py-16 text-sm">No expense data for this month yet.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="_id"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MonthlyTrendChart({ data }) {
  // Transform aggregation output into { label, income, expense } rows
  const grouped = {};
  (data || []).forEach((row) => {
    const key = `${row._id.year}-${String(row._id.month).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = { label: key, income: 0, expense: 0 };
    grouped[key][row._id.type] = row.total;
  });
  const chartData = Object.values(grouped);

  if (!chartData.length) {
    return <div className="text-center text-slate-400 py-16 text-sm">Not enough history yet — keep logging transactions.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

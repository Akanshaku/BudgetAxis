import Transaction from '../models/Transaction.js';

// GET /api/transactions?from=&to=&category=&type=
export const getTransactions = async (req, res, next) => {
  try {
    const { from, to, category, type } = req.query;
    const filter = { user: req.user._id };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    if (category) filter.category = category;
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const { type, category, amount, note, date, recurring } = req.body;

    if (!type || !category || amount == null) {
      return res.status(400).json({ message: 'type, category and amount are required' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      note,
      date: date || Date.now(),
      recurring: !!recurring,
    });

    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    Object.assign(transaction, req.body);
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction removed' });
  } catch (err) {
    next(err);
  }
};

// GET /api/transactions/summary?month=8&year=2026
// Uses MongoDB aggregation pipeline — category totals + income vs expense
export const getSummary = async (req, res, next) => {
  try {
    const now = new Date();
    const month = parseInt(req.query.month) || now.getMonth() + 1;
    const year = parseInt(req.query.year) || now.getFullYear();

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'expense',
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const incomeVsExpense = await Transaction.aggregate([
      { $match: { user: req.user._id, date: { $gte: start, $lte: end } } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } },
    ]);

    // last 6 months trend
    const sixMonthsAgo = new Date(year, month - 6, 1);
    const monthlyTrend = await Transaction.aggregate([
      { $match: { user: req.user._id, date: { $gte: sixMonthsAgo, $lte: end } } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const income = incomeVsExpense.find((i) => i._id === 'income')?.total || 0;
    const expense = incomeVsExpense.find((i) => i._id === 'expense')?.total || 0;

    res.json({
      month,
      year,
      income,
      expense,
      balance: income - expense,
      categoryBreakdown,
      monthlyTrend,
      budget: req.user.monthlyBudget,
      budgetRemaining: req.user.monthlyBudget - expense,
      budgetExceeded: req.user.monthlyBudget > 0 && expense > req.user.monthlyBudget,
    });
  } catch (err) {
    next(err);
  }
};

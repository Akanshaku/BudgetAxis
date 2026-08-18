import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    note: { type: String, trim: true, default: '' },
    date: { type: Date, default: Date.now },
    recurring: { type: Boolean, default: false },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });

export default mongoose.model('Transaction', transactionSchema);

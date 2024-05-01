import mongoose from "mongoose";

export interface IExpense extends mongoose.Document {
  date: Date;
  amount: number;
  categoryId: string;
  description: string;
  attachment: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  amount: { type: Number, default: 0 },
  description: { type: String, default: "" },
  categoryId: { type: String, default: "" },
  attachment: { type: String, default: "" },
  created_at: { type: Date, default: Date.now(), unmutable: true },
  updated_at: { type: Date, default: Date.now() },
});

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;

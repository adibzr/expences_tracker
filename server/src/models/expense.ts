import mongoose from "mongoose";

export interface IExpense extends mongoose.Document {
  date: Date;
  amount: number;
  categoryId: string;
  description: string;
  attachment: string;
  userId: string;
}

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  amount: { type: Number, default: 0 },
  description: { type: String, default: "" },
  categoryId: { type: String, default: "" },
  attachment: { type: String, default: "" },
  userId: { type: String, required: true },
});

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;

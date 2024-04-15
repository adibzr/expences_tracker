import mongoose from "mongoose";

interface IExpense extends mongoose.Document {
  expenses_id: string;
  date: Date;
  amount: number;
  category: { [key: string]: any };
  description: string;
  attachment: string;
  user: { [key: string]: any };
  funds: { [key: string]: any };
}

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  amount: { type: Number, default: 0 },
  description: { type: String, default: "" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  attachment: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;

import mongoose from "mongoose";

export interface Budget extends mongoose.Document {
  category: { [key: string]: any };
  amount: number;
  date: Date;
  funds: { [key: string]: any };
  expense: { [key: string]: any };
}

const budgetSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  funds: { type: mongoose.Schema.Types.ObjectId, ref: "Funds" },
  expense: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
});

export default mongoose.model<Budget>("Budget", budgetSchema);

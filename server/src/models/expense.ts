import mongoose, { Schema } from "mongoose";

export interface IExpense extends mongoose.Document {
  date: Date;
  bank: { [key: string]: any };
  wallet: { [key: string]: any };
  category: { [key: string]: any };
  description: string;
  created_at: Date;
  updated_at: Date;
}

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  paymentSource: {
    kind: { type: String, enum: ["bank", "wallet"], required: true },
    item: {
      type: Schema.Types.ObjectId,
      refPath: "paymentSource.kind",
      required: true,
    },
  },
  description: { type: String, default: "" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  created_at: { type: Date, default: Date.now(), unmutable: true },
  updated_at: { type: Date, default: Date.now() },
});

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;

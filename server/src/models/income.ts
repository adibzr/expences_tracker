import mongoose, { Schema } from "mongoose";
import bank from "./bank";

export interface IIncome extends mongoose.Document {
  date: Date;
  bank: { [key: string]: any };
  wallet: { [key: string]: any };
  category: { [key: string]: any };
  description: string;
  created_at: Date;
  updated_at: Date;
}

const incomeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  bank: { type: Schema.Types.ObjectId, ref: "Bank" },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
  description: { type: String, default: "" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  created_at: { type: Date, default: Date.now(), unmutable: true },
  updated_at: { type: Date, default: Date.now() },
});

const income = mongoose.model<IIncome>("Income", incomeSchema);

export default income;

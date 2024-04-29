import mongoose, { Schema } from "mongoose";
import { IExpense } from "./expense";

export interface IGuest extends mongoose.Document {
  expense: { [key: string]: any };
  budget: { [key: string]: any };
  funds: {
    [key: string]: {
      Wallet: { [key: string]: any };
      Bank: { [key: string]: any };
    };
  };
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IGuest>(
  {
    expense: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    funds: {
      wallet: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
      bank: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
    },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IGuest>("Guest", userSchema);

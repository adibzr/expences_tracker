import { Document, Schema, Types, model } from "mongoose";

export interface IGuest extends Document {
  bank: {
    type: Types.ObjectId;
    ref: string;
  }[];
  wallet: Types.ObjectId;
  expense: Types.ObjectId[];
  income: Types.ObjectId[];
  budget: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IGuest>(
  {
    bank: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    expense: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
    income: [{ type: Schema.Types.ObjectId, ref: "Income" }],
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

export default model<IGuest>("Guest", userSchema);

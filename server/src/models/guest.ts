import mongoose, { ObjectId, Schema } from "mongoose";

export interface IGuest extends mongoose.Document {
  bank: {
    type: ObjectId;
    ref: string;
  }[];
  wallet: { type: ObjectId; ref: string };
  expense: { type: ObjectId; ref: string }[];
  income: { type: ObjectId; ref: string }[];
  budget: { type: ObjectId; ref: string };
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

export default mongoose.model<IGuest>("Guest", userSchema);

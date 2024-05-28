import { Document, Schema, Types, model } from "mongoose";

export interface IBudget extends Document {
  category: Types.ObjectId;
  amount: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

const budgetSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now(), unmutable: true },
  updated_at: { type: Date, default: Date.now() },
});

export default model<IBudget>("Budget", budgetSchema);

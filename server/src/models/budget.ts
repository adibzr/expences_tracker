import { Document, Schema, Types, model } from "mongoose";

export interface IBudget extends Document {
  category: Types.ObjectId;
  amount: number;
}

const budgetSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IBudget>("Budget", budgetSchema);

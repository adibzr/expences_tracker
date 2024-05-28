import mongoose, { Document, Schema, Types, model } from "mongoose";

export interface IIncome extends Document {
  amount: number;
  date: Date;
  paymentSource: {
    kind: "bank" | "wallet";
    item: Types.ObjectId;
  };
  category: Types.ObjectId;
  description: string;
  created_at: Date;
  updated_at: Date;
}

const incomeSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    paymentSource: {
      kind: { type: String, enum: ["bank", "wallet"], required: true },
      item: {
        type: Schema.Types.ObjectId,
        refPath: "paymentSource.kind",
      },
    },
    description: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const income = model<IIncome>("Income", incomeSchema);

export default income;

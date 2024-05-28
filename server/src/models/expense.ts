import { Document, Schema, Types, model } from "mongoose";

export interface IExpense extends Document {
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

const expenseSchema = new Schema(
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

const Expense = model<IExpense>("Expense", expenseSchema);

export default Expense;

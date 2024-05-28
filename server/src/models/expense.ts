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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Expense = model<IExpense>("Expense", expenseSchema);

export default Expense;

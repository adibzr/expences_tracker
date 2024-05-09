import { Schema, model, Document } from "mongoose";

export interface IExpensesCategory extends Document {
  title: string;
  icon: { [key: string]: any };
  iconColor: string;
}

const expensesCategorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: Schema.Types.ObjectId, ref: "Icon", required: true },
  },
  {
    versionKey: false,
  }
);

export default model<IExpensesCategory>(
  "ExpensesCategory",
  expensesCategorySchema
);

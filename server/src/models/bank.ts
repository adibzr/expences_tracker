import mongoose, { ObjectId, Schema } from "mongoose";

export interface IBank extends mongoose.Document {
  title: string;
  logo: string;
  amount: number;
  date: Date;
  fundCategory: { [key: string]: any };
  description: string;
  created_at: Date;
  updated_at: Date;
}

const bankSchema = new Schema<IBank>(
  {
    title: { type: String, required: true },
    logo: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    fundCategory: { type: Schema.Types.ObjectId, ref: "FundsCategory" },
    description: { type: String, default: "" },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },

  {
    versionKey: false,
  }
);

export default mongoose.model<IBank>("Bank", bankSchema);

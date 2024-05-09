import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {
  amount: number;
  description: string;
  date: Date;
  category: { [key: string]: any };
  created_at: Date;
  updated_at: Date;
}

const walletSchema = new Schema(
  {
    amount: { type: Number, default: 0 },
    description: { type: String, default: "" },
    date: { type: Date, default: Date.now() },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default model<IWallet>("Wallet", walletSchema);

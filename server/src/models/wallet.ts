import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {
  amount: number;
  created_at: Date;
  updated_at: Date;
}

const walletSchema = new Schema(
  {
    amount: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default model<IWallet>("Wallet", walletSchema);

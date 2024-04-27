import mongoose, { version } from "mongoose";

export interface IWallet extends mongoose.Document {
  wallet_id: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

const walletSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default mongoose.model<IWallet>("Wallet", walletSchema);

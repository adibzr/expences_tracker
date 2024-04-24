import mongoose from "mongoose";

export interface IWallet extends mongoose.Document {
  wallet_id: string;
  title: string;
  amount: number;
}

const walletSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  amount: { type: Number, default: 0 },
});

export default mongoose.model<IWallet>("Wallet", walletSchema);

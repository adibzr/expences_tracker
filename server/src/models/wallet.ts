import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {
  created_at: Date;
  updated_at: Date;
}

const walletSchema = new Schema(
  {
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default model<IWallet>("Wallet", walletSchema);

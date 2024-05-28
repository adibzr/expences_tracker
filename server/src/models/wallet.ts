import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {}

const walletSchema = new Schema(
  {},

  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IWallet>("Wallet", walletSchema);

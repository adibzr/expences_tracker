import mongoose, { ObjectId, Schema } from "mongoose";

export interface IGuest extends mongoose.Document {
  expense: {
    wallet: {
      type: ObjectId;
      ref: string;
    }[];
    bank: {
      type: ObjectId;
      ref: string;
    }[];
  };
  budget: { type: ObjectId; ref: string };
  income: {
    wallet: {
      type: ObjectId;
      ref: string;
    }[];
    bank: {
      type: ObjectId;
      ref: string;
    }[];
  };
  created_at: Date;
  updated_at: Date;
  versionKey: false;
}

const userSchema = new Schema<IGuest>(
  {
    expense: {
      wallet: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
      bank: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
    },
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    income: {
      wallet: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
      bank: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
    },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IGuest>("Guest", userSchema);

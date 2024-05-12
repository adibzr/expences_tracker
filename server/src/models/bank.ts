import mongoose, { ObjectId, Schema } from "mongoose";

export interface IBank extends mongoose.Document {
  title: string;
  logo: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

const bankSchema = new Schema<IBank>(
  {
    title: { type: String, required: true },
    logo: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },

  {
    versionKey: false,
  }
);

export default mongoose.model<IBank>("Bank", bankSchema);

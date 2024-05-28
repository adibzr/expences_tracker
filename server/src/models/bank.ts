import mongoose, { ObjectId, Schema } from "mongoose";

export interface IBank extends mongoose.Document {
  title: string;
  logo: string;
}

const bankSchema = new Schema<IBank>(
  {
    title: { type: String, required: true },
    logo: { type: String, default: "" },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IBank>("Bank", bankSchema);

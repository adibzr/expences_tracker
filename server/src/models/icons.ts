import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IIcon extends mongoose.Document {
  data: Buffer;
  title: string;
  contentType: string;
  created_at: Date;
  updated_at: Date;
}

const iconSchema = new Schema<IIcon>(
  {
    data: { type: Buffer, required: true },
    title: { type: String, required: true },
    contentType: { type: String },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IIcon>("Icon", iconSchema);

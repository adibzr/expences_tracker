import { Document, Schema, model } from "mongoose";

export interface IIcon extends Document {
  data: Buffer;
  title: string;
  contentType: string;
  iconColor: string;
  created_at: Date;
  updated_at: Date;
}

const iconSchema = new Schema<IIcon>(
  {
    data: { type: Buffer, required: true },
    title: { type: String, required: true },
    contentType: { type: String },
    iconColor: { type: String, default: "", required: true },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

export default model<IIcon>("Icon", iconSchema);

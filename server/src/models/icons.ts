import { Document, Schema, model } from "mongoose";

export interface IIcon extends Document {
  data: Buffer;
  title: string;
  contentType: string;
  iconColor: string;
}

const iconSchema = new Schema<IIcon>(
  {
    data: { type: Buffer, required: true },
    title: { type: String, required: true },
    contentType: { type: String },
    iconColor: { type: String, default: "", required: true },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IIcon>("Icon", iconSchema);

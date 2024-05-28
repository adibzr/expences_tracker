import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  title: string;
  icon: Types.ObjectId;
  iconColor: string;
  type: string;
}

const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: Schema.Types.ObjectId, ref: "Icon", required: true },
    type: { type: String, enum: ["expense", "income"], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ICategory>("Category", categorySchema);

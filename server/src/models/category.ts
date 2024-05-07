import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  icon: { [key: string]: any };
  iconColor: string;
}

const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: Schema.Types.ObjectId, ref: "Icon", required: true },
    iconColor: { type: String, default: "", required: true },
  },
  {
    versionKey: false,
  }
);

export default model<ICategory>("Category", categorySchema);

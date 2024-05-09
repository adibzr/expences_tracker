import { Schema, model, Document } from "mongoose";

export interface IfundsCategory extends Document {
  title: string;
  icon: { [key: string]: any };
  iconColor: string;
}

const fundsCategorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: Schema.Types.ObjectId, ref: "Icon", required: true },
  },
  {
    versionKey: false,
  }
);

export default model<IfundsCategory>("fundsCategory", fundsCategorySchema);

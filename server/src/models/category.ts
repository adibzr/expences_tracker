import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  title: string;
}

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

export default mongoose.model<ICategory>("Category", categorySchema);

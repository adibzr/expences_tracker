import mongoose from "mongoose";

interface ICategory extends mongoose.Document {
  title: string;
}

const categorySchema = new mongoose.Schema({
  title: { type: String, required:true , unique: true },
});

export default mongoose.model<ICategory>("Wallet", categorySchema);

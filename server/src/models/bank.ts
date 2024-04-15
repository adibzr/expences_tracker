import mongoose from "mongoose";

interface IBank extends mongoose.Document {
    title: string
    logo: string
    amount: number
}

const bankSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    logo: { type: String, default: "" },
    amount: { type: Number, default: 0 },
});



export default mongoose.model<IBank>("Bank", bankSchema)
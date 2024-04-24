import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  expense: { [key: string]: any };
  budget: { [key: string]: any };
  funds: { [key: string]: any };
  created_at: Date;
  updated_at: Date;
  comparePassword: (pasword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    expense: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    funds: {
      wallet: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
      bank: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
    },
    created_at: { type: Date, default: Date.now(), unmutable: true },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  this.updated_at = new Date();
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", userSchema);

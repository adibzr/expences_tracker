import { Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import User, { IUser } from "../../../models/user";

const rauter = Router();

rauter.get("/userbalance", auth, async (req, res) => {
  try {
    const userId = req.headers["userid"] as string;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const user: IUser = await User.findById(userId)
      .populate("expense")
      .populate("funds")
      .populate("funds.bank")
      .populate("funds.wallet");

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    let totalBalance = 0;

    totalBalance = user.funds.bank.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    totalBalance += user.funds.wallet.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    totalBalance -= user.expense.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    res.status(200).json({
      success: true,
      balance: totalBalance,
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default rauter;

import { Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";

const rauter = Router();

rauter.get("/guestbalance", auth, async (req, res) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: IGuest = await Guest.findById(guestId)
      .populate("expense")
      .populate("funds")
      .populate("funds.bank")
      .populate("funds.wallet");

    if (!guest) {
      return res.status(404).send({ error: true, message: "Guest not found" });
    }
    let totalBalance = 0;

    totalBalance = guest.funds.bank.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    totalBalance += guest.funds.wallet.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    totalBalance -= guest.expense.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );

    res.status(200).json({
      success: true,
      balance: totalBalance,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: true, message: error.message });
  }
});

export default rauter;

import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Category from "../../../models/category";
import Expense from "../../../models/expense";
import Guest from "../../../models/guest";

const router = Router();

router.post("/addguestexpense", async (req: Request, res: Response) => {
  try {
    const { date, bank, wallet, category, description, guestId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid user id" });
    }
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ error: true, message: "invalid category id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const foundBank = await bank.findById(bank);
    const foundWallet = await wallet.findById(wallet);
    let paymentSource;
    if (foundBank) {
      paymentSource = { kind: "bank", item: foundBank };
    } else if (foundWallet) {
      paymentSource = { kind: "wallet", item: foundWallet };
    } else {
      res
        .status(404)
        .json({ error: true, message: "Payment source not found" });
    }

    const newExpense = new Expense({
      date,
      paymentSource,
      category: foundCategory,
      description,
    });
    const savedExpense = await newExpense.save();

    guestFound.expense.push(savedExpense._id);
    await guestFound.save();

    res.status(201).json({ success: true, expense: savedExpense });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

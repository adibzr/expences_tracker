import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Bank from "../../../models/bank";
import Category from "../../../models/category";
import Expense from "../../../models/expense";
import Guest from "../../../models/guest";
import Wallet from "../../../models/wallet";

const router = Router();

router.post("/addguestexpense", auth, async (req: Request, res: Response) => {
  try {
    const { guestId, category, amount, date, bank, wallet, description } =
      req.body;
    if (!Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid user id" });
    }
    if (!Types.ObjectId.isValid(category)) {
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

    const foundBank = await Bank.findById(bank);
    const foundWallet = await Wallet.findById(wallet);

    let paymentSource;
    if (foundBank) {
      const savedBank = await foundBank.save();
      paymentSource = { kind: "bank", item: savedBank };
    } else {
      const savedWallet = await foundWallet.save();
      paymentSource = { kind: "wallet", item: savedWallet };
    }
    const newExpense = new Expense({
      amount,
      date,
      paymentSource,
      category: foundCategory,
      description,
    });
    guestFound.expense.push(newExpense._id);

    const savedExpense = await newExpense.save();
    await guestFound.save();
    res.status(201).json({ success: true, expense: savedExpense });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

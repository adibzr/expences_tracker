import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Bank from "../../../models/bank";
import Category from "../../../models/category";
import Guest from "../../../models/guest";
import Income from "../../../models/income";
import Wallet from "../../../models/wallet";

const router = Router();

router.post("/addguestincome", auth, async (req: Request, res: Response) => {
  try {
    const { guestId, category, amount, date, bank, wallet, description } =
      req.body;
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
    const foundBank = await Bank.findById(bank);
    const foundWallet = await Wallet.findById(wallet);

    let paymentSource;
    if (foundBank) {
      foundBank.amount = foundBank.amount + amount;
      const savedBank = await foundBank.save();
      paymentSource = { kind: "bank", item: savedBank };
    } else {
      foundWallet.amount = foundWallet.amount + amount;
      const savedWallet = await foundWallet.save();
      paymentSource = { kind: "wallet", item: savedWallet };
    }

    const newIncome = new Income({
      amount,
      date,
      paymentSource,
      category: foundCategory,
      description,
    });

    const savedIncome = await newIncome.save();
    await guestFound.save();
    res.status(201).json({ success: true, income: savedIncome });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

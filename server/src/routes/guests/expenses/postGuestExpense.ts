import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Category from "../../../models/category";
import Expense from "../../../models/expense";
import Guest from "../../../models/guest";

const router = Router();

router.post("/addGuestExpense", async (req: Request, res: Response) => {
  try {
    const { amount, categoryId, description, attachment, guestId, date } =
      req.body;
    const guestFound = await Guest.findById(guestId);
    const category = await Category.findById(categoryId);

    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid guest id" });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res
        .status(400)
        .json({ error: true, message: "invalid category id" });
    }
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    if (!category) {
      return res
        .status(404)
        .json({ error: true, message: "Category not found" });
    }

    const newExpense = new Expense({
      date,
      amount,
      category,
      description,
      attachment,
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

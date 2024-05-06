import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Category from "../../../models/category";
import Expense from "../../../models/expense";
import Guest from "../../../models/guest";

const router = Router();

router.post("/addguestexpense", async (req: Request, res: Response) => {
  try {
    const { amount, categoryId, description, attachment, guestId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid user id" });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res
        .status(400)
        .json({ error: true, message: "invalid category id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    const foundCategory = await Category.findById(categoryId);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const newExpense = new Expense({
      amount: amount,
      category: foundCategory,
      description: description,
      attachment: attachment,
      userId: guestId,
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

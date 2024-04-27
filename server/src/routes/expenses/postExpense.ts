import { Request, Response, Router } from "express";
import Category from "../../models/category";
import Expense, { IExpense } from "../../models/expense";
import User from "../../models/user";
import mongoose from "mongoose";

const router = Router();

router.post("/addexpense", async (req: Request, res: Response) => {
  try {
    const { amount, categoryId, description, attachment, userId }: IExpense =
      req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "invalid user id" });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "invalid category id" });
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    let foundCategory = await Category.findById(categoryId);
    // if (!foundCategory) {
    //   return res.status(404).json({ message: "Category not found" });
    // }
    const newExpense = new Expense({
      amount: amount,
      category: foundCategory ? foundCategory : "",
      description: description,
      attachment: attachment,
      userId: userId,
    });
    const savedExpense = await newExpense.save();

    userFound.expense.push(savedExpense._id);
    await userFound.save();

    res.status(201).json({ success: true, expense: savedExpense });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;

import { Request, Response, Router } from "express";
import Category from "../../models/category";
import Expense, { IExpense } from "../../models/expense";
import User from "../../models/user";

const router = Router();

router.post("/addexpense", async (req: Request, res: Response) => {
  try {
    const { amount, category, description, attachment, userId }: IExpense =
      req.body;
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    let foundCategory = await Category.findById(category);
    console.log(foundCategory);
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

    res.status(201).json({ expense: savedExpense });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;

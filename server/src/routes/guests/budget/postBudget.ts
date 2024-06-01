import { Request, Response, Router } from "express";
import Budget from "../../../models/budget";
import Category from "../../../models/category";
import { Types } from "mongoose";
import Guest from "../../../models/guest";
import auth from "../../../middleware/authMiddleware";

const router = Router();

router.post("/postbudget", auth, async (req: Request, res: Response) => {
  try {
    const { guestId, category, amount } = req.body;
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
      return res
        .status(404)
        .json({ error: true, message: "Category not found" });
    }

    const newBudget = new Budget({
      category: foundCategory,
      amount,
    });

    guestFound.budget.push(newBudget._id);
    guestFound.save();
    const savedBudget = await newBudget.save();

    res.status(201).json({ success: true, budget: savedBudget });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

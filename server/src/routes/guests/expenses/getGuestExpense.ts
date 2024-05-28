import { Request, Response, Router } from "express";
import mongoose, { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";
import { IExpense } from "../../../models/expense";

const router = Router();

interface populatedExpense extends Omit<IGuest, "expense"> {
  expense: IExpense[];
}

router.get("/guestexpense", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: populatedExpense = await Guest.findById(guestId).populate(
      "expense"
    );
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    const totalExpense = guest.expense.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );
    res.status(200).json({
      success: true,
      totalExpense,
      expense: guest.expense,
    });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

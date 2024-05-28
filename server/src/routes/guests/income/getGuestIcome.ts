import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";
import { IIncome } from "../../../models/income";

const router = Router();

interface populatedIcome extends Omit<IGuest, "income"> {
  income: IIncome[];
}

router.get("/guestincome", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: populatedIcome = await Guest.findById(guestId).populate(
      "income"
    );
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    const totalIncome = guest.income.reduce(
      (acc: number, curr: { amount: number }) => acc + curr.amount,
      0
    );
    res.status(200).json({
      success: true,
      totalIncome,
      income: guest.income,
    });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

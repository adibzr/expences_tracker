import { Request, Response, Router } from "express";
import auth from "../../../middleware/authMiddleware";
import Expense, { IExpense } from "../../../models/expense";
import Income, { IIncome } from "../../../models/income";
import Guest, { IGuest } from "../../../models/guest";
import mongoose from "mongoose";

const router = Router();

interface IGuestTransaction extends Omit<IGuest, "income" | "expense"> {
  income?: IIncome[];
  expense?: IExpense[];
}

router.delete(
  "/deleteguesttransaction",
  auth,
  async (req: Request, res: Response) => {
    try {
      const { guestId, type, id } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(guestId) ||
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        return res.status(400).json({ error: true, message: "invalid id" });
      }

      const transaction =
        type === "expense"
          ? await Expense.findById({
              _id: id,
            })
          : await Income.findById({
              _id: id,
            });

      if (!transaction) {
        return res
          .status(404)
          .json({ error: true, message: "Transaction not found" });
      }
      const guest: IGuestTransaction = await Guest.findById(guestId);
      if (!guest) {
        return res
          .status(404)
          .json({ error: true, message: "Guest not found" });
      }

      if (type === "expense") {
        await Expense.deleteOne({ _id: id });
        await Guest.updateOne(
          { _id: guestId },
          { $pull: { expense: { $in: id } } },
          { new: true }
        );
      } else {
        await Income.deleteOne({ _id: id });
        await Guest.updateOne(
          { _id: guestId },
          { $pull: { income: { $in: id } } },
          { new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Transaction deleted",
      });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err.message });
    }
  }
);

export default router;

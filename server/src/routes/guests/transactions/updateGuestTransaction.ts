import { Request, Response, Router } from "express";
import auth from "../../../middleware/authMiddleware";
import Expense from "../../../models/expense";
import Income from "../../../models/income";
import { ObjectId, Types } from "mongoose";

const router = Router();

interface upateDataType {
  type: string;
  id: ObjectId;
  updatedData: {
    amount: number;
    description: string;
    category: string;
    date: Date;
    bank: string;
    wallet: string;
  };
}

router.put(
  "/updateguesttransaction",
  auth,
  async (req: Request, res: Response) => {
    try {
      const { type, id, updatedData }: upateDataType = req.body;

      if (!Types.ObjectId.isValid(id.toString())) {
        return res.status(400).json({ error: true, message: "invalid id" });
      }
      const data = {
        amount: updatedData.amount,
        date: updatedData.date,
        paymentSource: {
          kind: "wallet",
          item: updatedData.wallet,
        },
        category: updatedData.category,
        description: updatedData.description,
      };
      if (updatedData.bank) {
        data.paymentSource = { kind: "bank", item: updatedData.bank };
      }
      const transaction =
        type === "expense"
          ? await Expense.findByIdAndUpdate({ _id: id }, updatedData, {
              new: true,
            })
          : await Income.findByIdAndUpdate({ _id: id }, updatedData, {
              new: true,
            });

      if (!transaction) {
        return res
          .status(404)
          .json({ error: true, message: "Transaction not found" });
      }

      res.status(200).json({
        success: true,
        message: "Transaction updated",
        transaction: transaction,
      });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err.message });
    }
  }
);

export default router;

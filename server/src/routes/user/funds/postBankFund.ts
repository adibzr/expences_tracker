import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Bank from "../../../models/bank";
import User from "../../../models/user";

const router = Router();

router.post("/addbankfund", async (req: Request, res: Response) => {
  try {
    const { userId, amount, logo, title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const bankFund = new Bank({
      amount: amount,
      logo: logo,
      title: title,
    });
    const savedBankFund = await bankFund.save();
    //userFound.funds.bank.push(bankFund._id);
    await userFound.save();
    res.status(200).json({ success: true, bank: savedBankFund });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;

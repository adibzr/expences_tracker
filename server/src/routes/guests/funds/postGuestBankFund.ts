import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Bank from "../../../models/bank";
import Guest from "../../../models/guest";
import auth from "../../../middleware/authMiddleware";

const router = Router();

router.post("/addguestbankfund", auth, async (req: Request, res: Response) => {
  try {
    const { guestId, amount, logo, title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "Invalid id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    const bankFund = new Bank({
      amount: amount,
      logo: logo,
      title: title,
    });
    const savedBankFund = await bankFund.save();
    guestFound.funds.bank.push(bankFund._id);
    await guestFound.save();
    res.status(200).json({ success: true, bank: savedBankFund });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;

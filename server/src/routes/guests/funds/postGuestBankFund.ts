import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Bank from "../../../models/bank";
import Guest from "../../../models/guest";

const router = Router();

router.post("/addguestbankfund", auth, async (req: Request, res: Response) => {
  try {
    const {
      category,
      guestId,
      bankId,
      description,
      date,
      amount,
      logo,
      title,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "Invalid id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    let foundBank = await Bank.findById(bankId);
    if (!foundBank) {
      foundBank = new Bank({
        category,
        amount,
        logo,
        title,
        date,
        description,
      });
    }

    const savedBankFund = await foundBank.save();
    guestFound.funds.bank.push(foundBank._id);
    await guestFound.save();
    res.status(200).json({ success: true, bank: savedBankFund });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;

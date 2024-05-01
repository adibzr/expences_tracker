import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Guest from "../../../models/guest";
import Wallet from "../../../models/wallet";

const router = Router();

router.post("/addguestwalletfund", async (req: Request, res: Response) => {
  try {
    const { guestId, amount, title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    const walletFund = new Wallet({
      amount: amount,
      title: title,
    });
    const savedWalletFund = await walletFund.save();
    guestFound.funds.wallet.push(walletFund._id);
    await guestFound.save();
    res.status(200).json({ success: true, wallet: savedWalletFund });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;

import { Request, Response, Router } from "express";
import mongoose, { Error } from "mongoose";
import Wallet from "../../models/wallet";
import User from "../../models/user";

const router = Router();

router.post("/addwalletfund", async (req: Request, res: Response) => {
  try {
    const { userId, amount, logo, title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "invalid id" });
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const walletFund = new Wallet({
      amount: amount,
      title: title,
    });
    const savedWalletFund = await walletFund.save();
    userFound.funds.wallet.push(walletFund._id);
    await userFound.save();
    res.status(200).json({ success: true, wallet: savedWalletFund });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;

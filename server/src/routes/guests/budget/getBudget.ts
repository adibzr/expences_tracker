import { Request, Response, Router } from "express";
import Guest from "../../../models/guest";
import { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import guest from "../../../models/guest";

const router = Router();

router.get("/getbudget", auth, async (req: Request, res: Response) => {
  try {
    const guest = await Guest.findById({
      _id: req.headers["guestid"],
    }).populate("budget");
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guests not found" });
    }
    res.status(200).json({
      success: true,
      budget: guest.budget,
    });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;

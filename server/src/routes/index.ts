import { Router } from "express";
import getOneUserExpense from "./expenses/getOneUserExpense";
import postExpense from "./expenses/postExpense";
import userCreate from "./user/userCreate";
import login from "./user/userLogin";
import postBankFund from "./funds/postBankFund";
const router = Router();

router.use("/user", userCreate);
router.use("/user", login);

router.use("/expense", getOneUserExpense);
router.use("/expense", postExpense);

router.use("/funds", postBankFund);
// router.use("/funds", postWalletFund);

export default router;

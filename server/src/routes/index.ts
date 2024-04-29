import { Router } from "express";
import getOneUserExpense from "./expenses/getOneUserExpense";
import postExpense from "./expenses/postExpense";
import postBankFund from "./funds/postBankFund";
import postWalletFund from "./funds/postWalletFund";
import guestUser from "./user/guestUser";
import userBalance from "./user/userBalance";
import userCreate from "./user/userCreate";
import login from "./user/userLogin";
const router = Router();

router.use("/user", userCreate);
router.use("/user", login);
router.use("/user", userBalance);
router.use("/user", guestUser);

router.use("/expense", getOneUserExpense);
router.use("/expense", postExpense);

router.use("/funds", postBankFund);
router.use("/funds", postWalletFund);

export default router;

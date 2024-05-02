import { Router } from "express";
//===============user================
import getOneUserExpense from "./user/expenses/getUserExpense";
import postExpense from "./user/expenses/postExpense";
import postBankFund from "./user/funds/postBankFund";
import postWalletFund from "./user/funds/postWalletFund";
import userBalance from "./user/user/userBalance";
import userCreate from "./user/user/userCreate";
import login from "./user/user/userLogin";
//===============guests================
import getGuestExpense from "./guests/expenses/getGuestExpense";
import postGuestExpense from "./guests/expenses/postGuestExpense";
import guestBalance from "./guests/guest/guestBalance";
import guestUser from "./guests/guest/guestUser";
import postGuestBankFund from "./guests/funds/postGuestBankFund";
import postGuestWalletFund from "./guests/funds/postGuestWalletFund";
import getGuestBankFund from "./guests/funds/getGuestBankFund";
import getGuestWalletFund from "./guests/funds/getGuestWalletFund";
import getGuestFund from "./guests/funds/getGuestFund";
import postCategory from "./categories/postCategory";

const router = Router();

router.use("/user", userCreate);
router.use("/user", login);
router.use("/user", userBalance);

router.use("/guest", guestUser);
router.use("/guest", guestBalance);

router.use("/expense", postGuestExpense);
router.use("/expense", getGuestExpense);
router.use("/expense", getOneUserExpense);
router.use("/expense", postExpense);

router.use("/funds", postBankFund);
router.use("/funds", postWalletFund);
router.use("/funds", postGuestBankFund);
router.use("/funds", postGuestWalletFund);
router.use("/funds", getGuestWalletFund);
router.use("/funds", getGuestBankFund);
router.use("/funds", getGuestFund);

router.use("/category", postCategory);

export default router;

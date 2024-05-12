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
import getCategory from "./categories/getCategory";
import getGuestExpense from "./guests/expenses/getGuestExpense";
import postGuestExpense from "./guests/expenses/postGuestExpense";
import getGuestBankFund from "./guests/funds/getGuestBankFund";
import getGuestFund from "./guests/funds/getGuestFund";
import getGuestWalletFund from "./guests/funds/getGuestWalletFund";
import postGuestBankFund from "./guests/funds/postGuestBankFund";
import postGuestWalletFund from "./guests/funds/postGuestWalletFund";
import guestBalance from "./guests/guest/guestBalance";
import guestUser from "./guests/guest/postNewGuest";
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
router.use("/category", getCategory);

export default router;

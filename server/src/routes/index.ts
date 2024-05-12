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
import postCategory from "./categories/postCategory";
import getGuestExpense from "./guests/expenses/getGuestExpense";
import postGuestExpense from "./guests/expenses/postGuestExpense";
import guestBalance from "./guests/guest/guestBalance";
import postNewGuest from "./guests/guest/postNewGuest";
import getGuestFund from "./guests/income/getGuestFund";
import postGuestIncome from "./guests/income/postGuestIncome";

const router = Router();

router.use("/user", userCreate);
router.use("/user", login);
router.use("/user", userBalance);

router.use("/guest", postNewGuest);
router.use("/guest", guestBalance);

router.use("/expense", postGuestExpense);
router.use("/expense", getGuestExpense);
router.use("/expense", getOneUserExpense);
router.use("/expense", postExpense);

router.use("/income", postGuestIncome);
router.use("/income", getGuestFund);

router.use("/category", postCategory);
router.use("/category", getCategory);

export default router;

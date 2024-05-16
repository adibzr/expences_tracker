import { Router } from "express";
//===============user================
import userCreate from "./user/user/userCreate";
import login from "./user/user/userLogin";
//===============guests================
import getCategory from "./categories/getCategory";
import postCategory from "./categories/postCategory";
import getGuestExpense from "./guests/expenses/getGuestExpense";
import postGuestExpense from "./guests/expenses/postGuestExpense";
import postNewGuest from "./guests/guest/postNewGuest";
import getGuestIncome from "./guests/income/getGuestIcome";
import postGuestIncome from "./guests/income/postGuestIncome";
import getGuestBank from "./guests/guest/getGuestBank";
import postGuestBank from "./guests/guest/postGuestBank";
import getGuest from "./guests/guest/getGuest";
import deleteGuestTransaction from "./guests/transactions/deleteGuestTransaction";
import updateGuestTransaction from "./guests/transactions/updateGuestTransaction";

const router = Router();

router.use("/user", userCreate);
router.use("/user", login);

router.use("/guest", postNewGuest);
router.use("/guest", getGuest);
router.use("/guest", postGuestBank);
router.use("/guest", getGuestBank);

router.use("/expense", postGuestExpense);
router.use("/expense", getGuestExpense);

router.use("/income", postGuestIncome);
router.use("/income", getGuestIncome);

router.use("/category", postCategory);
router.use("/category", getCategory);

router.use("/transaction", deleteGuestTransaction);
router.use("/transaction", updateGuestTransaction);

export default router;

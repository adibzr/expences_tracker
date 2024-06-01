import { useEffect } from "react";
import { getGuestExpense } from "../redux/slices/expenseSlice";
import { getGuestIncome } from "../redux/slices/incomeSlice";
import { useAppSelector, useAppDispatch } from "./reduxHooks";

const useGetFinancesInfo = () => {
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (guestId && token) {
      const expensePromise = dispatch(getGuestExpense());
      const incomePrimise = dispatch(getGuestIncome());
      return () => {
        incomePrimise.abort();
        expensePromise.abort();
      };
    }
  }, [guestId]);
};

export default useGetFinancesInfo
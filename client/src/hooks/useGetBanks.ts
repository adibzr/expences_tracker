import { useEffect } from "react";
import { getGuestBank } from "../redux/slices/incomeSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetBanks = () => {
  const dispatch = useAppDispatch();
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  useEffect(() => {
    if (guestId && token) {
      const promise = dispatch(getGuestBank());
      return () => {
        promise.abort();
      };
    }
    return;
  }, []);
  const { bank } = useAppSelector((state) => state.income);
  const bankTitles = bank.reduce((acc: string[], curr: { title: string }) => {
    acc.push(curr.title);
    return acc;
  }, []);
  return bankTitles;
};

export default useGetBanks;

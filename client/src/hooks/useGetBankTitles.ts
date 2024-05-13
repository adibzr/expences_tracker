import { useEffect } from "react";
import { getGuestBank } from "../redux/slices/bankSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetBankTitles = () => {
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
  const { bank } = useAppSelector((state) => state.bank);
  const bankTitles = bank.reduce((acc: string[], curr: { title: string }) => {
    acc.push(curr.title);
    return acc;
  }, []);
  return bankTitles;
};

export default useGetBankTitles;

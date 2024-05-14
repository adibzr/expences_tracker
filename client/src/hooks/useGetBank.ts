import { useEffect } from "react";
import { getGuestBank } from "../redux/slices/bankSlice";
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
  const { bank } = useAppSelector((state) => state.bank);
  const banks = bank.reduce(
    (
      acc: { title: string; id: string }[],
      curr: { title: string; _id: string }
    ) => {
      acc.push({ title: curr.title, id: curr._id });
      return acc;
    },
    []
  );
  const wallet = useAppSelector((state) => state.userAuth.guest?.wallet);
  if (wallet) banks.unshift({ title: "wallet", id: wallet });
  return banks;
};

export default useGetBanks;

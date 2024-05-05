import { useEffect } from "react";
import { getGuestBank } from "../redux/slices/fundsSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetCategories = () => {
  const dispatch = useAppDispatch();
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  useEffect(() => {
    if (guestId && token) {
      const promise = dispatch(getGuestBank({ guestId, token }));
      return () => {
        promise.abort();
      };
    }
    return;
  }, []);
  const bank = useAppSelector((state) => state.funds);
  return;
};

export default useGetCategories;

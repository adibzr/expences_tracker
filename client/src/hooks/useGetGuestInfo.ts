import { useEffect, useState } from "react";
import { getGuest, registerGuest } from "../redux/slices/userAuthSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetGuestInfo = () => {
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        if (!guestId && !token) {
          await dispatch(registerGuest()).unwrap();
        } else {
          await dispatch(getGuest()).unwrap();
        }
        setIsFetchingComplete(true);
      } catch (error) {
        console.error("Failed to fetch guest info:", error);
        setIsFetchingComplete(false);
      }
    };

    fetchGuestInfo();
  }, [dispatch, guestId, token]);

  return isFetchingComplete;
};

export default useGetGuestInfo;

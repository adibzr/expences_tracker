import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { getCategories } from "../redux/slices/categoriesSlice";

const useGetCategories = () => {
  const dispatch = useAppDispatch();
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  useEffect(() => {
    if (guestId && token) {
      const promise = dispatch(getCategories());
      return () => {
        promise.abort();
      };
    }
    return;
  }, []);
  const categories = useAppSelector((state) => state.categories.categories);

  return categories;
};

export default useGetCategories;

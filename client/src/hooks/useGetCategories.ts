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
  const category = useAppSelector((state) => state.categories.categories);
  const categories = category.reduce(
    (
      acc: { title: string; id: string }[],
      curr: { title: string; _id: string }
    ) => {
      acc.push({ title: curr.title, id: curr._id });
      return acc;
    },
    []
  );
  return categories;
};

export default useGetCategories;

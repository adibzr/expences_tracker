import { useEffect } from "react";
import { getCategories } from "../redux/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetCategories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getCategories());
    return () => {
      promise.abort();
    };
  }, []);

  const { categories } = useAppSelector((state) => state.categories);
  const categoryTitles = categories.reduce(
    (acc: string[], curr: { title: string }) => {
      acc.push(curr.title);
      return acc;
    },
    []
  );
  return categoryTitles;
};

export default useGetCategories;

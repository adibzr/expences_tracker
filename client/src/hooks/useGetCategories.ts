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

  return categories;
};

export default useGetCategories;

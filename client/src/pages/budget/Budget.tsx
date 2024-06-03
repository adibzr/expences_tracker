import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import BudgetItem from "../../components/budgetItem/BudgetItem";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetGuestInfo from "../../hooks/useGetGuestInfo";
import { getBudgets } from "../../redux/slices/budgetSlice";
import style from "./budget.module.css";
import useGetCategories from "../../hooks/useGetCategories";
import useGetTransactions from "../../hooks/useGetTransactions";

const Budget = () => {
  const isFetchingComplete = useGetGuestInfo();
  const navigate = useNavigate();
  const budget = useGetBudgets(isFetchingComplete);
  const categories = useGetCategories();
  useGetTransactions();
  const handleCreate = () => {
    navigate("create");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <KeyboardArrowLeftIcon />
        May
        <KeyboardArrowRightIcon />
      </div>
      {budget?.length !== 0 ? (
        budget?.map((budget) => {
          const foundCategory = categories.find(
            (cat) => cat._id === budget.category
          );
          if (!foundCategory) return null;
          return (
            <BudgetItem
              key={budget._id}
              amount={budget.amount}
              category={foundCategory}
            />
          );
        })
      ) : (
        <div className={style.content}>
          You don't have a budget. <br />
          Let's make one so you're in control.
        </div>
      )}
      <ButtonComponentLarge text="Create a budget" onClick={handleCreate} />
    </div>
  );
};

export default Budget;

const useGetBudgets = (isFetchingComplete: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFetchingComplete) {
      dispatch(getBudgets()).unwrap();
    }
  }, [dispatch, isFetchingComplete]);

  const budgetState = useAppSelector((state) => state.budget.budget);
  if (!budgetState) return null;

  return budgetState;
};

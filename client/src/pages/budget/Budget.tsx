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
import MonthSlider from "../../components/monthSlider/MonthSlider";

const Budget = () => {
  const isFetchingComplete = useGetGuestInfo();
  const navigate = useNavigate();
  const budget = useGetBudgets(isFetchingComplete);
  const categories = useGetCategories();
  useGetTransactions();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const handleCreate = () => {
    navigate("create");
  };
  const monthBudget = budget?.filter((budget) => {
    if (budget.createdAt)
      return new Date(budget.createdAt).getMonth() === currentMonthIndex;
  });

  return (
    <div className={style.wrapper}>
      <MonthSlider
        currentMonthIndex={currentMonthIndex}
        setCurrentMonthIndex={setCurrentMonthIndex}
      />
      {monthBudget?.length !== 0 ? (
        monthBudget?.map((budget) => {
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

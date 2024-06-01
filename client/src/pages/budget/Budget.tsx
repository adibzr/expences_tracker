import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import style from "./budget.module.css";
import { useEffect } from "react";
import { getBudgets } from "../../redux/slices/budgetSlice";

const Budget = () => {
  const navigate = useNavigate();
  const budget = useGetBudgets();
  const handleCreate = () => {
    navigate("create");
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <KeyboardArrowLeftIcon />
        may
        <KeyboardArrowRightIcon />
      </div>
      {budget?.map((budget) => (
        <div className={style.content} key={budget._id}>
          {budget.amount}
        </div>
      ))}
      <div className={style.content}>
        You don’t have a budget. <br />
        Let’s make one so you're in control.
      </div>
      <ButtonComponentLarge text="Create a budget" onClick={handleCreate} />
    </div>
  );
};

export default Budget;

const useGetBudgets = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);
  const budgetState = useAppSelector((state) => state.budget.budget);
  if (!budgetState) return null;
  return budgetState;
};

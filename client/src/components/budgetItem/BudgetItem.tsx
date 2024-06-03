import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import style from "./budgetItem.module.css";
import { useAppSelector } from "../../hooks/reduxHooks";
import { cat } from "../../redux/slices/categoriesSlice";
import { useEffect, useState } from "react";

interface Props {
  amount: number;
  category: cat;
}

const BudgetItem = ({ amount, category }: Props) => {
  const [limitReached, setLimitReached] = useState(false);
  const totalSpent = useGetSpent(category);
  const iconColor = category.icon.iconColor;
  const remaining = amount - totalSpent > 0 ? amount - totalSpent : 0;
  const percentage = Math.floor((totalSpent / amount) * 100);
  useEffect(() => {
    if (percentage >= 100) setLimitReached(true);
  }, [percentage]);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: iconColor,
    },
  }));
  return (
    <div className={style.wrapper}>
      <div className={style.categoryWrapper}>
        <div className={style.category}>
          <CircleIcon sx={{ color: `${iconColor}`, marginRight: "10px" }} />
          {category.title}
        </div>
        <div>{limitReached ? <ErrorIcon color="error" /> : null}</div>
      </div>
      <div className={style.label}>Remaining ${remaining}</div>
      <div>
        <BorderLinearProgress
          variant="determinate"
          value={percentage < 100 ? percentage : 100}
        />
      </div>
      <div className={style.amountRemaining}>amount of {amount}</div>
      {limitReached ? <p>You've exceeded the limit!</p> : null}
    </div>
  );
};

export default BudgetItem;
const useGetSpent = (category: cat) => {
  const { expense } = useAppSelector((state) => state.expense);
  const foundCategory = expense.filter((exp) => exp.category === category._id);
  const spent = foundCategory.reduce(
    (acc: number, curr: { amount: number }) => acc + curr.amount,
    0
  );
  return spent;
};

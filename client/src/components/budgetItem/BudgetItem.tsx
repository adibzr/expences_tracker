import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import useGetCategories from "../../hooks/useGetCategories";
import style from "./budgetItem.module.css";
import { useAppSelector } from "../../hooks/reduxHooks";
import { cat } from "../../redux/slices/categoriesSlice";

interface Props {
  _id: string;
  amount: number;
  category: string;
}

const BudgetItem = ({ amount, category }: Props) => {
  const categories = useGetCategories();
  const foundCategory = categories.find((cat) => cat._id === category);
  if (!foundCategory) return null;
  const totalSpent = useGetSpent(foundCategory);
  const iconColor = foundCategory.icon.iconColor;
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: iconColor,
    },
  }));
  // const progressValue = amount * 100 / totalAmount;
  return (
    <div className={style.wrapper}>
      <div className={style.categoryWrapper}>
        <div className={style.category}>
          <CircleIcon sx={{ color: `${iconColor}`, marginRight: "10px" }} />
          {foundCategory.title}
        </div>
        <div>
          <ErrorIcon />
        </div>
      </div>
      <div className={style.label}>Remaining ${amount}</div>
      <div>
        <BorderLinearProgress variant="determinate" value={100} />
      </div>
      <div className={style.amountRemaining}>amount of {amount}</div>
      <p>You've exceeded the limit!</p>
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

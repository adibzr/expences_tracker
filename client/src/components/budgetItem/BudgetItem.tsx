import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import useGetCategories from "../../hooks/useGetCategories";
import style from "./budgetItem.module.css";

interface Props {
  _id: string;
  amount: number;
  category: string;
}

const BudgetItem = ({ amount, category }: Props) => {
  const categories = useGetCategories();
  const foundCategory = categories.find((cat) => cat._id === category);
  if (!foundCategory) return null;
  const iconColor = foundCategory.icon.iconColor;
  return (
    <div className={style.wrapper}>
      <div>
        <div className={style.category}>
          <CircleIcon
            fontSize="small"
            sx={{ color: `${iconColor}`, marginRight: "10px" }}
          />
          {foundCategory.title}
        </div>
        <div>
          <ErrorIcon />
        </div>
      </div>
      <div>Remaining ${amount}</div>
      <div>prograss bar</div>
      <div>amount of {amount}</div>
      <p>You've exceeded the limit!</p>
    </div>
  );
};

export default BudgetItem;

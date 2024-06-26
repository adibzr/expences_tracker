import { useState } from "react";
import { ButtonComponentLarge } from "../../../components/ButtonComponent";
import AmountComponent from "../../../components/inputs/AmountComponent";
import SelectComponent from "../../../components/inputs/SelectComponent";
import { inputsDataState } from "../../../components/inputs/types";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import useGetCategories from "../../../hooks/useGetCategories";
import { postBudget } from "../../../redux/slices/budgetSlice";
import { cat } from "../../../redux/slices/categoriesSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./budgetCreate.module.css";
import { useNavigate } from "react-router-dom";

const BudgetCreate = () => {
  const dispatch = useAppDispatch();
  const category = useGetCategories();
  const navigate = useNavigate();
  const [input, setInput] = useState({ amount: 0, category: "" });
  const [errors, setErrors] = useState({
    amount: false,
    category: false,
    date: false,
    bank: false,
  });
  const expenseCategories = category.reduce(
    (acc: { title: string; id: string }[], curr: cat) => {
      if (curr.type === "expense")
        acc.push({ title: curr.title, id: curr._id });
      return acc;
    },
    []
  );

  const handleSubmit = () => {
    if (input.category === "") {
      setErrors({
        ...errors,
        category: true,
      });
      return;
    }
    const foundCategory = category.find((cat) => cat.title === input.category);
    if (!foundCategory) {
      alert("category not found");
      return;
    }
    const data: inputsDataState = {
      ...input,
      category: foundCategory._id as string,
    };
    if (input.amount === 0) {
      setErrors({
        ...errors,
        amount: true,
      });
      return;
    }
    setErrors({
      ...errors,
      category: false,
      amount: false,
    });
    dispatch(postBudget(data));
    setInput({ amount: 0, category: "" });
  };
  return (
    <div className={style.wrapper}>
      <button onClick={() => navigate(-1)} className={style.arrow}>
        <ArrowBackIcon />
      </button>
      <h3>How much do you want to spend?</h3>
      <AmountComponent
        color="var(--color-violet-500)"
        input={input}
        setInput={setInput}
        setError={setErrors}
      />
      <div className={style.category}>
        <SelectComponent
          label="Category"
          items={expenseCategories}
          input={input}
          errors={errors}
          setInput={setInput}
          setError={setErrors}
        />
      </div>
      <p>
        It’s important to set a realistic budget. Be sure to include all of your
        expenses and set realistic goals.
      </p>
      <ButtonComponentLarge
        text="Create"
        onClick={handleSubmit}
        className={style.createButton}
      />
    </div>
  );
};

export default BudgetCreate;
function createBudget(input: { amount: number; category: string }): any {
  throw new Error("Function not implemented.");
}

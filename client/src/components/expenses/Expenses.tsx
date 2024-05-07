// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import useGetBanks from "../../hooks/useGetBanks";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "./AmountComponent";
import DatePickerComponent from "./DatePickerComponent";
import DescriptionTextfield from "./DescriptionTextfield";
import SelectComponent from "./SelectComponent";
import style from "./expense.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postGuestExpense } from "../../redux/slices/financialSlice";
import { Icon } from "../../redux/slices/categoriesSlice";

export interface expenseDataState {
  category: string;
  date: string;
  description: string;
  amount: number;
  wallet: string;
}

export interface expenseDataError {
  category: boolean;
  date: boolean;
  wallet: boolean;
}
export interface dataType extends expenseDataState {
  foundCategory: {
    _id: string;
    title: string;
    icon: Icon;
  };
}

const Expenses = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const categoryTitles = categories.reduce(
    (acc: string[], curr: { title: string }) => {
      acc.push(curr.title);
      return acc;
    },
    []
  );
  const banks = useGetBanks();
  banks.unshift("wallet");
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    category: "",
    date: dayjs().format("DD-MM-YYYY"),
    description: "",
    amount: 0,
    wallet: "",
  });

  const [errors, setError] = useState({
    category: false,
    wallet: false,
    date: false,
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (inputs.category === "" || inputs.wallet === "") {
      setError({
        ...errors,
        category: true,
        wallet: true,
      });
    } else {
      setInputs({
        category: "",
        date: dayjs().format("DD-MM-YYYY"),
        description: "",
        amount: 0,
        wallet: "",
      });
      const foundCategory = categories.find(
        (cat) => cat.title === inputs.category
      );

      if (foundCategory) {
        const data: dataType = { foundCategory, ...inputs };
        dispatch(postGuestExpense(data));
      } else {
        setError({
          ...errors,
          category: true,
        });
      }
    }
  };

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <AmountComponent input={inputs} setInput={setInputs} />
      <div className={style.inputs}>
        <SelectComponent
          label="Category"
          items={categoryTitles}
          input={inputs}
          errors={errors}
          setInput={setInputs}
          setError={setError}
        />
        <DatePickerComponent
          input={inputs}
          errors={errors}
          setInput={setInputs}
          setError={setError}
        />
        <DescriptionTextfield input={inputs} setInput={setInputs} />
        <SelectComponent
          label="Wallet/Bank"
          items={banks}
          input={inputs}
          errors={errors}
          setInput={setInputs}
          setError={setError}
        />
      </div>
      <ButtonComponentLarge
        disabled={
          errors?.category || errors?.date || errors?.wallet ? true : false
        }
        type="submit"
        className={style.button}
        text="Continue"
      />
    </form>
  );
};

export default Expenses;

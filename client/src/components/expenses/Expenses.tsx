// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postGuestExpense } from "../../redux/slices/expenseSlice";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "./../inputs/AmountComponent";
import DatePickerComponent from "./../inputs/DatePickerComponent";
import DescriptionTextfield from "./../inputs/DescriptionTextfield";
import SelectComponent from "./../inputs/SelectComponent";
import { inputsDataState } from "./../inputs/types";
import style from "./expense.module.css";

const Expenses = () => {
  const categories = useAppSelector((state) => state.categories);
  const categoryTitles = categories.expenseCategories.reduce(
    (acc: string[], curr: { title: string }) => {
      acc.push(curr.title);
      return acc;
    },
    []
  );

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
    date: false,
    wallet: false,
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (inputs.category === "") {
      setError({
        ...errors,
        category: true,
      });
    } else {
      setInputs({
        category: "",
        date: dayjs().format("DD-MM-YYYY"),
        description: "",
        amount: 0,
        wallet: "",
      });
      const foundCategory = categories.expenseCategories.find(
        (cat) => cat.title === inputs.category
      );

      if (foundCategory) {
        const data: inputsDataState = {
          ...inputs,
          category: foundCategory._id,
        };
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
      <AmountComponent color="red" input={inputs} setInput={setInputs} />
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
      </div>
      <ButtonComponentLarge
        disabled={errors?.category || errors?.date ? true : false}
        type="submit"
        className={style.button}
        text="Continue"
      />
    </form>
  );
};

export default Expenses;

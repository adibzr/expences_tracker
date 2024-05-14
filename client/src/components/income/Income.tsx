// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetBanks from "../../hooks/useGetBank";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "../inputs/AmountComponent";
import DatePickerComponent from "../inputs/DatePickerComponent";
import DescriptionTextfield from "../inputs/DescriptionTextfield";
import SelectComponent from "../inputs/SelectComponent";
import { inputsDataState } from "../inputs/types";
import style from "./income.module.css";
import useGetCategories from "../../hooks/useGetCategories";
import { title } from "process";
import { postGuestIncome } from "../../redux/slices/incomeSlice";

const Income = () => {
  const categories = useGetCategories();
  const banks = useGetBanks();

  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    category: "",
    bank: "",
    date: dayjs().format("MM-DD-YYYY"),
    description: "",
    amount: 0,
  });

  const [errors, setError] = useState({
    category: false,
    bank: false,
    date: false,
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(errors);
    if (inputs.category === "") {
      setError({
        ...errors,
        category: true,
      });
      return;
    }
    if (inputs.bank === "") {
      setError({
        ...errors,
        bank: true,
      });
      return;
    }
    const foundCategory = categories.find(
      (cat) => cat.title === inputs.category
    );
    if (!foundCategory) {
      alert("category not found");
      return;
    }
    const foundBank = banks.find((bank) => bank.title === inputs.bank);
    if (!foundBank) {
      alert("bank not found");
      return;
    }

    const data: inputsDataState = {
      ...inputs,
      bank: foundBank.id,
      category: foundCategory.id,
    };

    dispatch(postGuestIncome(data));
    setInputs({
      category: "",
      bank: "",
      date: dayjs().format("MM-DD-YYYY"),
      description: "",
      amount: 0,
    });
  };

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <AmountComponent color="green" input={inputs} setInput={setInputs} />
      <div className={style.inputs}>
        <SelectComponent
          label="Category"
          items={categories}
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
          label="Bank"
          items={banks}
          input={inputs}
          errors={errors}
          setInput={setInputs}
          setError={setError}
        />
      </div>
      <ButtonComponentLarge
        disabled={
          errors?.category || errors?.date || errors?.bank ? true : false
        }
        type="submit"
        className={style.button}
        text="Continue"
      />
    </form>
  );
};

export default Income;

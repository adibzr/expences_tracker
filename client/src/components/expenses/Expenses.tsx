// import React, { useState } from "react";
import dayjs from "dayjs";
import { ReactElement, useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "./AmountComponent";
import DatePickerComponent from "./DatePickerComponent";
import DescriptionTextfield from "./DescriptionTextfield";
import SelectComponent from "./SelectComponent";
import style from "./expense.module.css";

export interface expenseDataState {
  category: string;
  date: string;
  description: string;
  amount: number;
  wallet: string;
}

const Expenses = () => {
  const categories = useGetCategories();
  const wallets = ["Wallet", "Bank"];

  const [inputs, setInputs] = useState({
    category: "",
    date: dayjs().format("DD-MM-YYYY"),
    description: "",
    amount: 0,
    wallet: "",
  });
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <AmountComponent input={inputs} setInput={setInputs} />
      <div className={style.inputs}>
        <SelectComponent
          label="Category"
          items={categories}
          input={inputs}
          setInput={setInputs}
        />
        <DatePickerComponent input={inputs} setInput={setInputs} />
        <DescriptionTextfield input={inputs} setInput={setInputs} />
        <SelectComponent
          label="Wallet/Bank"
          items={wallets}
          input={inputs}
          setInput={setInputs}
        />
      </div>
      <ButtonComponentLarge
        type="submit"
        className={style.button}
        text="Continue"
      />
    </form>
  );
};

export default Expenses;

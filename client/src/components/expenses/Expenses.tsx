// import React, { useState } from "react";
import { ButtonComponentLarge } from "../ButtonComponent";
import DatePickerComponent from "./DatePickerComponent";
import DescriptionTextfield from "./DescriptionTextfield";
import SelectComponent from "./SelectComponent";

import style from "./expense.module.css";
export interface expenseDataState {
  category: string;
  date: Date;
  description: string;
  amount: number;
}

const Expenses = () => {
  const categories = ["Food", "Clothes", "Entertainment"];
  const wallets = ["Wallet", "Bank"];

  return (
    <div className={style.wrapper}>
      <div className={style.amount}>0</div>
      <div className={style.inputs}>
        {/* category */}
        <SelectComponent label="Category" items={categories} />
        {/* date */}
        <DatePickerComponent />
        {/* description */}
        <DescriptionTextfield />
        {/* wallet/bank */}
        <SelectComponent label="Wallet/Bank" items={wallets} />
      </div>
      <ButtonComponentLarge className={style.button} text="Continue" />
    </div>
  );
};

export default Expenses;

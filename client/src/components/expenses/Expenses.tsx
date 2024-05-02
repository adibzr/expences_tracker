import React, { useState } from "react";
import SelectComponent from "./SelectComponent";

export interface expenseDataState {
  category: string;
  date: Date;
  description: string;
  amount: number;
}

const Expenses = () => {
  const [expenseData, setExpenseData] = useState<expenseDataState>({
    category: "",
    date: new Date(),
    description: "",
    amount: 0,
  });
  const selectOptions = ["Documentation", "Components", "Features"];

  return (
    <>
      <SelectComponent
        selectOptions={selectOptions}
        setExpenseData={setExpenseData}
      />
    </>
  );
};

export default Expenses;

// import React, { useState } from "react";
import DescriptionTextfield from "./DescriptionTextfield";
import SelectComponent from "./SelectComponent";

export interface expenseDataState {
  category: string;
  date: Date;
  description: string;
  amount: number;
}

const Expenses = () => {
  // const [expenseData, setExpenseData] = useState<expenseDataState>({
  //   category: "",
  //   date: new Date(),
  //   description: "",
  //   amount: 0,
  // });
  // const selectOptions = ["Documentation", "Components", "Features"];

  return (
    <>
      <div>amount</div>
      <div>
        {/* category */}
        <SelectComponent />
        {/* description */}
        <DescriptionTextfield />
        {/* date */}

        {/* wallet/bank */}
        <SelectComponent />
      </div>
    </>
  );
};

export default Expenses;

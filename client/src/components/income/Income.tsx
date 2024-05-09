// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetBanks from "../../hooks/useGetBanks";
import { Icon } from "../../redux/slices/categoriesSlice";
import { postGuestBank } from "../../redux/slices/incomeSlice";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "../inputs/AmountComponent";
import DatePickerComponent from "../inputs/DatePickerComponent";
import DescriptionTextfield from "../inputs/DescriptionTextfield";
import SelectComponent from "../inputs/SelectComponent";
import { inputsDataState } from "../inputs/types";
import style from "./income.module.css";

export interface dataType extends inputsDataState {
  logo?: string;
  title: string;
  bankId: string;
  foundCategory: {
    _id: string;
    title: string;
    icon: Icon;
  };
}

const Income = () => {
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
      const foundCategory = categories.find(
        (cat) => cat.title === inputs.category
      );

      // if (foundCategory) {
      //   const data: dataType = { foundCategory, ...inputs };
      //   dispatch(postGuestBank(data));
      // } else {
      //   setError({
      //     ...errors,
      //     category: true,
      //   });
      // }

      setInputs({
        category: "",
        date: dayjs().format("DD-MM-YYYY"),
        description: "",
        amount: 0,
        wallet: "",
      });
    }
  };

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <AmountComponent color="green" input={inputs} setInput={setInputs} />
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

export default Income;

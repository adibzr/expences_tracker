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

const Income = () => {
  const categories = useGetCategories();
  const banks = useGetBanks();
  const wallet = useAppSelector((state) => state.userAuth.guest?.wallet);
  if (wallet) banks.unshift({ title: "wallet", id: wallet });
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    category: "",
    bank: {
      title: "",
      id: "",
    },
    wallet: {
      title: "",
      id: "",
    },
    date: dayjs().format("DD-MM-YYYY"),
    description: "",
    amount: 0,
  });

  const [errors, setError] = useState({
    category: false,
    wallet: false,
    date: false,
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (inputs.category === "") {
      setError({
        ...errors,
        category: true,
      });
      return;
    }
    if (inputs.wallet.id === "") {
      setError({
        ...errors,
        wallet: true,
      });
      return;
    }
    const foundCategory = categories.find(
      (cat) => cat.title === inputs.category
    );
    if (!foundCategory) return;
    const data: inputsDataState = {
      ...inputs,
      category: foundCategory.id,
    };
    console.log(data);
    setInputs({
      category: "",
      bank: { title: "", id: "" },
      date: dayjs().format("DD-MM-YYYY"),
      description: "",
      amount: 0,
      wallet: { title: "", id: "" },
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

// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetBanks from "../../hooks/useGetBanks";
import { postGuestWallet } from "../../redux/slices/incomeSlice";
import { ButtonComponentLarge } from "../ButtonComponent";
import AmountComponent from "../inputs/AmountComponent";
import DatePickerComponent from "../inputs/DatePickerComponent";
import DescriptionTextfield from "../inputs/DescriptionTextfield";
import SelectComponent from "../inputs/SelectComponent";
import style from "./income.module.css";
import { walletBankInput } from "../inputs/types";

const Income = () => {
  const categories = useAppSelector((state) => state.categories);
  const categoryTitles = categories.categories.reduce(
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
    bank: "",
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
      const foundCategory = categories.categories.find(
        (cat) => cat.title === inputs.category
      );

      if (foundCategory) {
        const data: walletBankInput = {
          ...inputs,
          category: foundCategory._id,
        };
        if (inputs.wallet === "wallet") {
          dispatch(postGuestWallet(data));
        }
      } else {
        setError({
          ...errors,
          category: true,
        });
      }

      setInputs({
        category: "",
        bank: "",
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

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
import { postGuestIncome } from "../../redux/slices/incomeSlice";
import { cat } from "../../redux/slices/categoriesSlice";
import { useParams } from "react-router-dom";
import { updateTrasaction } from "../../redux/slices/transactionSlice";

const Income = () => {
  const params = useParams();
  const categories = useGetCategories();
  const incomeCategories = categories.reduce(
    (acc: { title: string; id: string }[], curr: cat) => {
      if (curr.type === "income") acc.push({ title: curr.title, id: curr._id });
      return acc;
    },
    []
  );
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
      category: foundCategory._id,
    };
    if (params.id && params.edit === "expense") {
      dispatch(
        updateTrasaction({ id: params.id, type: "expense", updatedData: data })
      );
    } else if (params.id && params.edit === "income") {
      dispatch(
        updateTrasaction({ id: params.id, type: "income", updatedData: data })
      );
    } else {
      dispatch(postGuestIncome(data));
    }

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
          items={incomeCategories}
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

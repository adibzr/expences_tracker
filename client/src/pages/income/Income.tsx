// import React, { useState } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import AmountComponent from "../../components/inputs/AmountComponent";
import DatePickerComponent from "../../components/inputs/DatePickerComponent";
import DescriptionTextfield from "../../components/inputs/DescriptionTextfield";
import SelectComponent from "../../components/inputs/SelectComponent";
import { inputsDataState } from "../../components/inputs/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import useGetBanks from "../../hooks/useGetBank";
import useGetCategories from "../../hooks/useGetCategories";
import { cat } from "../../redux/slices/categoriesSlice";
import { postGuestIncome } from "../../redux/slices/incomeSlice";
import { updateTrasaction } from "../../redux/slices/transactionSlice";
import style from "./income.module.css";

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
    amount: false,
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
    if (inputs.amount === 0) {
      setError({
        ...errors,
        amount: true,
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
      <AmountComponent color="green" input={inputs} setInput={setInputs} setError={setError}/>
      {errors.amount && <p>you can't have 0 income, try a different amount</p>}
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

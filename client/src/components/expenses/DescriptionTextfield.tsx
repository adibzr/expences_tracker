import { TextField } from "@mui/material";
import React from "react";
import { expenseDataState } from "./Expenses";

const DescriptionTextfield = ({
  input,
  setInput,
}: {
  input: expenseDataState;
  setInput: (arg0: expenseDataState) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;
    setInput({
      ...input,
      description: value,
    });
  };
  return (
    <>
      <TextField
        rows={4}
        multiline={true}
        label="Description"
        onChange={handleChange}
      />
    </>
  );
};

export default DescriptionTextfield;

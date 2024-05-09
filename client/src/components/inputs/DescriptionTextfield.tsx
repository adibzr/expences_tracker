import { TextField } from "@mui/material";
import React from "react";
import { inputsDataState } from "./types";

const DescriptionTextfield = ({
  input,
  setInput,
}: {
  input: inputsDataState;
  setInput: (arg0: inputsDataState) => void;
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
        aria-label="Description"
        label="Description"
        multiline={true}
        rows={4}
        value={input.description}
        onChange={handleChange}
      />
    </>
  );
};

export default DescriptionTextfield;

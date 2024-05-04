import { TextField } from "@mui/material";
import React from "react";

const DescriptionTextfield = () => {
  const [name, setDescription] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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

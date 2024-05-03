import { TextField } from "@mui/material";
import React from "react";

const DescriptionTextfield = () => {
  const [name, setName] = React.useState("");
  console.log(name);
  return (
    <>
      <TextField
        id="outlined-controlled"
        label="Controlled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />
    </>
  );
};

export default DescriptionTextfield;

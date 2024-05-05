import { useState } from "react";
import style from "./expense.module.css";

const InputComponent = () => {
  const [value, changeValue] = useState("");

  return (
    <div className={style.inputComp}>
      <input
        style={{ width: Math.min(Math.max(value.length, 2), 50) + "ch" }}
        value={value}
        onChange={(event) => {
          changeValue(event.target.value);
        }}
        placeholder="0"
      />
    </div>
  );
};

export default InputComponent;

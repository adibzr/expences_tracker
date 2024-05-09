import style from "./inputs.module.css";
import { inputsDataState } from "./types";

const AmountComponent = ({
  color,
  input,
  setInput,
}: {
  color: string;
  input: inputsDataState;
  setInput: (arg0: inputsDataState) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      const value = Number(event.target.value);
      setInput({
        ...input,
        amount: value,
      });
    }
  };
  return (
    <div className={style.inputComp}>
      <input
        style={{
          color: color,
          width: Math.min(Math.max(String(input.amount).length, 2), 50) + "ch",
        }}
        value={input.amount === 0 ? "" : input.amount}
        onChange={handleChange}
        placeholder="0"
        maxLength={20}
      />
    </div>
  );
};

export default AmountComponent;

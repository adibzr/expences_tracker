import style from "./inputs.module.css";
import { inputsDataState } from "./types";

interface AmountComponentProps<T extends inputsDataState> {
  color: string;
  input: T;
  setInput: (arg0: T) => void;
}

const AmountComponent = <T extends inputsDataState>({
  color,
  input,
  setInput,
}: AmountComponentProps<T>) => {
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

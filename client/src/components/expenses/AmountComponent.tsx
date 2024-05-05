import { expenseDataState } from "./Expenses";
import style from "./expense.module.css";

const AmountComponent = ({
  input,
  setInput,
}: {
  input: expenseDataState;
  setInput: (arg0: expenseDataState) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInput({
      ...input,
      amount: value,
    });
  };
  return (
    <div className={style.inputComp}>
      <input
        style={{
          width: Math.min(Math.max(String(input.amount).length, 2), 50) + "ch",
        }}
        value={input.amount === 0 ? "" : input.amount}
        onChange={handleChange}
        placeholder="0"
      />
    </div>
  );
};

export default AmountComponent;

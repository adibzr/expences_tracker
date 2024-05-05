import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { expenseDataState } from "./Expenses";

const SelectComponent = ({
  label,
  items,
  input,
  setInput,
}: {
  label: string;
  items: string[];
  input: expenseDataState;
  setInput: (arg0: expenseDataState) => void;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (label === "Category") {
      setInput({
        ...input,
        category: value,
      });
    }
    if (label === "Wallet/Bank") {
      setInput({
        ...input,
        wallet: value,
      });
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      <FormControl>
        <InputLabel id={label} style={{ backgroundColor: "white" }}>
          {label}
        </InputLabel>
        <Select
          value={label === "Category" ? input.category : input.wallet}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;

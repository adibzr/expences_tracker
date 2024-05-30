import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { inputsDataError, inputsDataState } from "./types";

interface selectComponentProps<T extends inputsDataState> {
  label: string;
  items: {
    title: string;
    id: string;
  }[];
  input: T;
  errors: inputsDataError;
  setInput: (arg0: T) => void;
  setError: (arg0: inputsDataError) => void;
}

const SelectComponent = <T extends inputsDataState>({
  label,
  items,
  input,
  errors,
  setInput,
  setError,
}: selectComponentProps<T>) => {
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

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (label === "Category") {
      setInput({
        ...input,
        category: value,
      });
      setError({ ...errors, category: false });
    }
    if (label === "Bank") {
      setInput({
        ...input,
        bank: value,
      });
      setError({
        bank: false,
        amount: false,
        category: false,
        date: false,
      });
    }
  };

  const errorHandler: () => boolean = () => {
    if (label === "Category") {
      return errors.category;
    } else if (label === "Bank") {
      return errors.bank;
    }
    return false;
  };

  return (
    <>
      <FormControl>
        <InputLabel id={label} style={{ backgroundColor: "white" }}>
          {label}
        </InputLabel>
        <Select
          value={label === "Category" ? input.category : input.bank}
          onChange={handleChange}
          MenuProps={MenuProps}
          error={errorHandler()}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;

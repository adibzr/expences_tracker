import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../hooks/reduxHooks";
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
    console.log(value);
    if (label === "Category") {
      setInput({
        ...input,
        category: value,
      });
      setError({ ...errors, category: false });
    }
    if (label === "Wallet/Bank") {
      if (value === "wallet") {
        const wallet = useAppSelector((state) => state.userAuth.guest?.wallet);
        setInput({
          ...input,
          wallet: wallet,
        });
      } else {
        setInput({
          ...input,
          bank: value,
        });
      }
      setError({ ...errors, wallet: false });
    }
  };

  const setValue = () => {
    if (label === "Category") {
      return input.category;
    } else if (label === "Wallet/Bank") {
      if (input.wallet) {
        return "wallet";
      } else {
        return input.bank?.title;
      }
    } else return undefined;
  };

  const errorHandler: () => boolean = () => {
    if (label === "Category") {
      return errors.category;
    } else if (label === "Wallet/Bank") {
      return errors.wallet;
    } else return false;
  };

  return (
    <>
      <FormControl>
        <InputLabel id={label} style={{ backgroundColor: "white" }}>
          {label}
        </InputLabel>
        <Select
          value={setValue()}
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

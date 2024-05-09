import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { inputsDataError, inputsDataState, walletBankInput } from "./types";

const WalletBankSelectComponent = ({
  label,
  items,
  input,
  errors,
  setInput,
  setError,
}: {
  label: string;
  items: string[];
  errors: inputsDataError;
  input: walletBankInput;
  setInput: (arg0: walletBankInput) => void;
  setError: (arg0: inputsDataError) => void;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (label === "Category") {
      setInput({
        ...input,
        category: value,
      });
      setError({ ...errors, category: false });
    }
    if (label === "Wallet/Bank") {
      setInput({
        ...input,
        wallet: value,
      });
      setError({ ...errors, wallet: false });
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
          value={label === "Category" ? input.category : input.wallet}
          onChange={handleChange}
          MenuProps={MenuProps}
          error={errorHandler()}
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

export default WalletBankSelectComponent;

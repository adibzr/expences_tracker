import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

interface datePickerProps<T extends inputsDataState> {
  input: T;
  errors: inputsDataError;
  setInput: (updateFn: (prev: T) => T) => void;
  setError: (arg0: inputsDataError) => void;
}

import { inputsDataError, inputsDataState } from "./types";
const DatePickerComponent = <T extends inputsDataState>({
  input,
  errors,
  setInput,
  setError,
}: datePickerProps<T>) => {
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      dayjs() > newValue
        ? setError({ ...errors, date: false })
        : setError({ ...errors, date: true });
      setInput((prev) => {
        return { ...prev, date: newValue.format("MM-DD-YYYY") };
      });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        defaultValue={dayjs()}
        disableFuture
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};
export default DatePickerComponent;

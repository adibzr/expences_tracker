import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

import { inputsDataError, inputsDataState } from "./types";
const DatePickerComponent = ({
  input,
  errors,
  setInput,
  setError,
}: {
  input: inputsDataState;
  errors: inputsDataError;
  setInput: (arg0: inputsDataState) => void;
  setError: (arg0: inputsDataError) => void;
}) => {
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      dayjs() > newValue
        ? setError({ ...errors, date: false })
        : setError({ ...errors, date: true });
      setInput({ ...input, date: newValue.format("DD-MM-YYYY") });
    } else {
      setInput({ ...input, date: dayjs().format("DD-MM-YYYY") });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        defaultValue={dayjs()}
        disableFuture //disable future date
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};
export default DatePickerComponent;

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateValidationError } from "@mui/x-date-pickers/models/validation";
import dayjs, { Dayjs } from "dayjs";

import * as React from "react";
import { expenseDataState } from "./Expenses";
const DatePickerComponent = ({
  input,
  setInput,
}: {
  input: expenseDataState;
  setInput: (arg0: expenseDataState) => void;
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const handleError = (error: DateValidationError) => {
    console.log(error);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <DatePicker
        onError={handleError}
        label="Date"
        value={value}
        disableFuture //disable future date
        onChange={(newValue) =>
          newValue
            ? setInput({ ...input, date: newValue.format("DD-MM-YYYY") })
            : setInput({ ...input, date: dayjs().format("DD-MM-YYYY") })
        }
      />
    </LocalizationProvider>
  );
};
export default DatePickerComponent;

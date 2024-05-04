import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateValidationError } from "@mui/x-date-pickers/models/validation";
import dayjs, { Dayjs } from "dayjs";

import * as React from "react";
//https://mui.com/x/react-date-pickers/date-picker/#basic-usage
const DatePickerComponent = () => {
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
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};
export default DatePickerComponent;

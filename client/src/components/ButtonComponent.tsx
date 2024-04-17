import { Button } from "@mui/material";
import sttyle from "./button.module.css";

export const ButtonComponentLarge = ({ text }: { text: string }) => {
  return (
    <Button
      className={sttyle.buttonLarge}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
    >
      {text}
    </Button>
  );
};
export const ButtonComponentSmall = ({ text }: { text: string }) => {
  return (
    <Button
      className={sttyle.buttonSmall}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
    >
      {text}
    </Button>
  );
};

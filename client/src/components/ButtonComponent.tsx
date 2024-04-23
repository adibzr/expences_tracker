import { Button } from "@mui/material";
import style from "./ButtonComponent.module.css";

interface button {
  text: string;
  handleClick: () => void;
}
export const ButtonComponentLarge = ({ text }: { text: string }) => {
  return (
    <Button
      className={style.buttonLarge}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
    >
      {text}
    </Button>
  );
};
export const ButtonComponentSmall: React.FC<button> = ({
  text,
  handleClick,
}) => {
  return (
    <Button
      onClick={handleClick}
      className={style.buttonSmall}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
    >
      {text}
    </Button>
  );
};

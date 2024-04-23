import { Button, ButtonProps } from "@mui/material";
import style from "./button.module.css";

interface ButtonComponentProps extends ButtonProps {
  text?: string;
  handleClick?: () => void;
  className?: string;
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
export const ButtonComponentSmall: React.FC<ButtonComponentProps> = ({
  text = "button",
  handleClick,
  className,
  ...props
}) => {
  return (
    <Button
      onClick={handleClick}
      className={style.buttonSmall + " " + className}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
      {...props}
    >
      {text}
    </Button>
  );
};
